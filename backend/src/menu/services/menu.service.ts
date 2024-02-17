import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateMenuItemSchema } from '../dto/create-menu-item';
import { MenuService } from 'src/interfaces/menu-service';
import { UpdateMenuItemSchema } from '../dto/update-menu-item';

@Injectable()
export class PrismaMenuService implements MenuService {
  constructor(private prisma: PrismaService) {}

  async create(menu: CreateMenuItemSchema) {
    return await this.prisma.menu.create({
      data: {
        title: menu.title,
        description: menu.description,
        price: menu.price,
        quantity: menu.quantity,
        categoryId: menu.categoryId,
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.menu.findUnique({ where: { id } });
  }

  async findAllByCategory(categoryId: string) {
    return await this.prisma.menu.findMany({ where: { categoryId } });
  }

  async update(id: string, menu: UpdateMenuItemSchema) {
    return await this.prisma.menu.update({
      where: { id },
      data: {
        title: menu.title,
        description: menu.description,
        price: menu.price,
        quantity: menu.quantity,
        categoryId: menu.categoryId,
      },
    });
  }

  async delete(id: string) {
    await this.prisma.menu.delete({ where: { id } });
  }
}
