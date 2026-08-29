import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module.js';
import { GymsService } from './gyms.service.js';

@Module({
  imports: [PrismaModule],
  providers: [GymsService],
  exports: [GymsService],
})
export class GymsModule {}
