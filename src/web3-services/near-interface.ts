import { Wallet } from "./near-wallet";


export interface PatientInput {
  title: string;
  first_name: string;
  last_name: string;
  gender: string;
  condition: string;
  phone: string;
  email: string;
  dob: string;
  city: string;
  address: string;
  doctor: string;
  profile_pic: string;
  account_id: string; // Assuming AccountId is a string in TypeScript
  message: string;
}

export interface Patient extends PatientInput {
  id: number,
  medical_history: string[];
  bought_medicine: number[];
}

export interface DoctorInput {
  title: string;
  first_name: string;
  last_name: string;
  gender: string;
  designation: string;
  last_work: string;
  email: string;
  college_name: string;
  college_id: string;
  joining_year: string;
  end_year: string;
  specialization: string;
  registration_id: string;
  college_address: string;
  profile_pic: string;
  account_id: string; // Assuming AccountId is a string in TypeScript
  address: string;
  bio: string;
}

export interface Doctor extends DoctorInput {
  id: number;
  appointment_counts: number;
  successful_treaments: number;
  is_approved: boolean;
}

export interface MedicineInput {
  doctor_id: number;
  name: string;
  brand: string;
  manufacturer: string;
  company_email: string;
  manufacturer_address: string;
  current_location: string;
  phone_no: string;
  description: string;
}

export interface Medicine extends MedicineInput {
  id: number;
  availability: boolean;
}

export interface AppointmentInput {
  doctor_id: number;
  from: string;
  to: string;
  appointment_date: Date;
  condition: string;
  message: string;
}

export enum AppointmentStatus {
  Pending,
  Confirmed,
  Cancelled,
  Completed
}


export interface Prescription {
  id: number;
  medicine_id: number;
  patient_id: number;
  doctor_id: number;
  date: bigint;
}

export interface Appointment extends AppointmentInput {
  id: number;
  patient_id: String;
  status: AppointmentStatus;
  is_open: boolean;
}
export interface Message {
  patient_id: string; // Assuming AccountId is a string in TypeScript
  doctor_id: string; // Assuming AccountId is a string in TypeScript
  timestamp: Date;
  message: string;
}

export interface Order {
  medicine_id: number;
  price: bigint;
  payment_amount: bigint;
  quantity: bigint;
  patient_id: bigint;
  date: bigint;
}

export class PlacesContractInterface {
  public wallet: Wallet;

  constructor(wallet: Wallet) {
    this.wallet = wallet;
  }


  async getDoctors() {
    return (await this.wallet.viewMethod({ method: "get_all_doctors_data" })) as Promise<
      Doctor[]
    >;
  }

  async getDoctorById(doctorId: number) {
    return (await this.wallet.viewMethod({
      method: "get_doctor_details",
      args: { doctor_id: doctorId },
    })) as Promise<Doctor>;
  }

  async getPatients() {
    return (await this.wallet.viewMethod({ method: "get_all_registered_patients" })) as Promise<
      Patient[]
    >;
  }

  async getAppointments() {
    return (await this.wallet.viewMethod({ method: "get_all_appointments" })) as Promise<
      Appointment[]
    >;
  }

  async getDrugs() {
    return (await this.wallet.viewMethod({method: "get_all_registered_medicines" })) as Promise<
      Medicine[]
    >;
  }

  async getMessages() {
    return (await this.wallet.viewMethod({method: "get_messages" })) as Promise<
      Message[]
    >;
  }


  async getPatientAppointmentHistory(patientId:String) {
    return (await this.wallet.viewMethod({ 
      method: "get_patient_appointment_history",
      args: { patient_id: patientId },
    })) as Promise<
      Appointment[]
    >;
  }

  async getDoctorAppointmentHistory(doctorId:number) {
    return (await this.wallet.viewMethod({ 
      method: "get_doctor_appointment_historys",
      args: { doctor_id: doctorId },
    })) as Promise<
      Appointment[]
    >;
  }

  async getPatientById(patientId:number) {
    return (await this.wallet.viewMethod({ 
      method: "get_patient_id",
      args: { patient_id: patientId },
    })) as Promise<
      Patient[]
    >;
  }


  // Payable / Call Methods

    /**
   * Add a new doctor
   * @param doctor
   * @returns
   */
    async addDoctor(doctor: DoctorInput) {
      return await this.wallet.callMethod({
        method: "add_doctor",
        args: { doctor},
      });
    }
  
      /**
     * Add a new patient
     * @param patient
     * @returns
     */
      async addPatient(patient: PatientInput) {
        return await this.wallet.callMethod({
          method: "add_patient",
          args: { patient},
        });
      }

    /**
     * Book a new appointment
     * @param appointment
     * @returns
     */
        async bookAppointment(appointment: AppointmentInput) {
          return await this.wallet.callMethod({
            method: "book_appointment",
            args: { appointment},
          });
        }
    
  
     /**
     * Add a new medicine
     * @param medicine
     * @returns
     */
      async addMedicine(medicine: MedicineInput) {
        return await this.wallet.callMethod({
              method: "add_medicine",
              args: {medicine},
            });
          }

         /**
     * Add a new patient history
     * @param patient
     * @returns
     */
      async updatePatientMedicalHistory(id:number,new_update: String) {
        return await this.wallet.callMethod({
              method: "update_patient_medical",
              args: {id,new_update},
        });
      }

     /**
     * Approve doctor
     * @param id
     * @returns
     */
    async approveDoctor(id:number) {
        return await this.wallet.callMethod({
               method: "approve_doctor",
               args: {id},
          });
    }

    async sendMessage(recipient: String, message:String) {
      return await this.wallet.callMethod({
             method: "send_message",
             args: {recipient,message},
        });
  }

  
  async completeAppointment(recipient: String, message:String) {
    return await this.wallet.callMethod({
           method: "complete_appointment",
           args: {recipient,message},
      });
}

  async buyMedicine(medicine_id: number, price: number,patientId:number) {
    return await this.wallet.callMethod({
      method: "buy_medicine",
      args: { medicine_id, price,patientId},
    });
  }

}
