import { describe, it, expect, beforeAll } from 'vitest';
import { GetAllOrdersController } from '../get-all-orders.controller';
import { InMemoryOrderService } from 'test/services/in-memory-order.service';
import { makeMenuItem } from 'test/factories/make-menu-item';
import { makeOrder } from 'test/factories/make-order';

describe('Get all orders', () => {
  let inMemoryOrderService: InMemoryOrderService;
  let sut: GetAllOrdersController;

  beforeAll(async () => {
    inMemoryOrderService = new InMemoryOrderService();
    sut = new GetAllOrdersController(inMemoryOrderService);
  });

  it('should be able to get one order details', async () => {
    const menuItem1 = makeMenuItem({ title: 'burger 1' });
    const menuItem2 = makeMenuItem({ title: 'burger 2' });
    const menuItem3 = makeMenuItem({ title: 'burger 3' });

    inMemoryOrderService.create(
      makeOrder({
        comment: 'amazing',
        menuItems: [menuItem1, menuItem2, menuItem3],
      }),
    );

    inMemoryOrderService.create(
      makeOrder({
        comment: 'very good',
        menuItems: [menuItem1, menuItem2, menuItem3],
      }),
    );

    const result = await sut.handle();

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual(
      expect.objectContaining({
        comment: 'amazing',
      }),
    );
    expect(result[1]).toEqual(
      expect.objectContaining({
        comment: 'very good',
      }),
    );
  });
});
