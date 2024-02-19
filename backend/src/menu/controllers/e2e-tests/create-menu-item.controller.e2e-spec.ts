import { INestApplication } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import request from 'supertest';
import { describe, beforeAll, it, expect } from 'vitest';
import { CategoryFactory } from 'test/factories/make-category';

describe('Create an item from the menu (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let categoryFactory: CategoryFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [CategoryFactory, PrismaService],
    }).compile();

    app = moduleRef.createNestApplication();

    prisma = moduleRef.get(PrismaService);

    categoryFactory = moduleRef.get(CategoryFactory);

    await app.init();
  });

  it('[POST] should create an menu item', async () => {
    const category = await categoryFactory.makePrismaCategory();

    const response = await request(app.getHttpServer()).post('/menu').send({
      title: 'Burger 1',
      description: 'Description',
      price: 200,
      quantity: 1,
      categoryId: category.id,
    });

    expect(response.statusCode).toBe(201);

    const menuItem = await prisma.menu.findFirst({
      where: {
        title: 'Burger 1',
      },
    });

    expect(menuItem).toBeTruthy();
  });
});
