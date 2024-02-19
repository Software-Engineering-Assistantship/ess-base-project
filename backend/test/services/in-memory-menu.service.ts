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

  async update(id: string, menu: MenuItem): Promise<MenuItem> {
    const itemToUpdate = this.items.find((item) => item.id === id);

    if (!itemToUpdate) {
      throw new Error(`Ingredient with id: ${id} does not exist`);
    }

    const itemUpdated = Object.assign(itemToUpdate, menu);
    return itemUpdated;
  }

  async delete(id: string): Promise<void> {
    const itemToDelete = this.items.find((item) => item.id === id);

    if (!itemToDelete) {
      throw new Error(`Ingredient with id: ${id} does not exist`);
    }

    this.items = this.items.filter((item) => item.id !== id);
  }
}
