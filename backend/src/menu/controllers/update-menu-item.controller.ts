import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
} from '@nestjs/common';
import { MenuService } from '../services/menu.service';
import {
  UpdateMenuItemSchema,
  updateMenuItemSchema,
} from '../dto/update-menu-item';

@Controller('menu/item/:id')
export class UpdateMenuItemController {
  constructor(private readonly menuService: MenuService) {}

  @Patch()
  @HttpCode(201)
  async handle(@Param('id') id: string, @Body() menu: UpdateMenuItemSchema) {
    try {
      updateMenuItemSchema.parse(menu);
      await this.menuService.update(id, {
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
