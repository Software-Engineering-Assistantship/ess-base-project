import { describe, it, expect, beforeAll } from 'vitest';
import { DeleteMenuItemController } from '../delete-menu-item.controller';
import { InMemoryMenuService } from 'test/services/in-memory-menu.service';
import { makeCategory } from 'test/factories/make-category';
import { makeMenuItem } from 'test/factories/make-menu-item';

describe('Delete menu item', () => {
  let inMemoryMenuService: InMemoryMenuService;
  let sut: DeleteMenuItemController;

  beforeAll(async () => {
    inMemoryMenuService = new InMemoryMenuService();
    sut = new DeleteMenuItemController(inMemoryMenuService);
  });

  it('should be able to delete one menu item', async () => {
    const category = makeCategory();
    const burger = makeMenuItem({ categoryId: category.id });

    inMemoryMenuService.create(burger);

    expect(inMemoryMenuService.items).toHaveLength(1);
    expect(inMemoryMenuService.items[0]).toEqual(burger);

    await sut.handle(burger.id);

    expect(inMemoryMenuService.items).toHaveLength(0);
  });
});
