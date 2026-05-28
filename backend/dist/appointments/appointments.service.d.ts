import { PrismaService } from '../prisma/prisma.service';
import { BookAppointmentDto } from './dto/book-appointment.dto';
export declare class AppointmentsService {
    private prisma;
    constructor(prisma: PrismaService);
    bookAppointment(patientId: string, dto: BookAppointmentDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        startAt: Date;
        endAt: Date;
        patientId: string;
        doctorId: string;
        slotId: string | null;
        status: import(".prisma/client").$Enums.AppointmentStatus;
        meetingLink: string | null;
        notes: string | null;
    }>;
    getPatientAppointments(patientId: string): Promise<({
        doctor: {
            doctorProfile: {
                fullName: string;
                specialization: string;
            } | null;
            email: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        startAt: Date;
        endAt: Date;
        patientId: string;
        doctorId: string;
        slotId: string | null;
        status: import(".prisma/client").$Enums.AppointmentStatus;
        meetingLink: string | null;
        notes: string | null;
    })[]>;
    cancelAppointment(patientId: string, appointmentId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        startAt: Date;
        endAt: Date;
        patientId: string;
        doctorId: string;
        slotId: string | null;
        status: import(".prisma/client").$Enums.AppointmentStatus;
        meetingLink: string | null;
        notes: string | null;
    }>;
}
