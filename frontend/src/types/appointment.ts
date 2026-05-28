import { DoctorProfile } from "./doctor";
import { User } from "./user";

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  startAt: string;
  endAt: string;
  status: "BOOKED" | "CANCELLED" | "COMPLETED";
  meetingLink: string;
  doctor?: {
    email: string;
    doctorProfile: {
      fullName: string;
      specialization: string;
    };
  };
  patient?: {
    email: string;
  };
}
