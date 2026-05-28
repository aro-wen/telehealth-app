/* eslint-disable prettier/prettier */
import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMedicalRecordDto } from './dto/create-record.dto';

@Injectable()
export class MedicalRecordsService {
  constructor(private prisma: PrismaService) {}

  async createRecord(doctorId: string, dto: CreateMedicalRecordDto) {
    // Verify appointment belongs to this doctor
    const appointment = await this.prisma.appointment.findFirst({
      where: { id: dto.appointmentId, doctorId },
      include: { patient: true },
    });

    if (!appointment) {
      throw new NotFoundException('Appointment not found or access denied');
    }

    // Create or update medical record (upsert)
    return this.prisma.medicalRecord.upsert({
      where: { appointmentId: dto.appointmentId },
      update: {
        diagnosis: dto.diagnosis,
        prescriptions: dto.prescriptions,
        doctorNotes: dto.doctorNotes,
      },
      create: {
        appointmentId: dto.appointmentId,
        patientId: appointment.patientId,
        diagnosis: dto.diagnosis,
        prescriptions: dto.prescriptions,
        doctorNotes: dto.doctorNotes,
      },
    });
  }

  async getPatientRecords(patientId: string) {
    return this.prisma.medicalRecord.findMany({
      where: { patientId },
      orderBy: { createdAt: 'desc' },
      include: {
        appointment: {
          select: {
            id: true,
            startAt: true,
            doctor: {
              select: {
                email: true,
                doctorProfile: { select: { fullName: true } },
              },
            },
          },
        },
      },
    });
  }
}
