import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import {
  CreateMenuItemSchema,
  createMenuItemSchema,
} from '../dto/create-menu-item';
import { MenuService } from 'src/interfaces/menu-service';

@Controller('menu')
export class CreateMenuItemController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  @HttpCode(201)
  async handle(@Body() menu: CreateMenuItemSchema) {
    try {
      createMenuItemSchema.parse(menu);

      return await this.menuService.create({
        title: menu.title,
        description: menu.description,
        price: menu.price,
        quantity: menu.quantity,
        categoryId: menu.categoryId,
      });
    } catch (error) {
      throw new HttpException('Invalid body', HttpStatus.BAD_REQUEST);
    }
  }
}
