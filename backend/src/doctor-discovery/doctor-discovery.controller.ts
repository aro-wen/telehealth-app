import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { DoctorDiscoveryService } from './doctor-discovery.service';

interface SymptomDto {
  symptoms: string;
}

@Controller('doctors')
export class DoctorDiscoveryController {
  constructor(private readonly discoveryService: DoctorDiscoveryService) {}

  @Get()
  async listDoctors(
    @Query('specialization') spec?: string,
    @Query('available') avail?: string,
  ) {
    return this.discoveryService.getDoctors({
      specialization: spec,
      available: avail,
    });
  }

  @Post('ai-recommend')
  aiRecommend(@Body() body: SymptomDto) {
    const specializations = this.discoveryService.recommendSpecialization(
      body.symptoms,
    );
    return {
      recommendedSpecializations: specializations,
      note: 'Based on symptom keyword mapping',
    };
  }
}
