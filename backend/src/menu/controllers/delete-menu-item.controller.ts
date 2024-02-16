import { Controller, Delete, HttpCode, Param } from '@nestjs/common';
import { MenuService } from 'src/interfaces/menu-service';

@Controller('/menu/item/:id')
export class DeleteMenuItemController {
  constructor(private readonly menuService: MenuService) {}

  @Delete()
  @HttpCode(200)
  async handle(@Param('id') id: string) {
    return await this.menuService.delete(id);
  }
}
