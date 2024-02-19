import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { DatabaseModule } from 'src/database/database.module';
import { CartService } from './services/cart.service'; 
import { CartController } from './controllers/cart.controller';

@Module({
  imports: [DatabaseModule],
  providers: [PrismaService, CartService], 
  controllers: [
    CartController
  ],
})
export class CartModule {}
