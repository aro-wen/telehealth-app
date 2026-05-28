/* eslint-disable prettier/prettier */

import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BookAppointmentDto } from './dto/book-appointment.dto';

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaService) {}

  async bookAppointment(patientId: string, dto: BookAppointmentDto) {
    // 1. Find Doctor
    const doctorUser = await this.prisma.user.findUnique({
      where: { email: dto.doctorEmail },
      include: { doctorProfile: true },
    });

    // ✅ Safe null check
    if (!doctorUser || !doctorUser.doctorProfile) {
      throw new NotFoundException('Doctor not found or profile incomplete');
    }

    // 2. Find Available Slot
    const slot = await this.prisma.scheduleSlot.findFirst({
      where: {
        doctorProfileId: doctorUser.doctorProfile.id,
        startAt: new Date(dto.startAt),
        isAvailable: true,
        appointment: { is: null },
      },
    });

    if (!slot) {
      throw new ConflictException(
        'This time slot is already booked or unavailable',
      );
    }

    // 3. Create Appointment
    const appointment = await this.prisma.appointment.create({
      data: {
        patientId,
        doctorId: doctorUser.id,
        startAt: slot.startAt,
        endAt: slot.endAt,
        status: 'BOOKED',
        slotId: slot.id,
        meetingLink: `https://meet.jit.si/TeleHealth-${slot.id}`,
      },
    });

    // 4. Mark Slot as Unavailable
    await this.prisma.scheduleSlot.update({
      where: { id: slot.id },
      data: { isAvailable: false },
    });

    return appointment;
  }

  async getPatientAppointments(patientId: string) {
    return this.prisma.appointment.findMany({
      where: { patientId },
      orderBy: { startAt: 'desc' },
      include: {
        doctor: {
          select: {
            email: true,
            doctorProfile: { select: { fullName: true, specialization: true } },
          },
        },
      },
    });
  }

  async cancelAppointment(patientId: string, appointmentId: string) {
    const appointment = await this.prisma.appointment.findFirst({
      where: { id: appointmentId, patientId },
      include: { slot: true, doctor: true },
    });

    if (!appointment) throw new NotFoundException('Appointment not found');

    const updated = await this.prisma.appointment.update({
      where: { id: appointmentId },
      data: { status: 'CANCELLED' },
    });

    // Re-open the slot if it exists
    if (appointment.slot) {
      await this.prisma.scheduleSlot.update({
        where: { id: appointment.slot.id },
        data: { isAvailable: true },
      });
    }

    return updated;
  }
}
