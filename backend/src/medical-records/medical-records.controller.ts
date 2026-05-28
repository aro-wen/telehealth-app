/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { MedicalRecordsService } from './medical-records.service';
import { CreateMedicalRecordDto } from './dto/create-record.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('medical-records')
@UseGuards(JwtAuthGuard)
export class MedicalRecordsController {
  constructor(private readonly recordsService: MedicalRecordsService) {}

  @Post()
  async create(@Req() req: any, @Body() dto: CreateMedicalRecordDto) {
    if (req.user.role !== 'DOCTOR') {
      throw new ForbiddenException('Only doctors can create medical records');
    }
    // ✅ Use userId (mapped by JwtStrategy)
    return this.recordsService.createRecord(req.user.userId, dto);
  }

  @Get('patient')
  async getMyRecords(@Req() req: any) {
    if (req.user.role !== 'PATIENT') {
      throw new ForbiddenException('Only patients can view their records');
    }
    return this.recordsService.getPatientRecords(req.user.userId);
  }
}
