import { IsDateString, IsString } from 'class-validator';

export class BookAppointmentDto {
  @IsDateString()
  startAt!: string;

  @IsString()
  doctorEmail!: string; // Using email to find the doctor profile
}
