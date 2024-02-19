import { Injectable } from '@nestjs/common';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class PromotionService {
  constructor(private prisma: PrismaService) {}

  async create(CreatePromotionDto: CreatePromotionDto) {
    return await this.prisma.promotion.create({
      data: CreatePromotionDto,
    });
  }

  async findAll() {
    return await this.prisma.promotion.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.promotion.findUnique({ where: { id } });
  }

  async update(id: string, UpdatePromotionDto: UpdatePromotionDto) {
    return await this.prisma.promotion.update({
      where: { id },
      data: UpdatePromotionDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.promotion.delete({ where: { id } });
  }

  async findByName(name: string) {
    return await this.prisma.promotion.findFirst({ where: { name } });
  }
}
