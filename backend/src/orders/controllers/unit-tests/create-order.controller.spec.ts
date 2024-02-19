import { describe, it, expect, beforeAll } from 'vitest';
import { CreateOrderController } from '../create-order.controller';
import { InMemoryOrderService } from 'test/services/in-memory-order.service';
import { makeMenuItem } from 'test/factories/make-menu-item';

describe('Create order', () => {
  let inMemoryOrderService: InMemoryOrderService;
  let sut: CreateOrderController;

  beforeAll(async () => {
    inMemoryOrderService = new InMemoryOrderService();
    sut = new CreateOrderController(inMemoryOrderService);
  });

  it('should be able to create one order', async () => {
    const menuItems = Array.from({ length: 4 }, () => makeMenuItem());

    const result = await sut.handle({
      menuItems,
    });

    expect(inMemoryOrderService.items).toHaveLength(1);
    expect(inMemoryOrderService.items[0]).toEqual(result);
  });
});
