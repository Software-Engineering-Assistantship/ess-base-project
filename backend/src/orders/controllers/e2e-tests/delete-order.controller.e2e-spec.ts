import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { describe, beforeAll, it, expect } from 'vitest';
import { OrderFactory } from 'test/factories/make-order';
import request from 'supertest';
import { PrismaService } from 'src/database/prisma.service';
import { CategoryFactory } from 'test/factories/make-category';
import { MenuItemFactory } from 'test/factories/make-menu-item';
import { DatabaseModule } from 'src/database/database.module';

describe('Delete an order (E2E)', () => {
  let app: INestApplication;
  let categoryFactory: CategoryFactory;
  let menuItemFactory: MenuItemFactory;
  let orderFactory: OrderFactory;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        OrderFactory,
        MenuItemFactory,
        CategoryFactory,
        PrismaService,
      ],
    }).compile();

    app = moduleRef.createNestApplication();

    prisma = moduleRef.get(PrismaService);

    categoryFactory = moduleRef.get(CategoryFactory);

    menuItemFactory = moduleRef.get(MenuItemFactory);

    orderFactory = moduleRef.get(OrderFactory);

    await app.init();
  });

  it('[DELETE] should delete an order', async () => {
    const category = await categoryFactory.makePrismaCategory();

    const menuItem = await menuItemFactory.makePrismaMenuItem({
      categoryId: category.id,
    });

    const order = await orderFactory.makePrismaOrder({ menuItems: [menuItem] });

    const response = await request(app.getHttpServer()).delete(
      `/order/${order.id}`,
    );

    expect(response.statusCode).toBe(204);

    const orderItemOnDatabase = await prisma.orders.findUnique({
      where: {
        id: order.id,
      },
    });

    expect(orderItemOnDatabase).toBeNull();
  });
});
