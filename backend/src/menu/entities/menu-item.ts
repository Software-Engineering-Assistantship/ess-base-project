import { Promotion } from '../../promotion/entities/promotion.entity';

export interface MenuItem {
  id?: string;
  title?: string;
  description?: string;
  price?: number;
  quantity?: number;
  categoryId?: string;
  promotions?: Promotion[];
}
