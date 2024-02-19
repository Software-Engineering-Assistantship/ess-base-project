import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return await this.prisma.category.create({
      data: createCategoryDto,
    });
  }

  async findAll(restaurantId: string) {
    return await this.prisma.category.findMany({
      where: { restaurantId },
      include: { menuItems: true },
    });
  }

  async findOne(id: string) {
    return await this.prisma.category.findUnique({
      where: { id },
      include: { menuItems: true },
    });
  }

  async findByName(name: string, restaurantId: string) {
    return await this.prisma.category.findFirst({
      where: { name, restaurantId },
    });
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return await this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
      include: { menuItems: true },
    });
  }

  async remove(id: string) {
    return await this.prisma.category.delete({ where: { id } });
  }
}
