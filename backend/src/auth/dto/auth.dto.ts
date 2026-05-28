import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  // MinLength,
} from 'class-validator';
import { Role } from '@prisma/client';

export class AuthDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(Role)
  role: Role; // 'PATIENT' or 'DOCTOR'
}

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
