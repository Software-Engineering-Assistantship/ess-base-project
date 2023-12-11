import { describe, it, expect, vi, beforeAll } from 'vitest';
import { MenuService } from 'src/menu/services/menu.service';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/prisma.service';
import { GetItemById } from '../get-item-by-id.controller';

type category = 'BURGERS' | 'SIDES' | 'DRINKS';

describe('Get menu item by id', () => {
  let controller: GetItemById;
  let service: MenuService;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [GetItemById],
      providers: [MenuService, PrismaService],
    }).compile();

    controller = moduleRef.get(GetItemById);
    service = moduleRef.get(MenuService);
  });

  it('should be able get menu item by id', async () => {
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

    vi.spyOn(service, 'findOne').mockImplementation(() =>
      Promise.resolve(items[1]),
    );

    const response = await controller.handle(items[1].id);

    expect(response).toEqual(expect.objectContaining(items[1]));
  });
});
