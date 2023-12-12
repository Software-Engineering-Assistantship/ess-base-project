import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MenuModule } from './menu/menu.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [MenuModule, ConfigModule.forRoot(), PaymentModule],
})
export class AppModule {}
