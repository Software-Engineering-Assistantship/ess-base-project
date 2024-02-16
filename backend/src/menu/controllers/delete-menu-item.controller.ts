import { Controller, Delete, HttpCode, Param } from '@nestjs/common';
import { MenuService } from 'src/interfaces/menu-service';

@Controller('/menu/item/:id')
export class DeleteMenuItemController {
  constructor(private readonly menuService: MenuService) {}

  @Delete()
  @HttpCode(204)
  async handle(@Param('id') id: string) {
    await this.menuService.delete(id);
  }
}
