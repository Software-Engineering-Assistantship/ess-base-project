import { OrderService } from 'src/interfaces/order-service';
import { Order } from 'src/orders/entities/order';

export class InMemoryOrderService implements OrderService {
  public items: Order[] = [];

  async create(order: Order) {
    this.items.push(order);

    return order;
  }

  async findAll(): Promise<Order[]> {
    return this.items;
  }

  async findOne(id: string): Promise<Order> {
    return this.items.find((item) => item.id === id);
  }

  async delete(id: string): Promise<void> {
    const itemToDelete = this.items.find((item) => item.id === id);

    if (!itemToDelete) {
      throw new Error(`Order with id: ${id} does not exist`);
    }

    this.items = this.items.filter((item) => item.id !== id);
  }
}
