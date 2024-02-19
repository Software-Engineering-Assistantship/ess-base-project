import { INestApplication } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import request from 'supertest';
import { describe, beforeAll, it, expect } from 'vitest';
import { CategoryFactory } from 'test/factories/make-category';
import { MenuItemFactory } from 'test/factories/make-menu-item';
import { CreateRestaurantSchema } from '../dto/create-restaurant';

const mockRestaurantInput: CreateRestaurantSchema = {
  name: 'Carlos Burguer',
  address: 'Rua 123',
  closingTime: new Date('1970-01-01T00:00:00.000Z'),
  type: 'Hamburgueria',
};

const mockRestaurantInput2: CreateRestaurantSchema = {
  name: 'Jose Burguer',
  address: 'Rua 123',
  closingTime: new Date('1970-01-01T00:00:00.000Z'),
  type: 'Hamburgueria',
};

describe('RestaurantController', () => {
  let app: INestApplication;
  let restaurantId: string;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [CategoryFactory, MenuItemFactory, PrismaService],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    await request(app.getHttpServer())
      .post('/restaurants')
      .send({ ...mockRestaurantInput2 });
  });

  describe('POST', () => {
    it('[POST] should create a restaurant', async () => {
      const response = await request(app.getHttpServer())
        .post('/restaurants')
        .send({ ...mockRestaurantInput });

      restaurantId = response.body.id;

      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual({
        id: expect.anything(),
        ...mockRestaurantInput,
        closingTime: mockRestaurantInput.closingTime.toISOString(),
      });
    });

    it('[POST] should fail if restaurant name already exists', async () => {
      const response = await request(app.getHttpServer())
        .post('/restaurants')
        .send({ ...mockRestaurantInput });

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toEqual('Restaurant name already taken');
    });
  });

  describe('GET', () => {
    it('[GET] should find restaurant by id', async () => {
      const response = await request(app.getHttpServer()).get(
        `/restaurants/${restaurantId}`,
      );

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        id: restaurantId,
        ...mockRestaurantInput,
        closingTime: mockRestaurantInput.closingTime.toISOString(),
        categories: [],
      });
    });

    it('[GET] should find all restaurants', async () => {
      const response = await request(app.getHttpServer()).get('/restaurants/');

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            ...mockRestaurantInput,
            closingTime: mockRestaurantInput.closingTime.toISOString(),
            categories: [],
          }),
          expect.objectContaining({
            ...mockRestaurantInput2,
            closingTime: mockRestaurantInput2.closingTime.toISOString(),
            categories: [],
          }),
        ]),
      );
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe('PATCH', () => {
    it('[PATCH] should update a restaurant', async () => {
      const updateInput = {
        name: 'Jonas Burguer',
      };

      const response = await request(app.getHttpServer())
        .patch(`/restaurants/${restaurantId}`)
        .send({ ...updateInput });

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        ...mockRestaurantInput,
        id: restaurantId,
        name: updateInput.name,
        closingTime: mockRestaurantInput.closingTime.toISOString(),
        categories: [],
      });
    });

    it('[PATCH] should fail if restaurant name already exists', async () => {
      const updateInput = {
        name: 'Jonas Burguer',
      };

      const response = await request(app.getHttpServer())
        .patch(`/restaurants/${restaurantId}`)
        .send({ ...updateInput });

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toEqual('Restaurant name already taken');
    });

    it('[PATCH] should fail if restaurant id does not exist', async () => {
      const updateInput = {
        name: 'Jonas Burguer',
      };

      const response = await request(app.getHttpServer())
        .patch('/restaurants/3')
        .send({ ...updateInput });

      expect(response.statusCode).toBe(404);
      expect(response.body.message).toEqual('Restaurant not found');
    });
  });

  describe('DELETE', () => {
    it('[DELETE] should delete a restaurant', async () => {
      const response = await request(app.getHttpServer()).delete(
        `/restaurants/${restaurantId}`,
      );

      expect(response.statusCode).toBe(200);
    });
  });
});
