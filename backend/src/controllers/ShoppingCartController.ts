import { Request, Response } from 'express';
import ShoppingCartModel from '../models/ShoppingCartModel';

class ShoppingCartController {
    static async insert(req: Request, res: Response) {
        const { itemId, clientId } = req.body;
        try {
            await ShoppingCartModel.insert(itemId, clientId);
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

    static async index(req: Request, res: Response) {
        try {
            const resData = await ShoppingCartModel.index();
            return res.status(200).json(resData);
        }
        catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    static async remove(req: Request, res: Response) {
        const { itemId, clientId } = req.body;
        try {
            await ShoppingCartModel.remove(itemId, clientId);
            return res.status(200).json({ message: 'Item removed from cart' });
        }
        catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export default ShoppingCartController;
