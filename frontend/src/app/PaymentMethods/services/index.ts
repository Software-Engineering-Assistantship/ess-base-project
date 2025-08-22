import apiService from "../../../shared/services/api-service";
import { CardModel } from "../models/card";

//get

export async function getPayMethodsByClient(clientId: number){
    const response = await apiService.get(`/client/${clientId}/paymentMethods`);
    console.log(response)
    return response.data;
}

export async function deletePayMethodsById(clientId: number, payMentMethodId: number){
    const response = await apiService.delete(`/client/${clientId}/paymentMethods/${payMentMethodId}`);
    console.log(response)
    return response.data;
}

export async function postPayMethods(card: CardModel) {
    console.log(card);
    const { name, numCard, cvv, expiryDate, type, clientId, cpf } = card;
    const response = await apiService.post(`/client/${clientId}/paymentMethods`, {
        name,
        numCard,
        cvv,
        expiryDate,
        type,
        clientId,
        cpf
    });
    return response.data;
}

export async function editPayMethods(paymentMethodId: number, card: CardModel) {
    console.log(card);
    const { name, numCard, cvv, expiryDate, type, clientId, cpf } = card;
    const response = await apiService.patch(`/client/${clientId}/paymentMethods/${paymentMethodId}`, {
        name,
        numCard,
        cvv,
        expiryDate,
        type,
        clientId,
        cpf
    });
    return response.data;
}






