import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
} from '@nestjs/common';
import {
  UpdateMenuItemSchema,
  updateMenuItemSchema,
} from '../dto/update-menu-item';
import { MenuService } from 'src/interfaces/menu-service';

@Controller('menu/item/:id')
export class UpdateMenuItemController {
  constructor(private readonly menuService: MenuService) {}

  @Patch()
  @HttpCode(200)
  async handle(@Param('id') id: string, @Body() menu: UpdateMenuItemSchema) {
    try {
      updateMenuItemSchema.parse(menu);
      return await this.menuService.update(id, {
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
