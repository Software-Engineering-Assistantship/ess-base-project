import { MenuItem } from 'src/menu/entities/menu-item';

export class Category {
  id: string;
  name: string;
  description: string;
  items: MenuItem[];
}
