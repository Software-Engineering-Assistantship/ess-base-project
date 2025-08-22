import apiService from "../../../shared/services/api-service";
import { RateModel } from "../models"; 

// Função para criar uma nova avaliação
export async function rateReservation(params: RateModel & { client_id: number; reservation_id: number }) {
    const response = await apiService.post(`/rated-reservations`, params);
    return response.data;
}

// Função para obter todas as avaliações de um cliente
export async function getRatesByClientId(client_id: number): Promise<RateModel[]> {
    const response = await apiService.get(`/rated-reservations/client/${client_id}`);
    return response.data;
}

export async function getAllRatesbyPublishedReservation(reservation_id: number): Promise<RateModel[]> {
    const response = await apiService.get(`/rated-reservations/client/${reservation_id}`);
    return response.data;
}

// Função para excluir uma avaliação
export async function deleteRateById(client_id: number, reservation_id: number) {
    const response = await apiService.delete(`/rated-reservations/${client_id}/${reservation_id}`);
    return response.data;
}

// Função para editar uma avaliação
export async function editRateById(client_id: number, reservation_id: number, params: Partial<RateModel>) {
    const response = await apiService.patch(`/rated-reservations/${client_id}/${reservation_id}`, params);
    return response.data;
}
