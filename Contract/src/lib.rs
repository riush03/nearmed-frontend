use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{env,log ,near, require,near_bindgen, AccountId, NearToken, PanicOnDefault, Promise};
use near_sdk::store::{IterableSet,Vector,UnorderedMap};
// use serde_json::json

pub mod internal;
pub mod utils;
pub use crate::utils::*;

#[near(serializers = [json, borsh])]
#[derive(Clone,PartialEq)]
pub enum AppointmentStatus {
    Pending,
    Completed,
}

#[near(serializers = [json, borsh])]
#[derive(Clone)]
pub struct PatientInput {
    title: String,
    first_name: String,
    last_name: String,
    gender: String,
    condition: String,
    phone: String,
    email: String,
    dob: String,
    city: String,
    address: String,
    doctor: String,
    profile_pic: String,
    account_id: AccountId,
    message: String,
}

#[near(serializers = [json, borsh])]
#[derive(Clone)]
pub struct Patient {
    id: u32,
    title: String,
    first_name: String,
    last_name: String,
    gender: String,
    condition: String,
    phone: String,
    email: String,
    dob: String,
    city: String,
    address:String,
    doctor: String,
    profile_pic: String,
    account_id: AccountId,
    message: String,
    bought_medicine: Vec<i32>,
}

#[near(serializers = [json, borsh])]
#[derive(Clone)]
pub struct DoctorInput {
    title: String,
    first_name: String,
    last_name: String,
    gender: String,
    designation: String,
    last_work: String,
    email: String,
    college_name: String,
    college_id: String,
    joining_year: String,
    end_year: String,
    specialization: String,
    registration_id: String,
    college_address: String,
    profile_pic: String,
    account_id: AccountId,
    bio: String,
}

#[near(serializers = [json, borsh])]
#[derive(Clone)]
pub struct Doctor {
    id: u32,
    title: String,
    first_name: String,
    last_name: String,
    gender: String,
    designation: String,
    last_work: String,
    email: String,
    college_name: String,
    college_id: String,
    joining_year: String,
    end_year: String,
    specialization: String,
    registration_id: String,
    college_address: String,
    account_id: AccountId,
    profile_pic: String,
    bio: String,
    appointment_counts: i32,
    successful_treaments: i32,
    is_approved: bool,
}

#[near(serializers = [json, borsh])]
#[derive(Debug,Clone)]
pub struct MedicineInput {
    doctor_id: u32,
    name: String,
    brand: String,
    manufacturer: String,
    // manufacturing_date: String,
    // expiry_date: String,
    company_email: String,
    // discount: String,
    manufacturer_address: String,
    // price: i32,
    // quantity: String,
    current_location: String,
    phone_no: String,
    // image: String,
    description: String
}

//To do
#[near(serializers = [json, borsh])]
#[derive(Clone)]
pub struct Medicine {
    id: u32,
    doctor_id: u32,
    name: String,
    brand: String,
    manufacturer: String,
    // manufacturing_date: String,
    // expiry_date: String,
    company_email: String,
    // discount:i32,
    manufacturer_address: String,
    // price: i32,
    // quantity: i32,
    current_location: String,
    phone_no: String,
    // image: String,
    description: String,
    availability: bool,
}


#[near(serializers = [json, borsh])]
#[derive(Clone)]
pub struct AppointmentInput {
    doctor_id: u32,
    from: String,
    to: String,
    appointment_date: String,
    condition: String,
    message: String,
}

#[near(serializers = [json, borsh])]
#[derive(Clone)]
pub struct Appointment {
    id: u32,
    patient_id: AccountId,
    doctor_id: u32,
    from: String,
    to: String,
    appointment_date: String,
    condition: String,
    status: AppointmentStatus,
    message: String,
    is_open:bool,
}

#[near(serializers = [json, borsh])]
#[derive(Clone)]
pub struct Message{
    patient_id: AccountId,
    doctor_id: AccountId,
    timestamp: u64,
    message: String,
}

#[near(serializers = [json, borsh])]
#[derive(Clone)]
pub struct Order {
     medicine_id: u32,
     price: u128,
     payment_amount: u64,
     quantity: u128,
     patient_id: u64,
     date: u64,
}

#[near(serializers = [json, borsh])]
#[derive(Clone)]
pub struct Notification {
    account_id: AccountId,
    message: String,
    timestamp: u64,
}

#[near(serializers = [json, borsh])]
#[derive(Clone)]
pub struct InstructionInput {
    advice: String,
    meds: String,         
}

#[near(serializers = [json, borsh])]
#[derive(Clone)]
pub struct Prescription {
    id: u32,
    advice: String,
    meds: String, 
    timestamp: u64,          
}

