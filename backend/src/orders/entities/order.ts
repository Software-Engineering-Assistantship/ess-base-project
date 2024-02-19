import { MenuItem } from 'src/menu/entities/menu-item';

export interface Order {
  id?: string;
  comment?: string;
  rate?: number;
  menuItems: MenuItem[];
}
