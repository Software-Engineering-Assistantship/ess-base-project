import { describe, it, expect, beforeAll } from 'vitest';
import { DeleteOrderController } from '../delete-order.controller';
import { InMemoryOrderService } from 'test/services/in-memory-order.service';
import { makeMenuItem } from 'test/factories/make-menu-item';
import { makeOrder } from 'test/factories/make-order';

describe('Delete order', () => {
  let inMemoryOrderService: InMemoryOrderService;
  let sut: DeleteOrderController;

  beforeAll(async () => {
    inMemoryOrderService = new InMemoryOrderService();
    sut = new DeleteOrderController(inMemoryOrderService);
  });

  it('should be able to delete one order', async () => {
    const menuItems = Array.from({ length: 4 }, () => makeMenuItem());
    const order = makeOrder({ menuItems });

    inMemoryOrderService.create(order);

    expect(inMemoryOrderService.items).toHaveLength(1);

    await sut.handle(order.id);

    expect(inMemoryOrderService.items).toHaveLength(0);
  });
});
