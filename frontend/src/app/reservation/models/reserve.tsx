export interface ReserveModel {
    id: number;
    num_rooms: number;
    checkin: string; // "YYYY-MM-DD"
    checkout: string;
    num_adults: number;
    num_children: number;
    paymentMethodName: string; //numero do cartao
    price: number;
    publishedReservationId: number;
    clientId: number;
    paymentMethodId: number;
}
