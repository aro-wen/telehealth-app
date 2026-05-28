export interface User {
  id: string;
  email: string;
  role: "PATIENT" | "DOCTOR";
}

export interface PatientProfile {
  id: string;
  userId: string;
  fullName: string;
  dateOfBirth: string;
  weight?: number;
  height?: number;
  contactDetails?: string;
  basicMedicalHistory?: string;
  profilePictureUrl?: string;
}

export interface DoctorProfile {
  id: string;
  userId: string;
  fullName: string;
  specialization: string;
  bio?: string;
  licenseNumber: string;
  profilePictureUrl?: string;
  isVerified: boolean;
  user?: {
    email: string;
  };
}
