import { describe, it, expect, beforeAll } from 'vitest';
import { GetItemByIdController } from '../get-item-by-id.controller';
import { InMemoryMenuService } from 'test/services/in-memory-menu.service';
import { makeCategory } from 'test/factories/make-category';
import { makeMenuItem } from 'test/factories/make-menu-item';

describe('Get menu item by id', () => {
  let inMemoryMenuService: InMemoryMenuService;
  let sut: GetItemByIdController;

  beforeAll(async () => {
    inMemoryMenuService = new InMemoryMenuService();
    sut = new GetItemByIdController(inMemoryMenuService);
  });

  it('should be able to get menu item by id', async () => {
    const category = makeCategory();

    const firstMenuItem = makeMenuItem({ categoryId: category.id });
    const secondMenuItem = makeMenuItem({ categoryId: category.id });
    const thirdMenuItem = makeMenuItem({ categoryId: category.id });

    inMemoryMenuService.create(firstMenuItem);
    inMemoryMenuService.create(secondMenuItem);
    inMemoryMenuService.create(thirdMenuItem);

    const result = await sut.handle(firstMenuItem.id);

    expect(inMemoryMenuService.items).toHaveLength(3);

    const filteredByFirstCategory = await inMemoryMenuService.findOne(
      firstMenuItem.id,
    );

    expect(filteredByFirstCategory).toBeTruthy();
    expect(filteredByFirstCategory).toEqual(result);
  });
});
