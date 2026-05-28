import { Module } from '@nestjs/common';
import { NotificationsGateway } from './notification.gateway';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'super-secret-key-change-in-prod',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [NotificationsGateway], // ✅ Gateway must be listed here
  exports: [NotificationsGateway],
})
export class NotificationsModule {}
