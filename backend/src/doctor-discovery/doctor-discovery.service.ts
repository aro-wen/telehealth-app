import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

// Simple keyword → specialization mapper (100% free, zero API calls)
const SYMPTOM_MAP: Record<string, string[]> = {
  headache: ['General Practice', 'Neurology'],
  fever: ['General Practice', 'Infectious Disease'],
  cough: ['General Practice', 'Pulmonology'],
  chest: ['Cardiology', 'Pulmonology'],
  stomach: ['Gastroenterology', 'General Practice'],
  skin: ['Dermatology'],
  mental: ['Psychiatry', 'Psychology'],
  anxiety: ['Psychiatry', 'Psychology'],
  depression: ['Psychiatry', 'Psychology'],
  joint: ['Orthopedics', 'Rheumatology'],
  back: ['Orthopedics', 'Neurology'],
};

@Injectable()
export class DoctorDiscoveryService {
  constructor(private prisma: PrismaService) {}

  async getDoctors(params: { specialization?: string; available?: string }) {
    const where: Record<string, any> = {};
    if (params.specialization)
      where.specialization = {
        contains: params.specialization,
        mode: 'insensitive',
      };

    // Note: Real-time availability requires joining with ScheduleSlot & Appointment tables.
    // For MVP, we return all doctors; frontend filters by "Available Today" badge.
    return this.prisma.doctorProfile.findMany({
      where,
      select: {
        id: true,
        fullName: true,
        specialization: true,
        bio: true,
        licenseNumber: true,
        profilePictureUrl: true,
        isVerified: true,
        user: { select: { email: true } },
      },
    });
  }

  recommendSpecialization(symptoms: string): string[] {
    const lower = symptoms.toLowerCase();
    const matches = Object.entries(SYMPTOM_MAP)
      .filter(([key]) => lower.includes(key))
      .flatMap(([, specs]) => specs);

    return matches.length ? [...new Set(matches)] : ['General Practice'];
  }
}
