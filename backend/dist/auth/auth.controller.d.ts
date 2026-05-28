import { AuthService } from './auth.service';
import { AuthDto, LoginDto } from './dto/auth.dto';
import type { Response } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: AuthDto): Promise<{
        id: string;
        email: string;
        role: import(".prisma/client").Role;
    }>;
    login(dto: LoginDto, res: Response): Promise<{
        message: string;
        user: {
            id: string;
            role: import(".prisma/client").Role;
            email: string;
        };
    }>;
}
