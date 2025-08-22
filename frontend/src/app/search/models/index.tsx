
export interface RatingModel {
    client_id: number;
    reservation_id: number;
    rating: number;
    comments: string | null;
}

export interface ISearch{
    city: string;
    checkin: string;
    checkout: string;
    num_adults: number;
    num_children: number;
    num_rooms: number;
}

export interface IPublishedReservations{
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
    rating?: number | null;
}