import { PrismaService } from '../prisma/prisma.service';
export declare class DoctorDiscoveryService {
    private prisma;
    constructor(prisma: PrismaService);
    getDoctors(params: {
        specialization?: string;
        available?: string;
    }): Promise<{
        user: {
            email: string;
        };
        id: string;
        fullName: string;
        profilePictureUrl: string | null;
        specialization: string;
        bio: string | null;
        licenseNumber: string;
        isVerified: boolean;
    }[]>;
    recommendSpecialization(symptoms: string): string[];
}
