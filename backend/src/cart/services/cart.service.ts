import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CartDto } from '../dto/cart.dto';
import { CreateMenuItemSchema } from '../../menu/dto/create-menu-item';
import { MenuItem } from '../../menu/entities/menu-item';

@Injectable()
export class PrismaCartService {
  private carts: CartDto[] = [
    {
      id: '1',
      items: [
        {
          id: '1',
          title: 'Product 1',
          description: 'Description of product 1',
          price: 10.99,
          quantity: 2,
          categoryId: '1',
        },
        {
          id: '2',
          title: 'Product 2',
          description: 'Description of product 2',
          price: 15.99,
          quantity: 1,
          categoryId: '2',
        },
      ],
      totalSum: 37.97,
    },
  ];

  constructor(private prisma: PrismaService) {}

  async getCartById(id: string): Promise<CartDto> {
    const cart = this.carts.find((cart) => cart.id === id);
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }
    return cart;
  }

  async getCartItemById(id: string, itemId: string): Promise<MenuItem> {
    const cart = await this.getCartById(id);
    const item = cart.items.find((item) => item.id === itemId);
    if (!item) {
      throw new NotFoundException('Item not found in cart');
    }
    return this.prisma.menu.findUnique({ where: { id: itemId } });
  }

  async updateCartItem(
    id: string,
    itemId: string,
    updatedItem: MenuItem,
  ): Promise<CartDto> {
    const cart = await this.getCartById(id);
    const itemIndex = cart.items.findIndex((item) => item.id === itemId);
    if (itemIndex === -1) {
      throw new NotFoundException('Item not found in cart');
    }

    cart.items[itemIndex].title =
      updatedItem.title || cart.items[itemIndex].title;
    cart.items[itemIndex].description =
      updatedItem.description || cart.items[itemIndex].description;
    cart.items[itemIndex].price =
      updatedItem.price || cart.items[itemIndex].price;
    cart.items[itemIndex].quantity =
      updatedItem.quantity || cart.items[itemIndex].quantity;
    cart.items[itemIndex].categoryId =
      updatedItem.categoryId || cart.items[itemIndex].categoryId;

    return cart;
  }

  async deleteCartItem(id: string, itemId: string): Promise<void> {
    const cart = await this.getCartById(id);
    const itemIndex = cart.items.findIndex((item) => item.id === itemId);
    if (itemIndex === -1) {
      throw new NotFoundException('Item not found in cart');
    }

    cart.items.splice(itemIndex, 1);
  }

  async addItemToCart(
    id: string,
    newItem: CreateMenuItemSchema,
  ): Promise<CartDto> {
    const cart = await this.getCartById(id);

    cart.items.push(newItem);

    return cart;
  }
}
