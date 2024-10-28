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

export interface Medicine {

  doctor_id: number;
  name: string;
  brand: string;
  manufacturer: string;
  manufacturing_date: string;
  expiry_date: string;
  company_email: string;
  discount: bigint;
  manufacturer_address: string;
  price: bigint;
  quantity: bigint;
  current_location: string;
  phone_no: bigint;
  image: string;
  description: string;
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
  timestamp: bigint;
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




export type Address = {
  address: string;
  country: string;
  state_or_province: string;
  city: string;
};

export type PlaceInput = {
  name: string;
  address: Address;
  description: string;
  pictures: string[];
  place_type: string;
};

type Vote = {
  account_id: string;
  vote_value: number;
  feedback: string;
};

export type Place = {
  address: Address;
  avarage_votes: number;
  description: string;
  id: number;
  name: string;
  pictures: string[];
  place_type: string;
  votes: Vote[];
  votes_counter: number;
};

export class PlacesContractInterface {
  public wallet: Wallet;

  constructor(wallet: Wallet) {
    this.wallet = wallet;
  }

  // View methods
  async getPlaces() {
    return (await this.wallet.viewMethod({ method: "get_places" })) as Promise<
      Place[]
    >;
  }

  async getPlacesById(placeId: number) {
    return (await this.wallet.viewMethod({
      method: "get_places_by_id",
      args: { place_id: placeId },
    })) as Promise<Place>;
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
   * Add a new place
   * @param place
   * @returns
   */
  async addPlace(place: PlaceInput) {
    return await this.wallet.callMethod({
      method: "add_place",
      args: { place },
    });
  }

  /**
   * Compute rating (vote)
   * @param placeId
   * @param vote
   * @param feedback
   * @returns
   */
  async vote(placeId: number, vote: number, feedback?: string) {
    const fixedVote = Math.min(Math.max(vote, 0), 5); // Ensure the value is between 0 and 5

    return await this.wallet.callMethod({
      method: "vote",
      args: { place_id: placeId, vote: fixedVote, feedback },
    });
  }

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
     * @param patient
     * @returns
     */
        async bookAppointment(appointment: AppointmentInput) {
          return await this.wallet.callMethod({
            method: "book_appointment",
            args: { appointment},
          });
        }
    
  
     /**
     * Add a new patient
     * @param patient
     * @returns
     */
      async addMedicine(medicine: Medicine) {
        return await this.wallet.callMethod({
              method: "add_medicine",
              args: {medicine},
            });
          }

         /**
     * Add a new patient
     * @param patient
     * @returns
     */
      async updatePatientMedicalHistory(id:number,new_update: String) {
        return await this.wallet.callMethod({
              method: "update_patient_medical",
              args: {id,new_update},
        });
      }
}
