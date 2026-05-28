import { MedicalRecordsService } from './medical-records.service';
import { CreateMedicalRecordDto } from './dto/create-record.dto';
export declare class MedicalRecordsController {
    private readonly recordsService;
    constructor(recordsService: MedicalRecordsService);
    create(req: any, dto: CreateMedicalRecordDto): Promise<{
        id: string;
        createdAt: Date;
        patientId: string;
        appointmentId: string;
        diagnosis: string | null;
        prescriptions: string | null;
        doctorNotes: string | null;
    }>;
    getMyRecords(req: any): Promise<({
        appointment: {
            id: string;
            startAt: Date;
            doctor: {
                doctorProfile: {
                    fullName: string;
                } | null;
                email: string;
            };
        };
    } & {
        id: string;
        createdAt: Date;
        patientId: string;
        appointmentId: string;
        diagnosis: string | null;
        prescriptions: string | null;
        doctorNotes: string | null;
    })[]>;
}
