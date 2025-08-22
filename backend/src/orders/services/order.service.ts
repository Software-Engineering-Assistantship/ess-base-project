import { Injectable } from '@nestjs/common';
import { OrderService, RatingProps } from 'src/interfaces/order-service';
import { Order } from '../entities/order';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class PrismaOrderService implements OrderService {
  constructor(private prisma: PrismaService) {}

  async create(order: Order): Promise<Order> {
    return this.prisma.$transaction(async (prisma) => {
      const orderOnDatabase = await prisma.orders.create({
        data: {
          comment: order.comment,
          rate: order.rate,
        },
      });

      await Promise.all(
        order.menuItems.map(async (item) => {
          return prisma.orderMenu.create({
            data: {
              orderId: orderOnDatabase.id,
              menuId: item.id,
            },
          });
        }),
      );

      return {
        id: orderOnDatabase.id,
        ...order,
      };
    });
  }

  async findAll(): Promise<Order[]> {
    return await this.prisma.orders.findMany({
      orderBy: {
        createdAt: 'desc', // Sorting by createdAt in descending order
      },
      include: {
        menuItems: {
          include: {
            menu: true,
          },
        },
      },
    });
  }

  async update(id: string, rate: RatingProps): Promise<Order | null> {
    const updatedOrder = await this.prisma.orders.update({
      where: {
        id,
      },
      data: {
        rate: rate.rate,
        comment: rate.comment,
      },
      include: {
        menuItems: true,
      },
    });

    return updatedOrder;
  }

  async findOne(id: string): Promise<Order> {
    return await this.prisma.orders.findUnique({
      where: {
        id,
      },
      include: {
        menuItems: {
          include: {
            menu: true,
          },
        },
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.orderMenu.deleteMany({
      where: {
        orderId: id,
      },
    });

    await this.prisma.orders.delete({
      where: {
        id,
      },
    });
  }
}
