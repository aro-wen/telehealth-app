export interface MedicalRecord {
  id: string;
  appointmentId: string;
  patientId: string;
  diagnosis?: string;
  prescriptions?: string;
  doctorNotes?: string;
  createdAt: string;
  updatedAt: string;
  appointment?: {
    id: string;
    startAt: string;
    doctor?: {
      email: string;
      doctorProfile?: {
        fullName: string;
      };
    };
  };
}
