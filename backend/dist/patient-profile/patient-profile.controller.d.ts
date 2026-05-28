import { PatientProfileService } from './patient-profile.service';
import { UpdatePatientProfileDto } from './dto/update-profile.dto';
export declare class PatientProfileController {
    private readonly profileService;
    constructor(profileService: PatientProfileService);
    getProfile(user: {
        sub: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        fullName: string;
        dateOfBirth: Date;
        weight: number | null;
        height: number | null;
        contactDetails: string | null;
        basicMedicalHistory: string | null;
        profilePictureUrl: string | null;
        userId: string;
    }>;
    updateProfile(user: {
        sub: string;
    }, dto: UpdatePatientProfileDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        fullName: string;
        dateOfBirth: Date;
        weight: number | null;
        height: number | null;
        contactDetails: string | null;
        basicMedicalHistory: string | null;
        profilePictureUrl: string | null;
        userId: string;
    }>;
}
