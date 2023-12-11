import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateMenuItemSchema } from '../dto/create-menu-item';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}

  async create(menu: CreateMenuItemSchema) {
    return await this.prisma.menu.create({
      data: {
        title: menu.title,
        description: menu.description,
        price: menu.price,
        quantity: menu.quantity,
        category: menu.category,
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.menu.findUnique({ where: { id } });
  }

  async findAllByCategory(category: string) {
    return await this.prisma.menu.findMany({ where: { category } });
  }
}
