import { Controller, Get, Patch, Delete, Post, Param, Body } from '@nestjs/common';
import { CartService } from '../services/cart.service';
import { CartDto } from '../dto/cart.dto';
import { CreateMenuItemSchema } from '../../menu/dto/create-menu-item';
import { UpdateMenuItemSchema } from '../../menu/dto/update-menu-item';

@Controller('carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get(':id')
  async getCartById(@Param('id') id: string): Promise<CartDto> { 
    return this.cartService.getCartById(id);
  }

  @Patch(':id/items/:itemId')
  async updateCartItem(
    @Param('id') id: string,
    @Param('itemId') itemId: string,
    @Body() updatedItem: UpdateMenuItemSchema
  ): Promise<CartDto> { 
    return this.cartService.updateCartItem(id, itemId, updatedItem);
  }

  @Delete(':id/items/:itemId')
  async deleteCartItem(
    @Param('id') id: string,
    @Param('itemId') itemId: string
  ): Promise<void> { 
    await this.cartService.deleteCartItem(id, itemId);
  }

  @Post(':id/items')
  async addItemToCart(
    @Param('id') id: string,
    @Body() newItem: CreateMenuItemSchema
  ): Promise<CartDto> { 
    return this.cartService.addItemToCart(id, newItem);
  }
}