import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MenuModule } from './menu/menu.module';
import { PaymentModule } from './payment/payment.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    MenuModule,
    ConfigModule.forRoot(),
    CategoriesModule,
    PaymentModule,
  ],
})
export class AppModule {}
