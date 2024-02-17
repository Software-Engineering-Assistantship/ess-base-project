import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { describe, beforeAll, it, expect } from 'vitest';
import { MenuItemFactory } from 'test/factories/make-menu-item';
import request from 'supertest';
import { PrismaService } from 'src/database/prisma.service';
import { CategoryFactory } from 'test/factories/make-category';

describe('Delete an item from the menu (E2E)', () => {
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

  it('[DELETE] should delete an menu item', async () => {
    const category = await categoryFactory.makePrismaCategory();

    const menuItem = await menuItemFactory.makePrismaMenuItem({
      categoryId: category.id,
    });

    const response = await request(app.getHttpServer()).delete(
      `/menu/item/${menuItem.id}`,
    );

    expect(response.statusCode).toBe(204);

    const menuItemOnDatabase = await prisma.menu.findUnique({
      where: {
        id: menuItem.id,
      },
    });

    expect(menuItemOnDatabase).toBeNull();
  });
});
