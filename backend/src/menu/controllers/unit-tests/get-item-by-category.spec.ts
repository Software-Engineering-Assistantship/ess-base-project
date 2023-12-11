import { describe, it, expect, vi, beforeAll } from 'vitest';
import { MenuService } from 'src/menu/services/menu.service';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/prisma.service';
import { GetItemsByCategory } from '../get-items-by-category.controller';

type category = 'BURGERS' | 'SIDES' | 'DRINKS';

describe('Get menu item by category', () => {
  let controller: GetItemsByCategory;
  let service: MenuService;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [GetItemsByCategory],
      providers: [MenuService, PrismaService],
    }).compile();

    controller = moduleRef.get(GetItemsByCategory);
    service = moduleRef.get(MenuService);
  });

  it('should be able get menu item by category', async () => {
    const items = [
      {
        id: '1',
        title: 'Burger',
        description: 'description',
        price: 500,
        quantity: 1,
        category: 'BURGERS' as category,
      },
      {
        id: '2',
        title: 'Fries',
        description: 'description',
        price: 500,
        quantity: 1,
        category: 'SIDES' as category,
      },
    ];

    vi.spyOn(service, 'findAllByCategory').mockImplementation(() =>
      Promise.resolve([items[0]]),
    );

    const response = await controller.handle(items[0].category);

    expect(response).toEqual(
      expect.arrayContaining([expect.objectContaining(items[0])]),
    );
  });
});
