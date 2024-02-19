import prisma from "@database";
import { Prisma } from "@prisma/client";

class DeliveryNotificationRepository {
  async create(data: Prisma.NotificationCreateInput) {
    try {
      const notification = await prisma.notification.create({ data });
      return notification;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async update(id: number, data: Prisma.NotificationUpdateInput) {
    try {
      const notification = await prisma.notification.update({ where: { id }, data });
      return notification;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export default new DeliveryNotificationRepository();