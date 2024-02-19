import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MenuModule } from './menu/menu.module';
import { PaymentModule } from './payment/payment.module';
import { CategoriesModule } from './categories/categories.module';
import { RestaurantModule } from './restaurants/restaurant.module';

@Module({
  imports: [
    MenuModule,
    ConfigModule.forRoot(),
    CategoriesModule,
    PaymentModule,
    RestaurantModule,
  ],
})
export class AppModule {}
