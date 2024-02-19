import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { describe, beforeAll, it, expect } from 'vitest';
import { MenuItemFactory } from 'test/factories/make-menu-item';
import request from 'supertest';
import { PrismaService } from 'src/database/prisma.service';
import { CategoryFactory } from 'test/factories/make-category';

describe('Get one specific item by id (E2E)', () => {
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

  it('[GET] should get one specific item by id', async () => {
    const category = await categoryFactory.makePrismaCategory();

    const menuItem = await menuItemFactory.makePrismaMenuItem({
      title: 'Burger test',
      categoryId: category.id,
    });

    const response = await request(app.getHttpServer()).get(
      `/menu/item/${menuItem.id}`,
    );

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        title: 'Burger test',
      }),
    );
  });
});
