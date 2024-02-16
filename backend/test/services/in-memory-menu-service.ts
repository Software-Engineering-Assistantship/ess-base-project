import { MenuService } from 'src/interfaces/menu-service';
import { MenuItem } from 'src/menu/entities/menu-item';

export class InMemoryMenuService implements MenuService {
  public items: MenuItem[] = [];

  async create(menu: MenuItem) {
    this.items.push(menu);

    return menu;
  }

  async findOne(id: string) {
    return this.items.find((item) => item.id === id);
  }

  async findAllByCategory(categoryId: string) {
    return this.items.filter((item) => item.categoryId === categoryId);
  }
}
