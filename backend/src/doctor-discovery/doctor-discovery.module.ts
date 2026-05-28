import { Module } from '@nestjs/common';
import { DoctorDiscoveryController } from './doctor-discovery.controller';
import { DoctorDiscoveryService } from './doctor-discovery.service';

@Module({
  controllers: [DoctorDiscoveryController],
  providers: [DoctorDiscoveryService],
  exports: [DoctorDiscoveryService],
})
export class DoctorDiscoveryModule {}
