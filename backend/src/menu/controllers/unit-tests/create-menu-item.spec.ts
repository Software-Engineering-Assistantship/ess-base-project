import { describe, it, expect, beforeAll } from 'vitest';
import { CreateMenuItemController } from '../create-menu-item.controller';
import { InMemoryMenuService } from 'test/services/in-memory-menu.service';
import { makeCategory } from 'test/factories/make-category';

describe('Create menu item', () => {
  let inMemoryMenuService: InMemoryMenuService;
  let sut: CreateMenuItemController;

  beforeAll(async () => {
    inMemoryMenuService = new InMemoryMenuService();
    sut = new CreateMenuItemController(inMemoryMenuService);
  });

  it('should be able to create one menu item', async () => {
    const category = makeCategory();

    const result = await sut.handle({
      title: 'Burger',
      description: 'description',
      price: 12,
      quantity: 2,
      categoryId: category.id,
    });

    expect(inMemoryMenuService.items).toHaveLength(1);
    expect(inMemoryMenuService.items[0]).toEqual(result);
  });
});
