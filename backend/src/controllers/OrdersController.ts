import { Request, Response } from 'express';
import OrdersModel from '../models/OrdersModel';

class OrderCancellationController {
  static async insert(req: Request, res: Response) {
    const { clientId } = req.body;
    try {
      await OrdersModel.insert(Number(clientId));
      return res.status(200).json({ messasge: 'sucesso :)' });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    const { orderId } = req.params;
    const { price } = req.body;
    try {
      await OrdersModel.update(Number(orderId), Number(price));
      return res.status(200).json({ messasge: 'sucesso :)' });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export default OrderCancellationController;
