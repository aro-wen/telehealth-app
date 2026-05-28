import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // ✅ Makes PrismaService available app-wide without importing everywhere
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
