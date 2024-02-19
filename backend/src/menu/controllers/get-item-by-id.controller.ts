import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { MenuService } from 'src/interfaces/menu-service';

@Controller('/menu/item/:id')
export class GetItemByIdController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  @HttpCode(200)
  async handle(@Param('id') id: string) {
    return await this.menuService.findOne(id);
  }
}
