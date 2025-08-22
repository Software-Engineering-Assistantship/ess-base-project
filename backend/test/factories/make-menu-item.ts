import { faker } from '@faker-js/faker';

import { Injectable } from '@nestjs/common';
import { MenuItem } from 'src/menu/entities/menu-item';
import { PrismaService } from 'src/database/prisma.service';

export function makeMenuItem(override: Partial<MenuItem> = {}) {
  return {
    id: faker.string.uuid(),
    title: faker.string.nanoid(),
    description: faker.string.nanoid(),
    price: faker.number.int({ max: 5000 }),
    quantity: faker.number.int({ max: 10 }),
    categoryId: faker.string.uuid(),
    ...override,
  };
}

@Injectable()
export class MenuItemFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaMenuItem(data: Partial<MenuItem> = {}): Promise<MenuItem> {
    const menuitem = makeMenuItem(data);

    await this.prisma.menu.create({
      data: menuitem,
    });

    return menuitem;
  }
}
