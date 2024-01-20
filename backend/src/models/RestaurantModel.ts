import prisma from '../database';

class RestaurantModel {
  static async insert(name: string, CNPJ: string, email: string) {
    await prisma.restaurant.create({
      data: {
        name,
        cnpj: CNPJ,
        email,
      },
    });
  }

  static async index() {
    const restaurants = await prisma.restaurant.findMany();

    return restaurants;
  }
}

export default RestaurantModel;
