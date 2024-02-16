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

  async findAll() {
    return await this.prisma.category.findMany({
      include: { menuItems: true },
    });
  }

  async findOne(id: string) {
    return await this.prisma.category.findUnique({ where: { id } });
  }

  async findByName(name: string) {
    return await this.prisma.category.findFirst({ where: { name } });
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return await this.prisma.category.update({
      where: { id },
      data: {
        menuItems: {
          connect: updateCategoryDto.menuItems.map((id) => ({ id })),
        },
      },
    });
  }
}
