import { Request, Response, Router } from 'express';
import ShoppingCartModel from '../models/ShoppingCartModel';

class ShoppingCartController {
    private static prefix = '/shopping_cart';

    static setupRoutes(router: Router) {
        router.post(this.prefix, ShoppingCartController.insertOrder);
        router.get(this.prefix, ShoppingCartController.getUserOrders);
        router.delete(this.prefix, ShoppingCartController.removeOrder);
        router.put(this.prefix, ShoppingCartController.updateOrder);
    }

    static async insertOrder(req: Request, res: Response) {
        const { clientId, itemId } = req.body;
        try {
            await ShoppingCartModel.insert(clientId, itemId);
            return res.status(201).json({ message: 'Item added to cart' });
        }
        catch (error: any) {
            console.log(error.code)
            switch(error.code) {
                //this is the error code from prisma when the foreign key constraint is violated
                //it means that the itemId or clientId does not exist
                case 'P2003':
                    return res.status(400).json({ message: 'ItemId or ClientId not valid' });
                default:
                    return res.status(500).json({ message: error.message });
            }
        }
    }

    static async getUserOrders(req: Request, res: Response) {
        const clientId = Object.keys(req.body).length === 0 ? undefined : req.body.clientId;
        try {
            const resData = await ShoppingCartModel.index(clientId);
            return res.status(200).json(resData);
        }
        catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    static async removeOrder(req: Request, res: Response) {
        const { clientId, itemId } = req.body;
        try {
            await ShoppingCartModel.remove(clientId, itemId);
            return res.status(200).json({ message: 'Item removed from cart' });
        }
        catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    static async updateOrder(req: Request, res: Response) {
        const { clientId, itemId, quantity } = req.body;
        try {
            if (quantity <= 0) {
                return res.status(400).json({ message: 'Invalid Quantity' });
            }
            await ShoppingCartModel.update(clientId, itemId, quantity);
            return res.status(200).json({ message: 'Item updated' });
        }
        catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export default ShoppingCartController;
