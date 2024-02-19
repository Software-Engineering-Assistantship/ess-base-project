import { describe, it, expect, beforeAll } from 'vitest';
import { GetOrderDetailsController } from '../get-order-details.controller';
import { InMemoryOrderService } from 'test/services/in-memory-order.service';
import { makeMenuItem } from 'test/factories/make-menu-item';
import { makeOrder } from 'test/factories/make-order';

describe('Get order details', () => {
  let inMemoryOrderService: InMemoryOrderService;
  let sut: GetOrderDetailsController;

  beforeAll(async () => {
    inMemoryOrderService = new InMemoryOrderService();
    sut = new GetOrderDetailsController(inMemoryOrderService);
  });

  it('should be able to get one order details', async () => {
    const menuItem1 = makeMenuItem({ title: 'burger 1' });
    const menuItem2 = makeMenuItem({ title: 'burger 2' });
    const menuItem3 = makeMenuItem({ title: 'burger 3' });

    const order = makeOrder({
      comment: 'amazing',
      menuItems: [menuItem1, menuItem2, menuItem3],
    });

    inMemoryOrderService.create(order);

    const result = await sut.handle(order.id);

    expect(inMemoryOrderService.items).toHaveLength(1);
    expect(result.menuItems).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'burger 1',
        }),
        expect.objectContaining({
          title: 'burger 2',
        }),
        expect.objectContaining({
          title: 'burger 3',
        }),
      ]),
    );
  });
});
