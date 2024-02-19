import prisma from '../database';
import { Prisma } from '@prisma/client';
import DuplicateFieldError from '../errors/DuplicateFieldError';
class OrderCancellationModel {
  static async index(clientId: number) {
    const orders = await prisma.orders.findMany({
      where: {
        clientId: clientId,
      },
      select: {
        id: true,
        status: true,
        time: true,
        products: true,
        price: true,
      },
    });
    return orders;
  }

  static async update(clientId: number, orderId: number, status: string) {
    try {
      await prisma.orders.update({
        where: { id: orderId, clientId },
        data: { status },
      });
    } catch (error: any) {
      throw error;
    }
  }

  static async insert(clientId: number, orderId: number, reason: string) {
    try {
      await prisma.cancelledOrders.create({
        data: {
          orderId,
          clientId,
          reason,
        },
      });
    } catch (error: any) {
      throw error;
    }
  }

  static async getClientById(clientId: number) {
    const user = await prisma.client.findUnique({
      where: {
        id: clientId,
      },
    });
    return user;
  }

  static async orderExistence(orderId: number) {
    const order = await prisma.orders.findUnique({
      where: {
        id: orderId,
      },
    });
    return order;
  }
}

export default OrderCancellationModel;