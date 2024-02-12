import prisma from '../database';

class ShoppingCartModel {
    //insert an order into the database
    static async insert(clientId: number, itemId: number) {
        await prisma.order.create({
            data: {
                itemId,
                clientId,
            },
        });
    }

    //return every order if clientId is not defined
    //return only the orders of the client if clientId is defined
    static async index(clientId? : number) {
        if (!clientId) {
            return await prisma.order.findMany();
        }
        const clientOrders = await prisma.order.findMany({
            where: {
                clientId,
            },
        });
        return clientOrders;
    }

    //remove an order from the database
    static async remove(clientId: number, itemId: number) {
        await prisma.order.delete({
            where: {
                itemId_clientId: {
                    itemId,
                    clientId,
                },
            },
        });
    }

    //update the quantity of an order
    static async update(clientId: number, itemId: number, quantity: number) {
        await prisma.order.updateMany({
            where: {
                clientId,
                itemId,
            },
            data: {
                clientId,
                itemId,
                quantity,
            },
        });
    }
}

export default ShoppingCartModel;
