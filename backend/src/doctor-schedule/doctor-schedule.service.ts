import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';

@Injectable()
export class DoctorScheduleService {
  constructor(private prisma: PrismaService) {}

  // Get Doctor's full schedule
  async getSchedule(doctorId: string) {
    return this.prisma.scheduleSlot.findMany({
      where: { doctorProfileId: doctorId },
      orderBy: { startAt: 'asc' },
    });
  }

  // Create or Update a Slot (Block/Unblock time)
  async manageSchedule(doctorId: string, dto: CreateScheduleDto) {
    // Check for overlaps
    const overlap = await this.prisma.scheduleSlot.findFirst({
      where: {
        doctorProfileId: doctorId,
        startAt: { lt: new Date(dto.endAt) },
        endAt: { gt: new Date(dto.startAt) },
      },
    });

    if (overlap) {
      throw new ConflictException(
        'This time slot overlaps with an existing slot.',
      );
    }

    return this.prisma.scheduleSlot.create({
      data: {
        doctorProfileId: doctorId,
        startAt: new Date(dto.startAt),
        endAt: new Date(dto.endAt),
        isAvailable: !dto.isBlocked, // isBlocked=true means isAvailable=false
      },
    });
  }
}
