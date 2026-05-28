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

export interface ScheduleSlot {
  id: string;
  doctorProfileId: string;
  startAt: string;
  endAt: string;
  isAvailable: boolean;
}
