import apiService from "../../../shared/services/api-service";

export async function getAllPayMethod(client_id: number){
    const response = await apiService.get(`/client/${client_id}/paymentMethods`);
    return response.data;
}

