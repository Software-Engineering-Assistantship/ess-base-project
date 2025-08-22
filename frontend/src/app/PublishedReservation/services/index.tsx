import apiService from "../../../shared/services/api-service";

export async function getAllPublishedReservation(){
    const response = await apiService.get(`/reservations`);
    return response.data;
}

export async function getPublishedReservationById(reservation_id: number){
    const response = await apiService.get(`/reservations/${reservation_id}`);
    return response.data;
}

// export async function getPublishedReservationWithHotelierById(reservation_id: number){
//     const response = await apiService.get(`/reservations/hotelier/${reservation_id}`);
//     return response.data;
// }

export async function createPublishedReservation(hotelier_id: number, name: string, rooms: number, people: number, wifi: boolean, breakfast: boolean, airConditioner: boolean, parking: boolean, room_service: boolean, price: number){
    const response = await apiService.post(`/hotelier/${hotelier_id}/reservations`, {name: name, rooms: rooms, people: people, wifi: wifi, breakfast: breakfast, airConditioner: airConditioner, parking: parking, room_service: room_service, price:price});
    return response.data;
}

export async function updatePublishedReservation(reservation_id: number,  name: string, rooms: number, people: number, wifi: boolean, breakfast: boolean, airConditioner: boolean, parking: boolean, room_service: boolean, price: number){
    const response = await apiService.patch(`/reservations/${reservation_id}`, {name: name, rooms: rooms, people: people, wifi: wifi, breakfast: breakfast, airConditioner: airConditioner, parking: parking, room_service: room_service, price:price});
    return response.data;
}

export async function deletePublishedReservation(reservation_id: number){
    const response = await apiService.delete(`/reservations/${reservation_id}`);
    return response.data;
}

export async function uploadImage(reservation_id:number, formData: FormData) {
    return apiService.post(`/reservation/${reservation_id}/upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}