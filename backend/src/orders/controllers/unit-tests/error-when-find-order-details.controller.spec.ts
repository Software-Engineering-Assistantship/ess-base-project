import { describe, it, expect, beforeAll } from 'vitest';
import { GetOrderDetailsController } from '../get-order-details.controller';
import { InMemoryOrderService } from 'test/services/in-memory-order.service';
import { makeMenuItem } from 'test/factories/make-menu-item';
import { makeOrder } from 'test/factories/make-order';

describe('Get error when tries to get order details', () => {
  let inMemoryOrderService: InMemoryOrderService;
  let sut: GetOrderDetailsController;

  beforeAll(async () => {
    inMemoryOrderService = new InMemoryOrderService();
    sut = new GetOrderDetailsController(inMemoryOrderService);
  });

  it('should return when the user tries to get order details', async () => {
    const menuItem1 = makeMenuItem({ title: 'burger 1' });
    const menuItem2 = makeMenuItem({ title: 'burger 2' });
    const menuItem3 = makeMenuItem({ title: 'burger 3' });

    const order = makeOrder({
      comment: 'amazing',
      menuItems: [menuItem1, menuItem2, menuItem3],
    });

    inMemoryOrderService.create(order);

    await expect(async () => await sut.handle('1')).rejects.toThrowError(
      'Order not found',
    );
  });
});
