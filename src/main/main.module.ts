import { Module } from '@nestjs/common';
import { MainService } from './main.service';
import { MainController } from './main.controller';
import { PrismaService } from '../prisma.service';
@Module({
  controllers: [MainController],
  providers: [PrismaService, MainService],
  exports: [MainService],
})
export class MainModule {}
