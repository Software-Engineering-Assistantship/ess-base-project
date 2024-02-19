import { describe, it, expect, beforeAll } from 'vitest';
import { UpdateMenuItemController } from '../update-menu-item.controller';
import { InMemoryMenuService } from 'test/services/in-memory-menu.service';
import { makeCategory } from 'test/factories/make-category';
import { makeMenuItem } from 'test/factories/make-menu-item';

describe('Update menu item', () => {
  let inMemoryMenuService: InMemoryMenuService;
  let sut: UpdateMenuItemController;

  beforeAll(async () => {
    inMemoryMenuService = new InMemoryMenuService();
    sut = new UpdateMenuItemController(inMemoryMenuService);
  });

  it('should be able to update one menu item', async () => {
    const category = makeCategory();
    const menuItem = makeMenuItem({
      description: 'description',
      categoryId: category.id,
    });

    inMemoryMenuService.create(menuItem);

    const newMenuItem = makeMenuItem({
      id: menuItem.id,
      description: 'New description',
    });

    const result = await sut.handle(menuItem.id, newMenuItem);

    expect(inMemoryMenuService.items).toHaveLength(1);

    const newItemInMemory = await inMemoryMenuService.findOne(newMenuItem.id);

    expect(newItemInMemory).toEqual(result);
    expect(newItemInMemory).toEqual(
      expect.objectContaining({ description: 'New description' }),
    );
  });
});
