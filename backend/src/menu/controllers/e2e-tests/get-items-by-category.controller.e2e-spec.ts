import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { describe, beforeAll, it, expect } from 'vitest';
import { MenuItemFactory } from 'test/factories/make-menu-item';
import request from 'supertest';
import { PrismaService } from 'src/database/prisma.service';
import { CategoryFactory } from 'test/factories/make-category';

describe('Get all the menu items by category (E2E)', () => {
  let app: INestApplication;
  let menuItemFactory: MenuItemFactory;
  let categoryFactory: CategoryFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [MenuItemFactory, CategoryFactory, PrismaService],
    }).compile();

    app = moduleRef.createNestApplication();

    menuItemFactory = moduleRef.get(MenuItemFactory);

    categoryFactory = moduleRef.get(CategoryFactory);

    await app.init();
  });

  it('[GET] should get all menu items by category', async () => {
    const firstCategory = await categoryFactory.makePrismaCategory();
    const secondCategory = await categoryFactory.makePrismaCategory();

    await Promise.all([
      menuItemFactory.makePrismaMenuItem({
        categoryId: firstCategory.id,
      }),
      menuItemFactory.makePrismaMenuItem({
        categoryId: firstCategory.id,
      }),
      menuItemFactory.makePrismaMenuItem({
        categoryId: firstCategory.id,
      }),
      menuItemFactory.makePrismaMenuItem({
        categoryId: secondCategory.id,
      }),
    ]);

    const response = await request(app.getHttpServer()).get(
      `/menu/${firstCategory.id}/items`,
    );

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(3);
  });
});