#[near(contract_state)]
// #[derive(Default, BorshDeserialize, BorshSerialize)]
pub struct Contract {
    owner: AccountId,
    users: IterableSet<AccountId>,
    patients: Vector<Patient>,
    no_of_patients: u32,
    doctors: Vector<Doctor>,
    no_of_doctors: u32,
    drugs: Vector<Medicine>,
    no_of_drugs: u32,
    prescriptions: Vector<Prescription>,
    no_of_prescriptions: u32,
    appointments: Vector<Appointment>,
    no_of_appointments: u32,
    notifications: Vector<Notification>,
    no_of_notifications: u32,
    orders: Vector<Order>,
    messages: Vector<Message>,
    appointment_fee: u128,
    registration_fee: u128,
}

// Implement the default method for Contract, initializing all collections
impl Default for Contract {
    fn default() -> Self {
        Self {
            owner: "nearmed.testnet".parse().unwrap(),
            users: IterableSet::new(b"s"),
            patients: Vector::new(b"p"),
            no_of_patients: 0,
            doctors: Vector::new(b"d"),
            no_of_doctors: 0,
            drugs: Vector::new(b"h"),
            no_of_drugs: 0,
            prescriptions: Vector::new(b"p"),
            no_of_prescriptions: 0,
            appointments: Vector::new(b"e"),
            no_of_appointments: 0,
            notifications: Vector::new(b"k"),
            no_of_notifications: 0,
            orders: Vector::new(b"o"),
            messages: Vector::new(b"m"),
            appointment_fee: 42_000_000_000,
            registration_fee:42_000_000_000,
        }
    }
}

#[near]
impl Contract {
    #[init]
    pub fn init(owner: AccountId,users: Option<Vec<AccountId>>) -> Self {
        assert!(!env::state_exists(),"Already initialized");

        Self{
            owner,
            users: account_vec_to_set(
                if users.is_some() {
                    users.unwrap()
                } else {
                    vec![]
                },
                b"s",
            ),
            patients: Vector::new(b"p"),
            no_of_patients: 0,
            doctors: Vector::new(b"d"),
            no_of_doctors: 0,
            drugs: Vector::new(b"h"),
            no_of_drugs: 0,
            prescriptions: Vector::new(b"p"),
            no_of_prescriptions: 0,
            appointments: Vector::new(b"e"),
            no_of_appointments: 0,
            notifications: Vector::new(b"k"),
            no_of_notifications: 0,
            orders: Vector::new(b"o"),
            messages: Vector::new(b"m"),
            appointment_fee: 42_000_000_000,
            registration_fee:42_000_000_000,
        }
    }

    pub fn add_notification(&mut self, user_address: AccountId, message: String, ) {
        let timestamp = env::block_timestamp();

        let notification = Notification {
            account_id: user_address.clone(),
            message: message,
            timestamp: timestamp, 
        };

        // Store the notification in the vector
        self.notifications.push(notification);

        env::log_str(&format!("{} {} {}", user_address,"Notification sent to {} at {}", timestamp));
    }

    pub fn add_medicine(&mut self,drug: MedicineInput) {

        let med = Medicine {
            id: self.no_of_drugs,
            doctor_id: drug.doctor_id,
            name: drug.name,
            brand: drug.brand,
            manufacturer: drug.manufacturer,
            manufacturer_address: drug.manufacturer_address,
            company_email: drug.company_email,
            current_location: drug.current_location,
            phone_no: drug.phone_no,
            description: drug.description,
            availability: true
        };

        self.drugs.push(med);
        self.no_of_drugs += 1;

        log!("Patient was registered successfully!");
    }

    
    //========== End of Medicine =======

    //========== Doctor =========----
    pub fn add_doctor(&mut self,doctor: DoctorInput) {

        let doctor = Doctor {
            id: self.no_of_doctors,
            title:doctor.title,
            first_name: doctor.first_name,
            last_name: doctor.last_name,
            gender: doctor.gender,
            designation: doctor.designation,
            last_work: doctor.last_work,
            email: doctor.email,
            college_name: doctor.college_name,
            college_id: doctor.college_id,
            joining_year: doctor.joining_year,
            end_year: doctor.end_year,
            specialization:doctor.specialization,
            registration_id: doctor.registration_id,
            college_address: doctor.college_address,
            account_id: doctor.account_id,
            profile_pic: doctor.profile_pic,
            bio: doctor.bio,
            appointment_counts: 0,
            successful_treaments: 0,
            is_approved: false,
        };

        self.doctors.push(doctor);
        self.no_of_doctors += 1;
    }

