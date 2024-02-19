import { NextFunction, Request, Response } from "express";
import { DeliveryRepository, deliveryNotificationRepository } from "../repositories";

interface DeliveryNotificationBody {
  status: string;
  deliveryPersonEmail: string;
}

class DeliveryNotificationController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { deliveryId } = req.params;

      const { status, deliveryPersonEmail } = req.body as DeliveryNotificationBody;

      if (!deliveryId) {
        return next({
          status: 400,
          message: "Delivery ID is required",
        })
      }

      const delivery = await DeliveryRepository.findById(parseInt(deliveryId));

      if (delivery?.status !== "pendente") {
        return next({
          status: 400,
          message: "Status inválido para notificação de nova entrega",
        })
      }

      const updatedDelivery = await DeliveryRepository.update(parseInt(deliveryId), { status, deliveryPerson: { connectOrCreate: { where: { email: deliveryPersonEmail } , create: {
        email: deliveryPersonEmail,
        cpf: "000.000.000-00",
        name: "Entregador",
        phone: "000000000",
        status: "ativo",
      } } } });

      const notification = await deliveryNotificationRepository.create({
        category: "new-delivery",
        title: `Nova entrega ${updatedDelivery.id} solicitada`,
        delivery: {connect: {id: updatedDelivery.id}},
      })

      res.locals = {
        status: 200,
        data: {notification, deliveryPersonEmail},
      }

      return next();
    } catch (error: any) {
      return next({
        status: 500,
        message: error.message,
      });
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { deliveryId } = req.params;

      const { status, deliveryPersonEmail } = req.body as DeliveryNotificationBody;

      if (!deliveryId) {
        return next({
          status: 400,
          message: "Delivery ID is required",
        })
      }

      const delivery = await DeliveryRepository.findById(parseInt(deliveryId));

      if (delivery?.status !== "deslocamento") {
        return next({
          status: 400,
          message: "Status inválido para notificação de entrega finalizada",
        })
      }

      const updatedDelivery = await DeliveryRepository.update(parseInt(deliveryId), { status, deliveryPerson: { connectOrCreate: { where: {email: deliveryPersonEmail}, create: {
        email: deliveryPersonEmail,
        cpf: "000.000.000-00",
        name: "Entregador",
        phone: "000000000",
        status: "ativo",
      } } }});

      const notification = await deliveryNotificationRepository.create({
        category: "delivery-status",
        title: `Entrega ${updatedDelivery.id} realizada com sucesso`,
        delivery: {connect: {id: updatedDelivery.id}},
      })

      res.locals = {
        status: 200,
        data: {notification, deliveryPersonEmail},
      }

      return next();
    } catch (error: any) {
      return next({
        status: 500,
        message: error.message,
      });
    }
  }
}

export default new DeliveryNotificationController();