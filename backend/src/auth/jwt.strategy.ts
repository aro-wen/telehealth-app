/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/require-await */

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: any) => req.cookies?.access_token || null,
      ]),
      secretOrKey: process.env.JWT_SECRET || 'super-secret-key-change-in-prod',
    });
  }

  async validate(payload: any) {
    return {
      userId: payload.sub,
      role: payload.role,
      email: payload.email,
    };
  }
}
