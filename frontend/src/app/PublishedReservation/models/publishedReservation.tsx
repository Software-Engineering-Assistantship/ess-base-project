export interface PublishedReservationModel{
    id: number;
    name: string;
    rooms: number; 
    people: number; 
    wifi: boolean;
    breakfast: boolean;  
    airConditioner: boolean; 
    parking: boolean;
    room_service: boolean;
    price: number;
    new_price: number;
    promotion_id?: number | null;
    hotelier_id: number;
    imageUrl?: string | null;
}