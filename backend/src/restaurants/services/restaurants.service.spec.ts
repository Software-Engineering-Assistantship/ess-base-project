import { describe, it, expect, beforeAll } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from 'src/database/prisma.service';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantSchema } from '../dto/create-restaurant';

const mockRestaurantInput: CreateRestaurantSchema = {
  name: 'Carlos Burguer Test',
  address: 'Rua 123',
  closingTime: new Date('1970-01-01T00:00:00.000Z'),
  type: 'Hamburgueria',
  picture: null,
};

describe('RestaurantsService', () => {
  let service: RestaurantsService;
  let restaurantId: string;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RestaurantsService, PrismaService],
    }).compile();

    service = module.get<RestaurantsService>(RestaurantsService);
  });

  describe('create restaurant', () => {
    it('should create a restaurant', async () => {
      const createdRestaurant = await service.create(mockRestaurantInput);
      restaurantId = createdRestaurant.id;

      expect(createdRestaurant).toEqual({
        id: expect.anything(),
        ...mockRestaurantInput,
      });
    });
  });

  describe('findAll', () => {
    it('should find all restaurants', async () => {
      const restaurants = await service.findAll();

      expect(restaurants.length).toBeGreaterThan(0);
    });
  });

  describe('findOne', () => {
    it('should find restaurant by id', async () => {
      const restaurant = await service.findOne(restaurantId);

      expect(restaurant).toEqual({
        id: expect.anything(),
        ...mockRestaurantInput,
        categories: [],
      });
    });
  });

  describe('update', () => {
    it('should update a restaurant', async () => {
      const updateInput = {
        name: 'Jason Burguer',
      };

      const updatedRestaurant = await service.update(restaurantId, updateInput);

      expect(updatedRestaurant).toEqual({
        ...mockRestaurantInput,
        id: expect.anything(),
        name: updateInput.name,
        categories: [],
      });
    });
  });

  describe('remove', () => {
    it('should delete a restaurant', async () => {
      await service.remove(restaurantId);
      const restaurant = await service.findOne(restaurantId);

      expect(restaurant).toBeNull();
    });
  });
});
