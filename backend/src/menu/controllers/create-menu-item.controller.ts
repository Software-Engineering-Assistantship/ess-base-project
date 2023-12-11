import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { MenuService } from '../services/menu.service';
import {
  CreateMenuItemSchema,
  createMenuItemSchema,
} from '../dto/create-menu-item';

@Controller('menu')
export class CreateMenuItemController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  @HttpCode(201)
  async handle(@Body() menu: CreateMenuItemSchema) {
    try {
      createMenuItemSchema.parse(menu);

      await this.menuService.create({
        title: menu.title,
        description: menu.description,
        price: menu.price,
        quantity: menu.quantity,
        category: menu.category,
      });
    } catch (error) {
      throw new HttpException('Invalid body', HttpStatus.BAD_REQUEST);
    }
  }
}
