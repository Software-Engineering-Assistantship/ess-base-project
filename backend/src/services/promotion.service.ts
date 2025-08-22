import { Promotion } from "../controllers/promotion.controller";
import { PromotionType } from "../enums/promotion-type.enum";
import PromotionRepository from "../repositories/promotion.repository";
import PublishedReservationRepository from "../repositories/publishedReservation.repository";
import { HttpBadRequestError, HttpConflictError, HttpError, HttpInternalServerError, HttpNotFoundError } from "../utils/errors/http.error";

export default class PromotionService {

    private promotionRepository: PromotionRepository;
    private publishedReservationRepository: PublishedReservationRepository;

    constructor(){
        this.promotionRepository = new PromotionRepository();
        this.publishedReservationRepository = new PublishedReservationRepository();
    }

    private preparePromotionParams(discount: number, type: string, num_rooms?: number | null): Promotion {
        if (type === PromotionType.LIMITE_QUARTO && num_rooms === undefined) {
            throw new HttpBadRequestError({
                msg: 'num_rooms is required'
            });
        }
        if (type === PromotionType.ILIMITADA && num_rooms !== undefined) {
            throw new HttpBadRequestError({
                msg: 'num_rooms should not be reported'
            });
        }
        let params = { discount, type, num_rooms } as Promotion;
        return params;
    }

    async insertPromotion( reservation_id: number, discount: number, type: string, num_rooms?: number | null): Promise<number> {
        let params = this.preparePromotionParams(discount, type, num_rooms);
        try{
            const reservation = await this.publishedReservationRepository.getPublishedReservationById(reservation_id);
            const promotion = await this.publishedReservationRepository.getPromotionIdByReservationId(reservation_id);
            if (promotion) {
                throw new HttpConflictError({
                    msg: 'Essa reserva já possui promoção'
                });
            }else if(num_rooms && reservation.rooms < num_rooms){
                throw new HttpBadRequestError({
                    msg: `Há apenas ${reservation.rooms} quartos cadastrados`
                })
            }

            const promotion_id = await this.promotionRepository.insertPromotion(params);
            await this.publishedReservationRepository.updatePromotionIdReservation(reservation_id, +promotion_id);
            await this.publishedReservationRepository.updatePriceAllReservations();
            return promotion_id;
        }catch(error: any){
            if (error instanceof HttpError){
                throw error;
            }else{
                throw new HttpInternalServerError({msg: `Error inserting promotion: ${error.message}`});
            }
        }
    }

    async insertPromotionAll(hotelier_id: number, discount: number, type: string, num_rooms?: number | null): Promise<number> {
        let params = this.preparePromotionParams(discount, type, num_rooms);
        try{
            const promotion_id = await this.promotionRepository.insertPromotion(params);
            await this.publishedReservationRepository.updatePromotionIdAllReservations(hotelier_id, promotion_id);
            await this.publishedReservationRepository.updatePriceAllReservations();
            return promotion_id;
        }catch(error: any){
            if (error instanceof HttpError){
                throw error;
            }else{
                throw new HttpInternalServerError({msg: `Error inserting promotion: ${error.message}`});
            }
        }
    }

    async getAllPromotions(): Promise<Promotion[]> {
        try{
            return await this.promotionRepository.getAllPromotions();
        }catch(error: any){
            throw new HttpInternalServerError({msg: `Error fetching all promotions: ${error.message}`});
        }
    }

    async getPromotionById(reservation_id: number): Promise<Promotion> {
        try{
            const promotion_id = await this.publishedReservationRepository.getPromotionIdByReservationId(reservation_id)
            if (!promotion_id) {
                throw new HttpNotFoundError({
                    msg: 'Promotion not found'
                });
            }
            const promotion = await this.promotionRepository.getPromotionById(promotion_id);
            return promotion;
        }catch(error: any){
            if (error instanceof HttpError){
                throw error;
            }else{
                throw new HttpInternalServerError({msg: `Error fetching promotion: ${error.message}`});
            }
        }
    }

    async updatePromotionById(reservation_id: number, discount: number, type: string, num_rooms?: number): Promise<void> {
        const params = this.preparePromotionParams(discount, type, num_rooms) as Promotion;
        try{
            const promotion_id = await this.publishedReservationRepository.getPromotionIdByReservationId(reservation_id)
            if (!promotion_id) {
                throw new HttpNotFoundError({
                    msg: 'Não há promoção cadastrada'
                });
            }
            const rows = await this.publishedReservationRepository.getQuantityOfPromotions(promotion_id);
            if(rows > 1){
                const promotion_id = await this.promotionRepository.insertPromotion(params);
                await this.publishedReservationRepository.updatePromotionIdReservation(reservation_id, +promotion_id);
            }else{
                await this.promotionRepository.updatePromotionById(promotion_id, params);
            }
            await this.publishedReservationRepository.updatePriceAllReservations();
        }catch(error: any){
            if (error instanceof HttpError){
                throw error;
            }else{
                throw new HttpInternalServerError({msg: `Error updating promotion: ${error.message}`});
            }
        }
    }

    async deletePromotionById(reservation_id: number): Promise<void> {
        try{
            const promotion_id = await this.publishedReservationRepository.getPromotionIdByReservationId(reservation_id);
            if (!promotion_id) {
                throw new HttpNotFoundError({
                    msg: 'Não há promoção cadastrada'
                });
            }
            await this.publishedReservationRepository.updatePromotionIdReservation(reservation_id, null);
            const rows = await this.publishedReservationRepository.getQuantityOfPromotions(promotion_id);
            if(rows === 0){
                await this.promotionRepository.deletePromotionById(promotion_id); 
            }
            await this.publishedReservationRepository.updatePriceAllReservations();
        }catch(error: any){
            if (error instanceof HttpError){
                throw error;
            }else{
                throw new HttpInternalServerError({msg: `Error deleting promotion: ${error.message}`});
            }
        }
    }

    async deleteAllPromotions(hotelier_id: number): Promise<void> {
        try{
            if(!await this.publishedReservationRepository.promotionInReservation(hotelier_id)){
                throw new HttpNotFoundError({
                    msg: 'Não há promoção cadastrada'
                });
            }
            await this.promotionRepository.deleteAllPromotions(hotelier_id);
            await this.publishedReservationRepository.updatePriceAllReservations();
        }catch(error: any){
            if (error instanceof HttpError){
                throw error;
            }else{
                throw new HttpInternalServerError({msg: `Error deleting all promotions: ${error.message}`});
            }
        }
    }
}