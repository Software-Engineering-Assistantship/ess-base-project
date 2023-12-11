import { INestApplication } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import request from 'supertest';
import { describe, beforeAll, it, expect } from 'vitest';

describe('Create an item from the menu (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    prisma = moduleRef.get(PrismaService);

    await app.init();
  });

  it('[POST] should create an menu item', async () => {
    const response = await request(app.getHttpServer()).post('/menu').send({
      title: 'Burger 1',
      description: 'Description',
      price: 200,
      quantity: 1,
      category: 'BURGERS',
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
