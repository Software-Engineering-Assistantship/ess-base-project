import apiService from "../../../shared/services/api-service";

//get

export async function getReservationsByClient(clientId: number){
    const response = await apiService.get(`/client/${clientId}/reserve`);
    return response.data;
}

export async function getReservationById(reservationId: number){
    const response = await apiService.get(`/reserve/${reservationId}`);
    return response.data;
}

//post

export async function createReservation(clientId: number, publishedReservationId: number, num_rooms: number, checkin: string, checkout: string, num_adults: number, num_children: number, paymentMethodName: string){
    const response = await apiService.post(`/client/${clientId}/publishedReservation/${publishedReservationId}/reserve`, {num_rooms: num_rooms, checkin: checkin, checkout: checkout, num_adults: num_adults, num_children: num_children, paymentMethodName: paymentMethodName});
    return response.data;
}

//put

export async function updateReservation(clientId: number, publishedReservationId: number, reservationId: number, num_rooms: number, checkin: string, checkout: string, num_adults: number, num_children: number, paymentMethodName: string){
    const response = await apiService.put(`/client/${clientId}/publishedReservation/${publishedReservationId}/reserve/${reservationId}`, {num_rooms: num_rooms, checkin: checkin, checkout: checkout, num_adults: num_adults, num_children: num_children, paymentMethodName: paymentMethodName});
    return response.data;
}

//delete 

export async function cancelReservation(reservationId: number){
    const response = await apiService.delete(`/reserve/${reservationId}`);
    return response.data;
}





