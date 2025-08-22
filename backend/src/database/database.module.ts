import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaMenuService } from 'src/menu/services/menu.service';
import { MenuService } from 'src/interfaces/menu-service';
import { OrderService } from 'src/interfaces/order-service';
import { PrismaOrderService } from 'src/orders/services/order.service';

@Module({
  providers: [
    PrismaService,
    {
      provide: MenuService,
      useClass: PrismaMenuService,
    },
    {
      provide: OrderService,
      useClass: PrismaOrderService,
    },
  ],
  exports: [MenuService, OrderService],
})
export class DatabaseModule {}
