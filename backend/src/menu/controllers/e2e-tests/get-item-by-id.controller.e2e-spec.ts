import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { describe, beforeAll, it, expect } from 'vitest';
import { MenuItemFactory } from 'test/factories/make-menu-item';
import request from 'supertest';
import { PrismaService } from 'src/prisma.service';

describe('Get one specific item by id', () => {
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

  it('[GET] should get one specific item by id', async () => {
    const menuItem = await menuItemFactory.makePrismaMenuItem({
      title: 'Burger test',
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
