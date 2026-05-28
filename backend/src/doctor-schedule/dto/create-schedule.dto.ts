import { IsDateString, IsBoolean, IsOptional } from 'class-validator';

export class CreateScheduleDto {
  @IsDateString()
  startAt!: string;

  @IsDateString()
  endAt!: string;

  @IsOptional()
  @IsBoolean()
  isBlocked?: boolean; // Default true
}
