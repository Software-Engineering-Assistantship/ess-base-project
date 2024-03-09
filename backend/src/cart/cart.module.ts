import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { DatabaseModule } from 'src/database/database.module';
import { PrismaCartService } from './services/cart.service';
import { CartController } from './controllers/cart.controller';

@Module({
  providers: [PrismaService, PrismaCartService],
  controllers: [CartController],
})
export class CartModule {}
