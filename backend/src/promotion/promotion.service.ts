import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { PrismaService } from 'src/database/prisma.service';
import { PrismaMenuService } from '../menu/services/menu.service';

@Injectable()
export class PromotionService {
  constructor(
    private prisma: PrismaService,
    private menu: PrismaMenuService,
  ) {}

  async create(CreatePromotionDto: CreatePromotionDto) {

    const menuItemsExist = await Promise.all(
      CreatePromotionDto.menuItems.map(menuItemId => this.menu.findOne(menuItemId))
    );
    
    if (menuItemsExist.includes(null)) {
      throw new NotFoundException('Menu items not found');
    }

    const menuItemsData = CreatePromotionDto.menuItems.map(menuItemId => ({
      id: menuItemId,
    }));

    return await this.prisma.promotion.create({
      data: {
        name: CreatePromotionDto.name,
        description: CreatePromotionDto.description,
        discount: CreatePromotionDto.discount,
        startDate: CreatePromotionDto.startDate,
        endDate: CreatePromotionDto.endDate,
        menuItems: {
          connect: menuItemsData,
        },
      },
      select: {
        id: true,
        name: true,
        description: true,
        discount: true,
        startDate: true,
        endDate: true,
        menuItems: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });
  }

  async findAll() {
    return await this.prisma.promotion.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.promotion.findUnique({ where: { id } });
  }

  async update(id: string, UpdatePromotionDto: UpdatePromotionDto) {
    const existingPromotion = await this.prisma.promotion.findUnique({ where: { id } });

    if (!existingPromotion) {
      throw new NotFoundException('Promotion not found');
    }

    return await this.prisma.promotion.update({
      where: { id },
      data: {name: UpdatePromotionDto.name || existingPromotion.name,
        description: UpdatePromotionDto.description || existingPromotion.description,
        discount: UpdatePromotionDto.discount || existingPromotion.discount,
        startDate: UpdatePromotionDto.startDate || existingPromotion.startDate,
        endDate: UpdatePromotionDto.endDate || existingPromotion.endDate,
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.promotion.delete({ where: { id } });
  }

  async findByName(name: string) {
    return await this.prisma.promotion.findFirst({ where: { name } });
  }
}
