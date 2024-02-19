import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { describe, beforeAll, it, expect } from 'vitest';
import { OrderFactory } from 'test/factories/make-order';
import request from 'supertest';
import { PrismaService } from 'src/database/prisma.service';
import { CategoryFactory } from 'test/factories/make-category';
import { MenuItemFactory } from 'test/factories/make-menu-item';

describe('Get one specific order by id (E2E)', () => {
  let app: INestApplication;
  let categoryFactory: CategoryFactory;
  let menuItemFactory: MenuItemFactory;
  let orderFactory: OrderFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        CategoryFactory,
        MenuItemFactory,
        OrderFactory,
        PrismaService,
      ],
    }).compile();

    app = moduleRef.createNestApplication();

    categoryFactory = moduleRef.get(CategoryFactory);

    menuItemFactory = moduleRef.get(MenuItemFactory);

    orderFactory = moduleRef.get(OrderFactory);

    await app.init();
  });

  it('[GET] should get one specific order by id', async () => {
    const category = await categoryFactory.makePrismaCategory();

    const menuItems = await Promise.all([
      menuItemFactory.makePrismaMenuItem({
        title: 'burger 1',
        categoryId: category.id,
      }),
      menuItemFactory.makePrismaMenuItem({
        title: 'burger 2',
        categoryId: category.id,
      }),
      menuItemFactory.makePrismaMenuItem({
        title: 'burger 3',
        categoryId: category.id,
      }),
    ]);

    const order = await orderFactory.makePrismaOrder({
      menuItems,
    });

    const response = await request(app.getHttpServer()).get(
      `/order/${order.id}`,
    );

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        menuItems: expect.arrayContaining([
          expect.objectContaining({
            menu: expect.objectContaining({
              title: 'burger 1',
            }),
          }),
          expect.objectContaining({
            menu: expect.objectContaining({
              title: 'burger 2',
            }),
          }),
          expect.objectContaining({
            menu: expect.objectContaining({
              title: 'burger 3',
            }),
          }),
        ]),
      }),
    );
  });
});
