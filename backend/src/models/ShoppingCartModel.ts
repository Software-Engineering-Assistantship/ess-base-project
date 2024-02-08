import prisma from '../database';

class ShoppingCartModel {
    static async insert(itemId: number, clientId: number) {
        await prisma.order.create({
            data: {
                itemId,
                clientId,
            },
        });
    }

    static async index() {
        const orders = await prisma.order.findMany();

        return orders;
    }

    static async remove(itemId: number, clientId: number) {
        await prisma.order.delete({
            where: {
                itemId_clientId: {
                    itemId,
                    clientId,
                },
            },
        });
    }
}

export default ShoppingCartModel;
