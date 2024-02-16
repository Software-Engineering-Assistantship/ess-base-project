import { Request, Response } from 'express';
import OrderCancellationModel from '../models/OrderCancellationModel';

class OrderCancellationController {
  static async index(req: Request, res: Response) {
    const { clientId } = req.params;
    const { password } = req.body;
    try {
      const client = await OrderCancellationModel.getClientById(
        Number(clientId)
      );
      if (client && client.password == password) {
        const resData = await OrderCancellationModel.index(Number(clientId));
        return res.status(200).json(resData);
      } else {
        if (!client) {
          return res.status(404).json({ message: 'cliente nao existe!' });
        } else return res.status(401).json({ message: 'senha incorreta!' });
      }
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    const clientId = req.params.clientId;
    const orderId = req.params.orderId;
    const { password, reason } = req.body;
    try {
      const client = await OrderCancellationModel.getClientById(
        Number(clientId)
      );
      const order = await OrderCancellationModel.orderExistence(
        Number(orderId)
      );
      if (
        order &&
        order.status != 'cancelled' &&
        client &&
        client.password === password
      ) {
        const status = 'cancelled';
        await OrderCancellationModel.update(
          Number(clientId),
          Number(orderId),
          String(status)
        );
        await OrderCancellationModel.insert(
          Number(orderId),
          Number(clientId),
          String(reason)
        );
        return res
          .status(200)
          .json({ message: 'Pedido Cancelado', order_number: Number(orderId) });
      } else {
        if (!client) {
          return res.status(404).json({ message: 'cliente não existe!' });
        }
        if (!order) {
          return res.status(400).json({ message: 'pedido não existe' });
        }
        if (order.status === 'cancelled') {
          return res.status(400).json({
            message: 'Pedido não cancelado: pedido já cancelado!',
            order_number: Number(orderId),
          });
        } else
          return res.status(401).json({
            message: 'Pedido não cancelado: senha incorreta!',
            order_number: Number(orderId),
          });
      }
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export default OrderCancellationController;
