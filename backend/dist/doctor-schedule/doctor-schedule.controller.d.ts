import { DoctorScheduleService } from './doctor-schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class DoctorScheduleController {
    private readonly scheduleService;
    private readonly prisma;
    constructor(scheduleService: DoctorScheduleService, prisma: PrismaService);
    getMySchedule(req: any): Promise<{
        id: string;
        createdAt: Date;
        startAt: Date;
        endAt: Date;
        doctorProfileId: string;
        isAvailable: boolean;
    }[]>;
    setSlot(req: any, dto: CreateScheduleDto): Promise<{
        id: string;
        createdAt: Date;
        startAt: Date;
        endAt: Date;
        doctorProfileId: string;
        isAvailable: boolean;
    }>;
}
