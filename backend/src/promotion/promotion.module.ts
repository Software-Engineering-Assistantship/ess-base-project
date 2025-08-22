import { Module } from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { PromotionController } from './promotion.controller';
import { PrismaService } from 'src/database/prisma.service';
import { PrismaMenuService } from '../menu/services/menu.service';

@Module({
  controllers: [PromotionController],
  providers: [PromotionService, PrismaService, PrismaMenuService],
})
export class PromotionModule {}
