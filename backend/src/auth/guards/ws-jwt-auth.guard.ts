/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class WsJwtAuthGuard implements CanActivate {
  constructor(private jwt: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const client = context.switchToWs().getClient();
    const token =
      client.handshake.auth.token ||
      client.handshake.headers.authorization?.replace('Bearer ', '');

    if (!token) return false;

    try {
      const payload = this.jwt.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      client.handshake.auth.userId = payload.sub;
      client.handshake.auth.role = payload.role;
      return true;
    } catch {
      return false;
    }
  }
}
