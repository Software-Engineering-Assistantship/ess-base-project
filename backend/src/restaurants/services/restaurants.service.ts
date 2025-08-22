import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateRestaurantSchema } from '../dto/create-restaurant';
import { UpdateRestaurantSchema } from '../dto/update-restaurant';

@Injectable()
export class RestaurantsService {
  constructor(private prisma: PrismaService) {}

  async create(restaurant: CreateRestaurantSchema) {
    return await this.prisma.restaurant.create({
      data: {
        name: restaurant.name,
        address: restaurant.address,
        closingTime: restaurant.closingTime,
        type: restaurant.type,
        picture: restaurant.picture,
      },
    });
  }

  async findAll() {
    return await this.prisma.restaurant.findMany({
      include: { categories: { include: { menuItems: true } } },
    });
  }

  async findOne(id: string) {
    return await this.prisma.restaurant.findUnique({
      where: { id },
      include: { categories: { include: { menuItems: true } } },
    });
  }

  async findByName(name: string, id?: string) {
    return await this.prisma.restaurant.findFirst({
      where: {
        name,
        id: {
          not: id,
        },
      },
    });
  }

  async update(id: string, restaurant: UpdateRestaurantSchema) {
    return await this.prisma.restaurant.update({
      where: { id },
      data: {
        name: restaurant.name,
        address: restaurant.address,
        closingTime: restaurant.closingTime,
        type: restaurant.type,
        picture: restaurant.picture,
      },
      include: { categories: { include: { menuItems: true } } },
    });
  }

  async remove(id: string) {
    return await this.prisma.restaurant.delete({ where: { id } });
  }
}
