import { INestApplication } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import request from 'supertest';
import { describe, beforeAll, it, expect } from 'vitest';
import { CategoryFactory } from 'test/factories/make-category';
import { MenuItemFactory } from 'test/factories/make-menu-item';

describe('Create an order (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let categoryFactory: CategoryFactory;
  let menuItemFactory: MenuItemFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [CategoryFactory, MenuItemFactory, PrismaService],
    }).compile();

    app = moduleRef.createNestApplication();

    prisma = moduleRef.get(PrismaService);

    categoryFactory = moduleRef.get(CategoryFactory);

    menuItemFactory = moduleRef.get(MenuItemFactory);

    await app.init();
  });

  it('[POST] should create an order', async () => {
    const category = await categoryFactory.makePrismaCategory();
    const menuItems = await Promise.all(
      Array.from({ length: 4 }, async () => {
        return await menuItemFactory.makePrismaMenuItem({
          categoryId: category.id,
        });
      }),
    );

    const response = await request(app.getHttpServer()).post('/order').send({
      comment: 'amazing',
      menuItems,
    });

    expect(response.statusCode).toBe(201);

    const menuItem = await prisma.orders.findFirst({
      where: {
        comment: 'amazing',
      },
    });

    expect(menuItem).toBeTruthy();
  });
});
