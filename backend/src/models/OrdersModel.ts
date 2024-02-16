import prisma from '../database';

function getRandomInt(max: number) {
  return Math.round(Math.random() * max);
}

class OrdersModel {
  static async update(orderId: number, price: number): Promise<any> {
    try {
      const statusArr = ['em Preparo', 'Confirmado'];
      const time = String(getRandomInt(9)) + ':' + String(getRandomInt(59));
      const status = statusArr[getRandomInt(1)];
      return await prisma.orders.update({
        where: { id: orderId },
        data: { status, time, price },
      });
    } catch (error: any) {
      throw error;
    }
  }

  static async insert(clientId: number) {
    try {
      await prisma.orders.create({
        data: {
          clientId,
        },
      });
    } catch (error: any) {
      throw error;
    }
  }
}

export default OrdersModel;
