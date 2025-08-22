import prisma from "../database";
import { Promotion } from "../controllers/promotion.controller";

export default class PromotionRepository {
    async insertPromotion(params: Promotion) : Promise<number>{
        const result = await prisma.promotion.create({data: params})
        return result.id;
    }

    async getAllPromotions(): Promise<Promotion[]> {
        const promotions = await prisma.promotion.findMany() as Promotion[];
        return promotions;
    }

    async getPromotionById(id: number): Promise<Promotion> {
        const promotion = await prisma.promotion.findUnique({
            where: {
                id: id
            }
        })
        return promotion as Promotion;
    }

    async updatePromotionById(id: number, params: Promotion): Promise<void> {
        await prisma.promotion.update({
            where: {
                id: id
            },
            data: params
        });
    }

    async deletePromotionById(id: number): Promise<void> {
        await prisma.promotion.delete({
            where: {
                id: id
            }
        });
    }

    async deleteAllPromotions(hotelier_id: number): Promise<void> {
        const reservations = await prisma.publishedReservation.findMany({where: {hotelier_id: hotelier_id}});
        for (const reservation of reservations){
            if(reservation.promotion_id){
                await prisma.promotion.deleteMany({
                    where: {
                        id: reservation.promotion_id
                    }
                });
            }
        }
    }
}