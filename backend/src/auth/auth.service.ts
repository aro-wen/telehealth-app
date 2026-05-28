import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto, LoginDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Role } from '@prisma/client';

interface JwtPayload {
  sub: string;
  role: Role;
  email: string;
}

interface LoginResponse {
  access_token: string;
  user: {
    id: string;
    role: Role;
    email: string;
  };
}

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async register(
    dto: AuthDto,
  ): Promise<{ id: string; email: string; role: Role }> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const newUser = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        role: dto.role,
        patientProfile:
          dto.role === Role.PATIENT
            ? {
                create: {
                  fullName: 'New Patient',
                  dateOfBirth: new Date('2000-01-01'),
                },
              }
            : undefined,
        doctorProfile:
          dto.role === Role.DOCTOR
            ? {
                create: {
                  fullName: 'New Doctor',
                  specialization: 'General Practice',
                  licenseNumber: 'TEMP-' + Date.now(),
                },
              }
            : undefined,
      },
      select: {
        id: true,
        email: true,
        role: true,
      },
    });

    return newUser;
  }

  async login(dto: LoginDto): Promise<LoginResponse> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
      select: {
        id: true,
        email: true,
        role: true,
        password: true,
      },
    });

    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = {
      sub: user.id,
      role: user.role,
      email: user.email,
    };

    const access_token = this.jwt.sign(payload);

    return {
      access_token,
      user: {
        id: user.id,
        role: user.role,
        email: user.email,
      },
    };
  }
}