    pub fn approve_doctor(&mut self, id: u32) {
        assert!(
            self.is_admin(),
            "Only the admins can call this method"
        );
    
        let mut doctor:Doctor = self.get_doctor_details(id).expect("Doctor with that Id is not found");
    
        doctor.is_approved = true;
    
        self.doctors.push(doctor.clone());
    
        env::log_str(&format!("Doctor with ID {} has been approved", id));
    
        self.add_notification(
            doctor.account_id.clone(),
            format!("Your account has been approved. Welcome to the platform!"),
        );
    }
    
    pub fn add_doctor_advice(&mut self,advice: InstructionInput) {
        // Ensure that the doctor is authorized (could add a check here for permissions)

        // Create a new DoctorAdvice instance with the provided information
        let doctor_advice = Prescription {
            id: self.no_of_prescriptions,
            advice: advice.advice,
            meds: advice.meds,
            timestamp: env::block_timestamp(), // Set the current timestamp
        };

        // Add the doctor advice to storage (assuming `doctor_advices` is a Vector<DoctorAdvice>)
        self.prescriptions.push(doctor_advice);
        self.no_of_prescriptions += 1;

        // Log the addition of new advice
        env::log_str("Doctor's advice with medications and dosages has been successfully added.");
    }

    pub fn complete_appointment(&mut self, id: u32, patient_id: AccountId)  {
        // Retrieve the appointment from storage
        let mut appointment: Appointment  = self.get_appointment_id(id).expect("No appointment found").clone();

        // Verify the appointment belongs to the specified patient
        assert_eq!(appointment.patient_id, patient_id, "Appointment does not belong to the specified patient");

        // Check if the appointment is already completed
        assert!(appointment.status == AppointmentStatus::Completed, "Appointment is already completed");

        appointment.status = AppointmentStatus::Completed;
    }


    fn is_doctor(&self, account_id: AccountId) -> bool {
        // Implement logic to verify if the account_id belongs to a doctor
        self.doctors.iter().any(|doctor| doctor.account_id == account_id)
    }

    pub fn get_doctor_account_id(&self, doctor_id: u32) -> AccountId {
        self.doctors.get(doctor_id).expect("Doctor not found").account_id.clone()
    }

    //======== End Of Doctor
    //===========  Patient
    pub fn add_patient(&mut self,patient: PatientInput) {

        let patient = Patient {
            id: self.no_of_patients,
            title: patient.title,
            first_name: patient.first_name,
            last_name: patient.last_name,
            gender: patient.gender,
            condition: patient.condition,
            phone: patient.phone,
            email: patient.email,
            dob: patient.dob,
            city: patient.city,
            address: patient.address,
            doctor: patient.doctor,
            profile_pic: patient.profile_pic,
            account_id: patient.account_id,
            message: patient.message,
            bought_medicine: vec![],
        };

        self.patients.push(patient);
        self.no_of_doctors += 1;

        log!("Patient was registered successfully!");
    }

    #[payable]
    pub fn book_appointment(&mut self,appointment:AppointmentInput) {

        let appointment = Appointment {
            id: self.no_of_notifications,
            patient_id: env::predecessor_account_id(),
            doctor_id: appointment.doctor_id,
            from: appointment.from,
            to: appointment.to,
            appointment_date: appointment.appointment_date,
            condition: appointment.condition,
            status: AppointmentStatus::Pending,
            message: appointment.message,
            is_open: true,
        };

        self.appointments.push(appointment);
        self.no_of_appointments += 1;

        Promise::new(self.owner.clone()).transfer(NearToken::from_yoctonear(self.appointment_fee.try_into().unwrap()));
        
        self.add_notification(env::predecessor_account_id(), "You have successfully booked an appointment".to_string());

    }

    #[payable]
    pub fn buy_medicine(&mut self, medicine_id: u32,total_price: u32, patient_id: u32) -> Promise {
        // Retrieve the medicine details
        let medicine = self.get_medicine_by_id(medicine_id).expect("Medicine not found");
    
        // Calculate the total price
        // let total_price = medicine.price * quantity as u32;
    
        Promise::new(self.owner.clone()).transfer(NearToken::from_yoctonear(total_price.try_into().unwrap()))
    }

    // End of patient
    // Admin

    //Update by Admin only
     pub fn update_registration_fee(&mut self, new_fee: u128) {
        assert!(
            self.is_admin(),
            "Only the owner(patient) and admins can call this method"
        );
        self.registration_fee = new_fee;
        env::log_str(&format!("Registration fee updated to {}", new_fee));
    }

    // Function to update the appointment fee
    pub fn update_appointment_fee(&mut self, new_fee: u128) {
        assert!(
            self.is_admin(),
            "Only the owner(patient) and admins can call this method"
        );
        self.appointment_fee = new_fee;
        env::log_str(&format!("Appointment fee updated to {}", new_fee));
    }


