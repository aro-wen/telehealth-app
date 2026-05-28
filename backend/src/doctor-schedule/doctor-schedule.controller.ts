/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  ForbiddenException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { DoctorScheduleService } from './doctor-schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PrismaService } from '../prisma/prisma.service';

@Controller('doctor/schedule')
@UseGuards(JwtAuthGuard)
export class DoctorScheduleController {
  constructor(
    private readonly scheduleService: DoctorScheduleService,
    private readonly prisma: PrismaService,
  ) {}

  @Get()
  async getMySchedule(@Req() req: any) {
    if (req.user.role !== 'DOCTOR') {
      throw new ForbiddenException('Access denied: Doctors only');
    }
    // ✅ Use userId (mapped by JwtStrategy) instead of sub
    const profile = await this.prisma.doctorProfile.findUnique({
      where: { userId: req.user.userId },
    });
    if (!profile) throw new ForbiddenException('Doctor profile not found.');

    return this.scheduleService.getSchedule(profile.id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async setSlot(@Req() req: any, @Body() dto: CreateScheduleDto) {
    if (req.user.role !== 'DOCTOR') {
      throw new ForbiddenException('Access denied: Doctors only');
    }
    // ✅ Use userId here too
    const profile = await this.prisma.doctorProfile.findUnique({
      where: { userId: req.user.userId },
    });
    if (!profile) throw new ForbiddenException('Doctor profile not found.');

    return this.scheduleService.manageSchedule(profile.id, dto);
  }
}
