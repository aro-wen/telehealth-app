import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
export declare class WsJwtAuthGuard implements CanActivate {
    private jwt;
    constructor(jwt: JwtService);
    canActivate(context: ExecutionContext): boolean;
}
