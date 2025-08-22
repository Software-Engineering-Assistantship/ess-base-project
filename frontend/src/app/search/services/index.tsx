import apiService from "../../../shared/services/api-service";
import { ISearch } from "../models";
import { PromotionModel } from "../../Promotion/models/promotion";
import { RatingModel } from "../models";

export async function getPublishedReservationsByFilters(search: ISearch){
    const response = await apiService.post('/reservations', search);
    return response.data;
}

export async function getPromotionById(reservation_id: number): Promise<PromotionModel>{
    const response = await apiService.get(`/reservation/${reservation_id}/promotions`);
    return response.data;
}

export async function getRatingById(reservation_id: number): Promise<RatingModel[]>{
    const response = await apiService.get(`/rated-reservations/reserve/${reservation_id}`);
    return response.data;
}