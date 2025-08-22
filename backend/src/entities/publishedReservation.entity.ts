import { PublishedReservation } from "../controllers/reservation.controller";

export default class PublishedReservationEntity implements PublishedReservation{
    id: number;
    name: string;
    rooms: number;
    people: number;
    wifi: Boolean;
    breakfast: Boolean;
    airConditioner: Boolean;
    parking: Boolean;
    room_service: Boolean;
    price: number;
    new_price: number;
    promotion?: any;
    promotionId?: number | undefined;
    hotelier?: any;
    hotelier_id: number;

    constructor(data: PublishedReservationEntity){
        this.id = data.id;
        this.name = data.name;
        this.rooms = data.rooms;
        this.people = data.people;
        this.wifi = data.wifi;
        this.breakfast = data.breakfast;
        this.airConditioner = data.airConditioner;
        this.parking = data.parking;
        this.room_service = data.room_service;
        this.price = data.price;
        this.new_price = data.new_price;
        this.promotion = data.promotion;
        this.promotionId = data.promotionId;
        this.hotelier = data.hotelier;
        this.hotelier_id = data.hotelier_id;
    }

}