    // Function to update the admin address
    pub fn update_admin_address(&mut self, new_admin: AccountId) {
        assert!(
            self.is_admin(),
            "Only the owner(patient) and admins can call this method"
        );
        self.owner = new_admin.clone();
        env::log_str(&format!("Admin address updated to {}", new_admin));
    }

    //======== End Of Admin
    //=========  Get patient data
    pub fn get_all_patient_orders(&self) -> Vec<Order> {
        self.orders
            .iter()  // Iterate over references to `Order`
            .cloned() // Clone each `Order` to get owned values
            .collect() // Collect into a Vec<Order>
    }
    
    

    pub fn get_all_registered_patients(&self) -> Vec<Patient> {
        self.patients
            .iter()     // Iterate over the vector of patients
            .cloned()   // Clone the Patient objects to return owned values
            .collect()  // Collect into a Vec<Patient>
    }
    
    pub fn get_patient_id(&self, patient_id: u32) -> Option<Patient> {
        // Assuming you have a patients collection to look up the patient by ID
        self.patients.iter().find(|patient| patient.id == patient_id).cloned()
    }

    pub fn get_appointment_id(&self, appointment_id: u32) -> Option<Appointment> {
        self.appointments.iter().find(|appointment| appointment.id == appointment_id).cloned()
    }

    
    pub fn get_patient_appointment_history(&self, patient_id: AccountId) -> Vec<Appointment> {
        self.appointments.iter()
            .filter(|appointment| appointment.patient_id == patient_id)
            .cloned()
            .collect()
    }

    pub fn get_bought_medicine_by_patient(&self, patient_id: u32) -> Vec<Medicine> {
        let patient = self.get_patient_id(patient_id); // Assuming you have this method

        // Collect medicines based on the IDs stored in `bought_medicine`
        patient.unwrap().bought_medicine.iter()
            .filter_map(|&medicine_id| self.get_medicine_by_id(medicine_id as u32)) // Assuming this method retrieves Medicine by ID
            .collect()
    }

    pub fn get_all_appointments(&self) -> Vec<Appointment>{
        self.appointments.iter().map(|appointment| appointment.clone()).collect()
    }

    // Get doctors data
    pub fn get_all_doctors_data(&self) -> Vec<Doctor>{
        self.doctors.iter().map(|doctor | doctor.clone()).collect()
    }

    pub fn get_approved_doctors(&self) -> Vec<Doctor> {
        self.doctors.iter().filter(|doctor| doctor.is_approved).cloned().collect()
    }



    pub fn get_doctor_details(&self, doctor_id: u32) -> Option<Doctor> {
        for doctor in self.doctors.iter() {
            if doctor.id == doctor_id {
                return Some(doctor.clone());
            }
        }
        None
    }


    pub fn get_doctor_appointment_historys(&self, doctor_id: u32) -> Vec<Appointment>{
        self.appointments.iter()
            .filter(|appointment| appointment.doctor_id == doctor_id)
            .cloned()
            .collect() 
    }

    // Get doctor medicine
    pub fn get_all_registered_medicines(&self) -> Vec<Medicine>{
        return self.drugs.iter().cloned().collect()
    }

    pub fn get_medicine_by_id(&self, medicine_id: u32) -> Option<Medicine> {
        // Assuming `self.medicines` is a collection (e.g., a vector or map) of medicines
        self.drugs.iter().find(|&medicine| medicine.id == medicine_id).cloned()
    }

    pub fn send_message(&mut self, recipient: AccountId, message: String) -> Message {
        let sender = env::predecessor_account_id();
        let timestamp = env::block_timestamp();

        let new_message = Message {
            patient_id: if self.is_doctor(sender.clone()) { recipient.clone() } else { sender.clone() },
            doctor_id: if self.is_doctor(sender.clone()) { sender } else { recipient },
            timestamp,
            message,
        };

        self.messages.push(new_message.clone());
        new_message
    }

    pub fn get_all_messages(&self) -> Vec<Message>{
        self.messages.iter().map(|message| message.clone()).collect()
    }

    pub fn get_all_notifications(&self) -> Vec<Notification>{
        self.notifications.iter().map(|notification| notification.clone()).collect()
    }

    pub fn get_notifications_by_account_id(&self, account_id: AccountId) -> Vec<Notification> {
        self.notifications.iter()
            .filter(|notification| notification.account_id == account_id)
            .cloned()
            .collect()
    }

    pub fn get_doctor_instructions(&self, advice_id: u32) -> Vec<Prescription> {
        self.prescriptions.iter()
            .filter(|instruction| instruction.id == advice_id)
            .cloned()
            .collect()
    }
   
}


// Tests in a separated file (see more here -> http://xion.io/post/code/rust-unit-test-placement.html)
// #[cfg(test)]
// #[path = "./tests.rs"]
// mod tests;