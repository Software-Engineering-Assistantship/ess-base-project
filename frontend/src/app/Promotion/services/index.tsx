import { PromotionModel } from "../models/promotion";
import apiService from "../../../shared/services/api-service";

export async function createPromotion(reservation_id: number, params: PromotionModel){
    const response =  await apiService.post(`/reservation/${reservation_id}/promotions`, params);
    return response.data;
}

export async function getPromotionById(reservation_id: number): Promise<PromotionModel>{
    const response = await apiService.get(`/reservation/${reservation_id}/promotions`);
    return response.data;
}

export async function updatePromotion(reservation_id: number, params: PromotionModel){
    const response = await apiService.put(`/reservation/${reservation_id}/promotions`, params);
    return response.data;
}

export async function deletePromotion(reservation_id: number){
    const response = await apiService.delete(`/reservation/${reservation_id}/promotions`);
    return response.data;
}

export async function createPromotionAll(hotelier_id: number, params: PromotionModel){
    const response = await apiService.post(`/hotelier/${hotelier_id}/reservation/promotions`, params);
    return response.data;
}

export async function deleteAllPromotions(hotelier_id: number){
    const response = await apiService.delete(`/hotelier/${hotelier_id}/reservation/promotions`);
    return response.data;
}