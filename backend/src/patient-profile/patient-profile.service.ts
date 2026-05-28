import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdatePatientProfileDto } from './dto/update-profile.dto';

@Injectable()
export class PatientProfileService {
  constructor(private prisma: PrismaService) {}

  async getProfile(userId: string) {
    const profile = await this.prisma.patientProfile.findUnique({
      where: { userId },
    });
    if (!profile) throw new NotFoundException('Patient profile not found');
    return profile;
  }

  async updateProfile(userId: string, dto: UpdatePatientProfileDto) {
    return this.prisma.patientProfile.update({
      where: { userId },
      data: {
        fullName: dto.fullName,
        dateOfBirth: new Date(dto.dateOfBirth),
        weight: dto.weight,
        height: dto.height,
        contactDetails: dto.contactDetails,
        basicMedicalHistory: dto.basicMedicalHistory,
        profilePictureUrl: dto.profilePictureUrl,
      },
    });
  }
}
