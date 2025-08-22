import { describe, it, expect, beforeAll } from 'vitest';
import { GetItemsByCategoryController } from '../get-items-by-category.controller';
import { InMemoryMenuService } from 'test/services/in-memory-menu.service';
import { makeCategory } from 'test/factories/make-category';
import { makeMenuItem } from 'test/factories/make-menu-item';

describe('Get menu item by category', () => {
  let inMemoryMenuService: InMemoryMenuService;
  let sut: GetItemsByCategoryController;

  beforeAll(async () => {
    inMemoryMenuService = new InMemoryMenuService();
    sut = new GetItemsByCategoryController(inMemoryMenuService);
  });

  it('should be able to get all menu items by category', async () => {
    const firstCategory = makeCategory();
    const secondCategory = makeCategory();

    inMemoryMenuService.create(
      makeMenuItem({
        title: 'Burger',
        categoryId: firstCategory.id,
      }),
    );

    inMemoryMenuService.create(
      makeMenuItem({
        title: 'Fries',
        categoryId: secondCategory.id,
      }),
    );

    const result = await sut.handle(firstCategory.id);

    expect(inMemoryMenuService.items).toHaveLength(2);

    const filteredByFirstCategory = await inMemoryMenuService.findAllByCategory(
      firstCategory.id,
    );

    expect(filteredByFirstCategory).toHaveLength(1);
    expect(filteredByFirstCategory).toEqual(result);
  });
});
