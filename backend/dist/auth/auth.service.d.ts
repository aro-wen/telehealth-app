import { PrismaService } from '../prisma/prisma.service';
import { AuthDto, LoginDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { Role } from '@prisma/client';
interface LoginResponse {
    access_token: string;
    user: {
        id: string;
        role: Role;
        email: string;
    };
}
export declare class AuthService {
    private prisma;
    private jwt;
    constructor(prisma: PrismaService, jwt: JwtService);
    register(dto: AuthDto): Promise<{
        id: string;
        email: string;
        role: Role;
    }>;
    login(dto: LoginDto): Promise<LoginResponse>;
}
export {};
