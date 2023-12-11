import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { describe, beforeAll, it, expect } from 'vitest';
import { MenuItemFactory } from 'test/factories/make-menu-item';
import request from 'supertest';
import { PrismaService } from 'src/prisma.service';

describe('Get all the menu items by category (E2E)', () => {
  let app: INestApplication;
  let menuItemFactory: MenuItemFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [MenuItemFactory, PrismaService],
    }).compile();

    app = moduleRef.createNestApplication();

    menuItemFactory = moduleRef.get(MenuItemFactory);

    await app.init();
  });

  it('[GET] should get all menu items by category', async () => {
    await Promise.all([
      menuItemFactory.makePrismaMenuItem({
        category: 'BURGERS',
      }),
      menuItemFactory.makePrismaMenuItem({
        category: 'BURGERS',
      }),
      menuItemFactory.makePrismaMenuItem({
        category: 'BURGERS',
      }),
      menuItemFactory.makePrismaMenuItem({
        category: 'SIDES',
      }),
    ]);

    const response = await request(app.getHttpServer()).get(
      '/menu/BURGERS/items',
    );

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(3);
  });
});
