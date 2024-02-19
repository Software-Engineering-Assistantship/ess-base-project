import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MenuModule } from './menu/menu.module';
import { PaymentModule } from './payment/payment.module';
import { CategoriesModule } from './categories/categories.module';
import { OrderModule } from './orders/order.module';

@Module({
  imports: [
    MenuModule,
    OrderModule,
    CategoriesModule,
    PaymentModule,
    ConfigModule.forRoot(),
  ],
})
export class AppModule {}
