import { Order } from 'src/orders/entities/order';

export interface RatingProps {
  rate?: number;
  comment?: string;
}

export abstract class OrderService {
  abstract create(order: Order): Promise<Order>;
  abstract findAll(): Promise<Order[]>;
  abstract findOne(id: string): Promise<Order>;
  abstract update(id: string, rate: RatingProps): Promise<Order | null>;
  abstract delete(id: string): Promise<void>;
}
