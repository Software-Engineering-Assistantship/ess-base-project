import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CartDto } from '../dto/cart.dto';
import { CreateMenuItemSchema  } from '../../menu/dto/create-menu-item'
import { UpdateMenuItemSchema } from '../../menu/dto/update-menu-item'
import { MenuItem } from '../../menu/entities/menu-item';


@Injectable()
export class CartService {
  private carts: CartDto[] = [];

  constructor(private prisma: PrismaService) {}

  async getCartById(id: string): Promise<CartDto> {
    const cart = this.carts.find((cart) => cart.id === id);
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }
    return cart;
  }

  async updateCartItem(id: string, itemId: string, updatedItem: MenuItem): Promise<CartDto> {
    const cart = await this.getCartById(id);
    const itemIndex = cart.items.findIndex(item => item.id === itemId);
    if (itemIndex === -1) {
      throw new NotFoundException('Item not found in cart');
    }

    cart.items[itemIndex].title = updatedItem.title || cart.items[itemIndex].title;
    cart.items[itemIndex].description = updatedItem.description || cart.items[itemIndex].description;
    cart.items[itemIndex].price = updatedItem.price || cart.items[itemIndex].price;
    cart.items[itemIndex].quantity = updatedItem.quantity || cart.items[itemIndex].quantity;
    cart.items[itemIndex].categoryId = updatedItem.categoryId || cart.items[itemIndex].categoryId;


    await this.prisma.menu.update({
        where: { id: itemId },
        data: updatedItem,
      });

      return cart;
  }

  async deleteCartItem(id: string, itemId: string): Promise<void> {
    const cart = await this.getCartById(id);
    const itemIndex = cart.items.findIndex(item => item.id === itemId);
    if (itemIndex === -1) {
      throw new NotFoundException('Item not found in cart');
    }

    cart.items.splice(itemIndex, 1);


    // this.saveCart(cart);
  }

  async addItemToCart(id: string, newItem: CreateMenuItemSchema): Promise<CartDto> {
    const cart = await this.getCartById(id);
    
    cart.items.push(newItem);

    return cart;
  }
}