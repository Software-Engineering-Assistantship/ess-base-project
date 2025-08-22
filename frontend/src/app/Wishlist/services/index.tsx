// save-service.ts
import apiService from "../../../shared/services/api-service";
import { SaveModel } from "../models"; 

export async function saveReservation(params: SaveModel) {
    const response = await apiService.post(`/saved-reservations`, params);
    return response.data;
}

export async function getSavedReservationByClientId(client_id: number): Promise<SaveModel[]> {
    const response = await apiService.get(`/saved-reservations/publishedReservation/${client_id}`);
    return response.data;
}

export async function deleteSavedReservationById(client_id: number, reservation_id: number) {
    const response = await apiService.delete(`/saved-reservations/${client_id}/${reservation_id}`);
    return response.data;
}
