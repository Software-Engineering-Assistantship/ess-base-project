import { MenuItem } from 'src/menu/entities/menu-item';
import { CreateMenuItemSchema } from 'src/menu/dto/create-menu-item';
import { CartDto } from '../dto/cart.dto';

export abstract class CartService {
  abstract getCartById(id: string): Promise<CartDto>;
  abstract getCartItemById(id: string, itemId: string): Promise<MenuItem>;
  abstract updateCartItem(
    id: string,
    itemId: string,
    updatedItem: MenuItem,
  ): Promise<CartDto>;
  abstract deleteCartItem(id: string, itemId: string): Promise<void>;
  abstract addItemToCart(
    id: string,
    newItem: CreateMenuItemSchema,
  ): Promise<CartDto>;
}
