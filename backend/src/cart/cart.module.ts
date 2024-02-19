import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CartController } from './controllers/cart.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [
    CartController
  ],
})
export class CartModule {}
