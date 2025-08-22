export default class OrderItemEntity {
    orderId?: number;
    clientId: number;
    itemId: number;
    quantity: number;

    constructor(clientId: number, itemId: number, orderId?: number) {
        this.clientId = clientId;
        this.itemId = itemId;
        this.quantity = 1;
        if(orderId)
            this.orderId = orderId;
    }
}
