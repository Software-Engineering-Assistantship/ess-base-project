import prisma from '../database';
import { Prisma } from '@prisma/client';
import DuplicateFieldError from '../errors/DuplicateFieldError';
class RestaurantModel {
  static async insert(
    name: string,
    CNPJ: string,
    email: string,
    password: string
  ) {
    const existingRestaurant = await prisma.restaurant.findFirst({
      where: {
        OR: [{ cnpj: CNPJ }, { email }],
      },
    });

    if (existingRestaurant) {
      throw new DuplicateFieldError('Restaurant already registered');
    }

    const restaurant = await prisma.restaurant.create({
      data: { name, cnpj: CNPJ, email, password },
    });

    return restaurant;
  }

  static async index() {
    const restaurants = await prisma.restaurant.findMany({
      select: { id: true, name: true, cnpj: true, email: true },
    });

    return restaurants;
  }

  static async delete(id: number) {
    await prisma.restaurant.delete({ where: { id } });
  }

  static async update(
    id: number,
    name: string,
    CNPJ: string,
    email: string,
    password: string
  ) {
    await prisma.restaurant.update({
      where: { id },
      data: { name, cnpj: CNPJ, email, password },
    });
  }
}

export default RestaurantModel;
