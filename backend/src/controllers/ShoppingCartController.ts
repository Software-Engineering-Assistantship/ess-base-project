import { Request, Response, Router } from 'express';
import OrderItemEntity from '../entities/OrderItemEntity';
import ShoppingCartModel from '../models/ShoppingCartModel';
import ShoppingCartService from '../services/ShoppingCartService';

export default class ShoppingCartController {
    private static prefix = '/:user_login/shopping_cart';

    static setupRoutes(router: Router) {
        router.post(this.prefix, this.insertOrderItem);
        router.get(this.prefix, this.getUserOrderItems);
        router.delete(this.prefix, this.removeOrderItem);
        router.put(this.prefix, this.updateOrderItem);
    }

    private static async insertOrderItem(req: Request, res: Response) {
        const clientId = await ShoppingCartService.getClientId(req.params.user_login);
        if (clientId instanceof Error) {
            return res.status(400).json({ message: clientId.message });
        }
        const { itemId } = req.body;
        const answer = await ShoppingCartService.insertOrderItem(new OrderItemEntity(clientId, itemId));
        return res.status(answer[0]).json({ message: answer[1]  });
    }

    private static async getUserOrderItems(req: Request, res: Response) {
        const clientId = await ShoppingCartService.getClientId(req.params.user_login);
        if (clientId instanceof Error) {
            return res.status(400).json({ message: clientId.message });
        }

        const orders = await ShoppingCartService.getUserOrderItems(clientId);
        if (orders instanceof Error) {
            return res.status(500).json({ message: orders.message });
        }
        res.status(200).json(orders);
    }

    private static async removeOrderItem(req: Request, res: Response) {
        const clientId = await ShoppingCartService.getClientId(req.params.user_login);
        if (clientId instanceof Error) {
            return res.status(400).json({ message: clientId.message });
        }
        const { itemId } = req.body;

        const answer = await ShoppingCartService.removeOrderItem(new OrderItemEntity(clientId, itemId));
        return res.status(answer[0]).json({ message: answer[1] });
    }

    private static async updateOrderItem(req: Request, res: Response) {
        const clientId = await ShoppingCartService.getClientId(req.params.user_login);
        if (clientId instanceof Error) {
            return res.status(400).json({ message: clientId.message });
        }
        const { itemId, quantity } = req.body;
        var order = new OrderItemEntity(clientId, itemId);
        order.quantity = quantity;

        const answer = await ShoppingCartService.updateOrderItem(order);
        return res.status(answer[0]).json({ message: answer[1] });
    }
}
