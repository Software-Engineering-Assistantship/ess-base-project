export interface HotelierModel{
    id: number; 
    name: string; 
    email: string; 
    username: string; 
    password: string; 
    hotel: string; 
    city: string; 
    cep: string; 
    address: string; 
    n_address: string; 
    UF: string; 
    cnpj: string; 
}

export interface PublishedHotelierModel {
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
    hotelier: HotelierModel;
}