import { Order } from 'src/orders/entities/order';

export abstract class OrderService {
  abstract create(order: Order): Promise<Order>;
  abstract findAll(): Promise<Order[]>;
  abstract findOne(id: string): Promise<Order>;
  abstract delete(id: string): Promise<void>;
}
