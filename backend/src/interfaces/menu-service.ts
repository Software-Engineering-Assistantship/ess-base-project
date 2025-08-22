import { MenuItem } from 'src/menu/entities/menu-item';

export abstract class MenuService {
  abstract create(menu: MenuItem): Promise<MenuItem>;
  abstract findOne(id: string): Promise<MenuItem>;
  abstract findAllByCategory(categoryId: string): Promise<MenuItem[]>;
  abstract update(id: string, menu: MenuItem): Promise<MenuItem>;
  abstract delete(id: string): Promise<void>;
}
