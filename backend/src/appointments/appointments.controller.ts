/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */

import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  ForbiddenException,
  Param,
  Put,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { BookAppointmentDto } from './dto/book-appointment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('appointments')
@UseGuards(JwtAuthGuard)
export class AppointmentsController {
  constructor(private readonly appointmentService: AppointmentsService) {}

  @Post()
  async book(@Req() req: any, @Body() dto: BookAppointmentDto) {
    if (req.user.role !== 'PATIENT') {
      throw new ForbiddenException('Only patients can book appointments');
    }
    // ✅ Use userId (mapped by JwtStrategy), not sub
    return this.appointmentService.bookAppointment(req.user.userId, dto);
  }

  @Get()
  async getMyAppointments(@Req() req: any) {
    return this.appointmentService.getPatientAppointments(req.user.userId);
  }

  @Put('cancel/:id')
  async cancel(@Req() req: any, @Param('id') id: string) {
    if (req.user.role !== 'PATIENT') {
      throw new ForbiddenException('Only patients can cancel appointments');
    }
    return this.appointmentService.cancelAppointment(req.user.userId, id);
  }
}
