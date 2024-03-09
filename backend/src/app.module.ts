import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MenuModule } from './menu/menu.module';
import { PaymentModule } from './payment/payment.module';
import { CategoriesModule } from './categories/categories.module';
import { RestaurantModule } from './restaurants/restaurant.module';
import { OrderModule } from './orders/order.module';
import { CartModule } from './cart/cart.module';
import { PromotionModule } from './promotion/promotion.module';

@Module({
  imports: [
    MenuModule,
    OrderModule,
    CartModule,
    CategoriesModule,
    PaymentModule,
    RestaurantModule,
    ConfigModule.forRoot(),
    PromotionModule,
  ],
})
export class AppModule {}
