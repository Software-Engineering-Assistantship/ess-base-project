import { faker } from '@faker-js/faker';

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Order } from 'src/orders/entities/order';
import { makeMenuItem } from './make-menu-item';

export function makeOrder(override: Partial<Order> = {}) {
  return {
    id: faker.string.uuid(),
    comment: faker.string.nanoid(),
    rate: faker.number.float(),
    menuItems: Array.from(
      { length: faker.number.int({ min: 1, max: 10 }) },
      () => makeMenuItem(),
    ),
    ...override,
  };
}

@Injectable()
export class OrderFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaOrder(data: Partial<Order> = {}): Promise<Order> {
    const order = makeOrder(data);

    const orderOnDatabase = await this.prisma.orders.create({
      data: {
        id: order.id,
        comment: order.comment,
        rate: order.rate,
      },
    });

    await Promise.all(
      order.menuItems.map(async (item) => {
        await this.prisma.orderMenu.create({
          data: {
            orderId: orderOnDatabase.id,
            menuId: item.id,
          },
        });
      }),
    );

    return order;
  }
}
