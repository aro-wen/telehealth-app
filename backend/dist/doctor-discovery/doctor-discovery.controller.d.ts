import { DoctorDiscoveryService } from './doctor-discovery.service';
interface SymptomDto {
    symptoms: string;
}
export declare class DoctorDiscoveryController {
    private readonly discoveryService;
    constructor(discoveryService: DoctorDiscoveryService);
    listDoctors(spec?: string, avail?: string): Promise<{
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
    aiRecommend(body: SymptomDto): {
        recommendedSpecializations: string[];
        note: string;
    };
}
export {};
