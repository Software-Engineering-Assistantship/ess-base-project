import { MenuItem } from '../../menu/entities/menu-item';

export class CartDto {
    readonly id: string;
    readonly items: MenuItem[];
    readonly totalSum: number;
  }