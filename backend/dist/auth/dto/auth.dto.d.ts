import { Role } from '@prisma/client';
export declare class AuthDto {
    email: string;
    password: string;
    role: Role;
}
export declare class LoginDto {
    email: string;
    password: string;
}
