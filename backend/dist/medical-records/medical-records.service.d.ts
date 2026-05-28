import { PrismaService } from '../prisma/prisma.service';
import { CreateMedicalRecordDto } from './dto/create-record.dto';
export declare class MedicalRecordsService {
    private prisma;
    constructor(prisma: PrismaService);
    createRecord(doctorId: string, dto: CreateMedicalRecordDto): Promise<{
        id: string;
        createdAt: Date;
        patientId: string;
        appointmentId: string;
        diagnosis: string | null;
        prescriptions: string | null;
        doctorNotes: string | null;
    }>;
    getPatientRecords(patientId: string): Promise<({
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
