import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PatientProfileModule } from './patient-profile/patient-profile.module';
import { DoctorDiscoveryModule } from './doctor-discovery/doctor-discovery.module';
import { DoctorScheduleModule } from './doctor-schedule/doctor-schedule.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { NotificationsModule } from './notification/notification.module';
import { MedicalRecordsModule } from './medical-records/medical-records.module'; // ✅ ADD THIS
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    PatientProfileModule,
    DoctorDiscoveryModule,
    DoctorScheduleModule,
    AppointmentsModule,
    NotificationsModule,
    MedicalRecordsModule, // ✅ ADD THIS LINE
  ],
})
export class AppModule {}
