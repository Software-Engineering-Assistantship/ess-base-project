import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { MenuService } from '../services/menu.service';

@Controller('/menu/:category/items')
export class GetItemsByCategory {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  @HttpCode(200)
  async handle(@Param('category') category: string) {
    return await this.menuService.findAllByCategory(category);
  }
}
