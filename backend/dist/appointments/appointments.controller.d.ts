import { AppointmentsService } from './appointments.service';
import { BookAppointmentDto } from './dto/book-appointment.dto';
export declare class AppointmentsController {
    private readonly appointmentService;
    constructor(appointmentService: AppointmentsService);
    book(req: any, dto: BookAppointmentDto): Promise<{
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
    getMyAppointments(req: any): Promise<({
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
    cancel(req: any, id: string): Promise<{
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
