import { faker } from '@faker-js/faker';

import { Injectable } from '@nestjs/common';
import { Category } from 'src/categories/entities/category.entity';
import { PrismaService } from 'src/database/prisma.service';

export function makeCategory(override: Partial<Category> = {}) {
  return {
    id: faker.string.uuid(),
    name: faker.string.nanoid(),
    description: faker.string.nanoid(),
    ...override,
  };
}

@Injectable()
export class CategoryFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaCategory(data: Partial<Category> = {}): Promise<Category> {
    const category = makeCategory(data);

    await this.prisma.category.create({
      data: category,
    });

    return category;
  }
}
