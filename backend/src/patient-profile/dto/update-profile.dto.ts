import { IsString, IsNumber, IsOptional, IsDateString } from 'class-validator';

export class UpdatePatientProfileDto {
  @IsString()
  fullName!: string;

  @IsDateString()
  dateOfBirth!: string;

  @IsOptional()
  @IsNumber()
  weight?: number;

  @IsOptional()
  @IsNumber()
  height?: number;

  @IsOptional()
  @IsString()
  contactDetails?: string;

  @IsOptional()
  @IsString()
  basicMedicalHistory?: string;

  @IsOptional()
  @IsString()
  profilePictureUrl?: string;
}
