import { describe, it, expect, beforeEach, vi } from 'vitest';

import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { PrismaService } from 'src/prisma.service';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('CategoriesController', () => {
  let controller: CategoriesController;
  let service: CategoriesService;

  const mockCategory = {
    id: 'a',
    name: 'Sushi',
    description: 'good',
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
        Promise.resolve(mockCategory),
      );

      expect(await controller.findOne(mockCategory.id)).toBe(mockCategory);
    });
  });

  describe('findAll', () => {
    it('should return array of users', async () => {
      const categories = [{ ...mockCategory, menuItems: [] }];

      vi.spyOn(service, 'findAll').mockImplementation(() =>
        Promise.resolve(categories),
      );

      expect(await controller.findAll()).toBe(categories);
    });
  });

  describe('update', () => {
    it('should update a category', async () => {
      const updatedUser = { ...mockCategory, menuItems: ['id 1'] };

      vi.spyOn(service, 'update').mockImplementation(() =>
        Promise.resolve(updatedUser),
      );

      expect(await controller.update(updatedUser.id, updatedUser)).toBe(
        updatedUser,
      );
    });
  });
});
