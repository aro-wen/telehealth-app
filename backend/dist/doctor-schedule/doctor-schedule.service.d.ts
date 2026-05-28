import { PrismaService } from '../prisma/prisma.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
export declare class DoctorScheduleService {
    private prisma;
    constructor(prisma: PrismaService);
    getSchedule(doctorId: string): Promise<{
        id: string;
        createdAt: Date;
        startAt: Date;
        endAt: Date;
        doctorProfileId: string;
        isAvailable: boolean;
    }[]>;
    manageSchedule(doctorId: string, dto: CreateScheduleDto): Promise<{
        id: string;
        createdAt: Date;
        startAt: Date;
        endAt: Date;
        doctorProfileId: string;
        isAvailable: boolean;
    }>;
}
