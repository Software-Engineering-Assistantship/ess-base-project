import OrderItemEntity from '../entities/OrderItemEntity';
import ShoppingCartModel from '../models/ShoppingCartModel';

//return the String that tells the result of the operation
export default class ShoppingCartService {

    static async getClientId(clientLogin: string): Promise<number | Error> {
        const clientId = parseInt(clientLogin);
        if(isNaN(clientId) || ! await ShoppingCartModel.isValidClient(clientId)) {
            return new Error('Invalid Client Id');
        }
        return clientId;
    }

    static async insertOrderItem(order: OrderItemEntity): Promise<[number, string]> {
        try {
            await ShoppingCartModel.insert(order.clientId, order.itemId);
            return [201, 'Item added to cart'];
        }
        catch (error: any) {
            // console.log(error.code)
            switch(error.code) {
                //this is the error code from prisma when the foreign key constraint is violated
                //it means that the itemId or clientId does not exist
                case 'P2003':
                    return [400, 'Pair itemId and clientId already exists'];
                default:
                    return [500, 'InsertOrderItem: Internal Server Error'];
            }
        }
    }

    //return the list of orders of the user, or an error for clients that do not exist
    static async getUserOrderItems(clientId: number): Promise<OrderItemEntity[] | Error> {
        try {
            return await ShoppingCartModel.index(clientId);
        }
        catch (error: any) {
            return error;
        }
    }

    static async removeOrderItem(order: OrderItemEntity): Promise<[number, string]> {
        try {
            await ShoppingCartModel.remove(order.clientId, order.itemId);
            return [200, 'Item removed from cart'];
        }
        catch (error: any) {
            switch(error.code) {
                case 'P2025':
                    return [400, 'Item not found in cart'];
                default:
                    return [500, 'RemoveOrderItem: Internal Server Error'];
            }
        }
    }

    static async updateOrderItem(order: OrderItemEntity): Promise<[number, string]> {
        try {
            if (order.quantity <= 0) {
                return [400, 'Invalid Quantity'];
            }
            console.log(await ShoppingCartModel.update(order.clientId, order.itemId, order.quantity));
            return [200, 'Item updated'];
        }
        catch (error: any) {
            return [500, 'UpdateOrderItem: Internal Server Error'];
        }
    }
}
