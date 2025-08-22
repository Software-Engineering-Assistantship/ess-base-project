import { MenuItem } from 'src/menu/entities/menu-item';
import { CreateMenuItemSchema } from 'src/menu/dto/create-menu-item';
import { CartDto } from '../../src/cart/dto/cart.dto';
import { CartService } from '../../src/cart/services/cart-service';

export class InMemoryCartService extends CartService {
  private carts: CartDto[] = [];

  async getCartById(id: string): Promise<CartDto> {
    const cart = this.carts.find((cart) => cart.id === id);
    if (!cart) {
      throw new Error(`Cart with id ${id} not found`);
    }
    return cart;
  }

  async getCartItemById(id: string, itemId: string): Promise<MenuItem> {
    const cart = await this.getCartById(id);
    const item = cart.items.find((item) => item.id === itemId);
    if (!item) {
      throw new Error(`Item with id ${itemId} not found in cart`);
    }
    return item;
  }

  async updateCartItem(
    id: string,
    itemId: string,
    updatedItem: MenuItem
  ): Promise<CartDto> {
    const cart = await this.getCartById(id);
    const itemIndex = cart.items.findIndex((item) => item.id === itemId);
    if (itemIndex === -1) {
      throw new Error(`Item with id ${itemId} not found in cart`);
    }

    cart.items[itemIndex] = updatedItem;

    return cart;
  }

  async deleteCartItem(id: string, itemId: string): Promise<void> {
    const cart = await this.getCartById(id);
    const itemIndex = cart.items.findIndex((item) => item.id === itemId);
    if (itemIndex === -1) {
      throw new Error(`Item with id ${itemId} not found in cart`);
    }

    cart.items.splice(itemIndex, 1);
  }

  async addItemToCart(
    id: string,
    newItem: CreateMenuItemSchema
  ): Promise<CartDto> {
    const cart = await this.getCartById(id);

    cart.items.push(newItem);

    return cart;
  }
}
