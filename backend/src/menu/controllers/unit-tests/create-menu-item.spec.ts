import { describe, it, expect, vi, beforeAll } from 'vitest';
import { CreateMenuItemController } from '../create-menu-item.controller';
import { MenuService } from 'src/menu/services/menu.service';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/prisma.service';

type category = 'BURGERS' | 'SIDES' | 'DRINKS';

describe('Create menu item', () => {
  let controller: CreateMenuItemController;
  let service: MenuService;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [CreateMenuItemController],
      providers: [MenuService, PrismaService],
    }).compile();

    controller = moduleRef.get(CreateMenuItemController);
    service = moduleRef.get(MenuService);
  });

  it('should be able to create one menu item', async () => {
    const menuItem = {
      id: '1',
      title: 'Burger',
      description: 'description',
      price: 500,
      quantity: 1,
      category: 'BURGERS' as category,
    };

    vi.spyOn(service, 'create').mockImplementation(() =>
      Promise.resolve(menuItem),
    );

    const response = await controller.handle(menuItem);

    expect(response).toBeUndefined();
  });
});
