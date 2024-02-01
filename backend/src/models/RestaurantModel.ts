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
    try {
      await prisma.restaurant.create({
        data: {
          name,
          cnpj: CNPJ,
          email,
          password,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002' && error.meta?.target) {
          const targetFields = error.meta.target as string[];
          if (targetFields.includes('email')) {
            throw new DuplicateFieldError('Erro! Email já cadastrado');
          } else if (targetFields.includes('cnpj')) {
            throw new DuplicateFieldError('Erro! CNPJ já cadastrado');
          }
        } else {
          throw error;
        }
      }
    }
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
}

export default RestaurantModel;
