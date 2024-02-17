import prisma from '../database';

class ShoppingCartModel {
    //insert an orderItem into the database
    static async insert(clientId: number, itemId: number): Promise<any> {
        const orderId = await ShoppingCartModel.getOrderIdOfShoppingCart(clientId);
        return await prisma.orderItem.create({
            data: {
                orderId,
                itemId,
            },
        });
    }

    //check if the client exists
    static async isValidClient(clientId: number): Promise<boolean> {
        return (await prisma.client.findUnique({
            where: {
                id: clientId,
            },
        })) !== null;
    }

    //return only the orders items of the client
    static async index(clientId : number): Promise<any> {
        const orderId = await ShoppingCartModel.getOrderIdOfShoppingCart(clientId); //TODO remove this repetitions on refactoring
        return await prisma.orderItem.findMany({
            where: {
                orderId,
            },
        });
    }

    static async indexRestaurants(): Promise<any[]> {
        return await prisma.restaurant.findMany({
            select: { id: true, name: true, cnpj: true, email: true, },
        });
    }

    static async indexItems(restaurantId: number): Promise<any[]> {
        return await prisma.item.findMany({
            where: { restaurantId },
            select: { id: true, name: true, price: true },
        });
    }

    //remove an orderItem from the database
    static async remove(clientId: number, itemId: number): Promise<any> {
        const orderId = await ShoppingCartModel.getOrderIdOfShoppingCart(clientId);
        return await prisma.orderItem.delete({
            where: {
                itemId_orderId: {
                    itemId,
                    orderId,
                },
            },
        });
    }

    //update the quantity of an orderItem
    static async update(clientId: number, itemId: number, quantity: number) {
        const orderId = await ShoppingCartModel.getOrderIdOfShoppingCart(clientId);
        return await prisma.orderItem.update({
            where: {
                itemId_orderId: {
                    itemId,
                    orderId,
                },
            },
            data: {
                orderId,
                itemId,
                quantity,
            },
        });
    }

    //returns the code of the current shopping cart of the client
    static async getOrderIdOfShoppingCart(clientId: number): Promise<number> {
        const order =  (await prisma.orders.findFirst({
            where: {
                clientId,
                status: 'Nao finalizado',
            },
        }));
        if (order) {
            return order.id;
        }
        return (await prisma.orders.create(
            {data: {clientId}
        })).id;
    }
}

export default ShoppingCartModel;
