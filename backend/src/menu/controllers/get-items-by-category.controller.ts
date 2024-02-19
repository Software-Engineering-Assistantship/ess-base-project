import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { MenuService } from 'src/interfaces/menu-service';

@Controller('/menu/:categoryId/items')
export class GetItemsByCategoryController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  @HttpCode(200)
  async handle(@Param('categoryId') categoryId: string) {
    return await this.menuService.findAllByCategory(categoryId);
  }
}
