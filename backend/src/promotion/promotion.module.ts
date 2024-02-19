import { Module } from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { PromotionController } from './promotion.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [PromotionController],
  providers: [PromotionService, PrismaService],
})
export class PromotionModule {}
