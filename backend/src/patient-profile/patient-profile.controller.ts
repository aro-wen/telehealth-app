import { Controller, Get, Put, Body, UseGuards, Param } from '@nestjs/common';
import { PatientProfileService } from './patient-profile.service';
import { UpdatePatientProfileDto } from './dto/update-profile.dto';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('patient/profile')
@UseGuards(JwtAuthGuard)
export class PatientProfileController {
  constructor(private readonly profileService: PatientProfileService) {}

  @Get()
  async getProfile(@GetUser() user: { sub: string }) {
    return this.profileService.getProfile(user.sub);
  }

  @Put()
  async updateProfile(
    @GetUser() user: { sub: string },
    @Body() dto: UpdatePatientProfileDto,
  ) {
    return this.profileService.updateProfile(user.sub, dto);
  }
}
