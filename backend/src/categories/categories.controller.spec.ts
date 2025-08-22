import { describe, it, expect, beforeEach, vi } from 'vitest';

import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { PrismaService } from 'src/database/prisma.service';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('CategoriesController', () => {
  let controller: CategoriesController;
  let service: CategoriesService;

  const mockCategory = {
    id: 'fc194a06-4502-445f-9a03-7f22c8b8d21d',
    name: 'Sushi',
    description: 'Great food',
    position: 0,
    restaurantId: '1',
  };

  const mockCategoryResult = {
    id: 'fc194a06-4502-445f-9a03-7f22c8b8d21d',
    name: 'Sushi',
    description: 'Great food',
    position: 0,
    restaurantId: '1',
    menuItems: [],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [CategoriesService, PrismaService],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
    service = module.get<CategoriesService>(CategoriesService);
  });

  describe('create', () => {
    it('should create a category', async () => {
      vi.spyOn(service, 'findByName').mockImplementation(() =>
        Promise.resolve(null),
      );

      vi.spyOn(service, 'create').mockImplementation(() =>
        Promise.resolve(mockCategory),
      );

      expect(await controller.create(mockCategory)).toBe(mockCategory);
    });

    it('should throw error when name is already in use', async () => {
      const otherDescriptionMock = {
        ...mockCategory,
        description: 'new description',
      };

      vi.spyOn(service, 'findByName').mockImplementation(() =>
        Promise.resolve(mockCategory),
      );

      try {
        await controller.create(otherDescriptionMock);
      } catch (error) {
        expect(error).toEqual(
          new HttpException(
            'Category name already taken',
            HttpStatus.BAD_REQUEST,
          ),
        );
      }
    });
  });

  describe('findOne', () => {
    it('should return the category', async () => {
      vi.spyOn(service, 'findOne').mockImplementation(() =>
        Promise.resolve(mockCategoryResult),
      );

      expect(await controller.findOne(mockCategory.id)).toBe(
        mockCategoryResult,
      );
    });
  });

  describe('findAll', () => {
    it('should return array of categories', async () => {
      const restaurantId = '1';

      vi.spyOn(service, 'findAll').mockImplementation(() =>
        Promise.resolve([mockCategoryResult]),
      );

      expect(await controller.findAll(restaurantId)).toStrictEqual([
        mockCategoryResult,
      ]);
    });
  });

  describe('update', () => {
    it('should update a category', async () => {
      const updatedCategory = { ...mockCategoryResult, position: 10 };

      vi.spyOn(service, 'update').mockImplementation(() =>
        Promise.resolve(updatedCategory),
      );

      expect(await controller.update(updatedCategory.id, updatedCategory)).toBe(
        updatedCategory,
      );
    });
  });

  describe('delete', () => {
    it('should delete a existing category', async () => {
      vi.spyOn(service, 'remove').mockImplementation(() =>
        Promise.resolve(mockCategory),
      );

      expect(await controller.remove(mockCategory.id)).toBe(
        'Deleted item succesfully',
      );
    });
  });
});
