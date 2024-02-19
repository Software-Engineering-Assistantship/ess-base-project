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
          return res.status(404).json({
            message: 'Acesso negado: cliente não existe!',
            client_id: Number(clientId),
          });
        } else
          return res.status(401).json({
            message: 'Acesso negado: senha incorreta!',
            client_id: Number(clientId),
          });
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

      const timeFlag = order && parseInt(order.time[0], 10) < 5;

      if (
        order &&
        order.status == 'Pendente' &&
        client &&
        client.password === password &&
        timeFlag
      ) {
        const status = 'Cancelado';
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
          return res.status(404).json({
            message: 'Pedido não cancelado: cliente não existe!',
            order_number: Number(orderId),
          });
        }
        if (!order) {
          return res.status(404).json({
            message: 'Pedido não cancelado: pedido não existe!',
            order_number: Number(orderId),
          });
        }
        if (order.status === 'Cancelado') {
          return res.status(400).json({
            message: 'Pedido não cancelado: pedido já cancelado!',
            order_number: Number(orderId),
          });
        }
        if (order.status === 'Aceito') {
          return res.status(400).json({
            message: 'Pedido não cancelado: pedido já foi aceito!',
            order_number: Number(orderId),
          });
        }
        if (!timeFlag) {
          return res.status(400).json({
            message: 'Pedido não cancelado: tempo limite excedido!',
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
