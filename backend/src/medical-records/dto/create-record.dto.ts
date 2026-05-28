/* eslint-disable prettier/prettier */
import { IsString, IsOptional, IsUUID } from 'class-validator';

export class CreateMedicalRecordDto {
  @IsUUID()
  appointmentId!: string;

  @IsOptional()
  @IsString()
  diagnosis?: string;

  @IsOptional()
  @IsString()
  prescriptions?: string;

  @IsOptional()
  @IsString()
  doctorNotes?: string;
}
