import { describe, it, expect, beforeEach } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';

import { CategoriesService } from './categories.service';
import { PrismaService } from 'src/database/prisma.service';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let firstCategoryId: string;

  const mockCategory = {
    name: 'Sushiiiiiiiiiiii',
    description: 'Great food',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriesService, PrismaService],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
  });

  describe('create', () => {
    it('should create a category', async () => {
      const createdCategory = await service.create(mockCategory);

      expect(createdCategory).toHaveProperty('id');
      expect(createdCategory).toHaveProperty('position');

      expect(createdCategory['id']).toBeTypeOf('string');
      expect(createdCategory['position']).toBeTypeOf('number');

      expect(createdCategory['name']).toBe(mockCategory.name);
      expect(createdCategory['description']).toBe(mockCategory.description);

      firstCategoryId = createdCategory.id;
    });
  });

  describe('findAll', () => {
    it('should find all categories', async () => {
      const categories = await service.findAll();

      expect(categories).toBeTypeOf('object');
      expect(categories.length).toBeGreaterThan(0);
    });
  });

  describe('findOne', () => {
    it('should find a category by id', async () => {
      const category = await service.findOne(firstCategoryId);

      expect(category).toHaveProperty('id', firstCategoryId);
      expect(category).toHaveProperty('name', mockCategory.name);
      expect(category).toHaveProperty('description', mockCategory.description);
      expect(category).toHaveProperty('menuItems', []);
    });
  });

  describe('findByName', () => {
    it('should find a category by name', async () => {
      const category = await service.findByName(mockCategory.name);

      expect(category).toHaveProperty('id', firstCategoryId);
      expect(category).toHaveProperty('name', mockCategory.name);
      expect(category).toHaveProperty('description', mockCategory.description);
    });
  });

  describe('update', () => {
    it('should update a category', async () => {
      const newDescription = 'Updated description';

      const updatedCategory = await service.update(firstCategoryId, {
        description: newDescription,
      });

      expect(updatedCategory).toHaveProperty('id', firstCategoryId);
      expect(updatedCategory).toHaveProperty('description', newDescription);
    });
  });

  describe('remove', () => {
    it('should remove a category', async () => {
      await service.remove(firstCategoryId);
      const category = await service.findOne(firstCategoryId);

      expect(category).toBeNull();
    });
  });
});
