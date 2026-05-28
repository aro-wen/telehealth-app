import { PrismaService } from '../prisma/prisma.service';
import { UpdatePatientProfileDto } from './dto/update-profile.dto';
export declare class PatientProfileService {
    private prisma;
    constructor(prisma: PrismaService);
    getProfile(userId: string): Promise<{
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
    updateProfile(userId: string, dto: UpdatePatientProfileDto): Promise<{
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
