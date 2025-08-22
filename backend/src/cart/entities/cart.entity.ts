import { MenuItem } from '../../menu/entities/menu-item';


export interface Cart {
    id: string;
    items: MenuItem[];
    totalSum: number;
  }
  