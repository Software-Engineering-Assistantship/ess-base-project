import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { describe, beforeAll, it, expect } from 'vitest';
import { MenuItemFactory } from 'test/factories/make-menu-item';
import request from 'supertest';
import { PrismaService } from 'src/database/prisma.service';
import { CategoryFactory } from 'test/factories/make-category';

describe('Update one specific menu item (E2E)', () => {
  let app: INestApplication;
  let menuItemFactory: MenuItemFactory;
  let categoryFactory: CategoryFactory;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [MenuItemFactory, CategoryFactory, PrismaService],
    }).compile();

    app = moduleRef.createNestApplication();

    prisma = moduleRef.get(PrismaService);

    menuItemFactory = moduleRef.get(MenuItemFactory);

    categoryFactory = moduleRef.get(CategoryFactory);

    await app.init();
  });

  it('[GET] should update one specific menu item', async () => {
    const category = await categoryFactory.makePrismaCategory();

    const menuItem = await menuItemFactory.makePrismaMenuItem({
      title: 'Burger test',
      categoryId: category.id,
    });

    const response = await request(app.getHttpServer())
      .patch(`/menu/item/${menuItem.id}`)
      .send({
        title: 'New title edited',
      });

    expect(response.statusCode).toBe(200);

    const menuItemOnDatabase = await prisma.menu.findUnique({
      where: {
        id: menuItem.id,
      },
    });

    expect(menuItemOnDatabase).toBeTruthy();
    expect(menuItemOnDatabase).toEqual(
      expect.objectContaining({ title: 'New title edited' }),
    );
  });
});
