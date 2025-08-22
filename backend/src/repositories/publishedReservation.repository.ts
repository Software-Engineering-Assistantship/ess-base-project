import { PublishedReservation} from "../controllers/publishedReservation.controller";
import prisma from "../database";
import { HttpNotFoundError } from "../utils/errors/http.error";
import { IGetReservationsByFilters } from "../controllers/publishedReservation.controller";
import { Reserve } from "../controllers/reservation.controller";

export default class PublishedReservationRepository {
    async updatePromotionIdReservation(reservation_id: number, promotion_id: number | null): Promise<void>{
        const reservation = await prisma.publishedReservation.findUnique( { where: { id: reservation_id }});
        if(!reservation){
            throw new HttpNotFoundError({ msg: 'Reservation not found'} );
        }
        await prisma.publishedReservation.update({ 
            where: {
                id: reservation_id,
            },
            data: {
                promotion_id: promotion_id,
            },
        });
    }

    
    async updatePromotionIdAllReservations(hotelier_id: number, promotion_id: number): Promise<void>{  
        await prisma.publishedReservation.updateMany({ where: {hotelier_id: hotelier_id},
            data: {
                promotion_id: promotion_id,
            },
        });
    }

    async getQuantityOfPromotions(promotion_id: number): Promise<number>{
        const reservation = await prisma.publishedReservation.findMany({ where: {promotion_id: promotion_id}});
        if(reservation){
            return reservation.length;
        }else{
            return 0;
        }
    }

    async promotionInReservation(hotelier_id: number) : Promise <number | null> {
        const reservations = await prisma.publishedReservation.findMany({where: {hotelier_id: hotelier_id}});
        const allNullPromotionIds = reservations.every(reservation => reservation.promotion_id === null);
        
        if (allNullPromotionIds) {
            return null;
        }else{
            return 1;
        }
    }

    async getPromotionIdByReservationId(reservation_id: number): Promise<number | null>{
        const reservation = await prisma.publishedReservation.findUnique({
            where: {
                id: reservation_id,
            },
        });
        if(reservation){
            return reservation.promotion_id;
        }else{
            return null;
        }
    }

    async updatePriceAllReservations(): Promise<void> {
        const reservations = await prisma.publishedReservation.findMany();

        for(const reservation of reservations){
            if(reservation.promotion_id === null){
                await prisma.publishedReservation.update({where: {id: reservation.id}, data: {new_price: reservation.price}})
            }else{
                const promotion = await prisma.promotion.findUnique({where: {id: reservation.promotion_id}}) 
                if(promotion){
                    let price = reservation.price * (1 - (promotion.discount/100));
                
                    await prisma.publishedReservation.update({
                        where: {id: reservation.id},
                        data: {
                            new_price: price,
                        },
                    });
                }
            }
        }
    }

    async getAllPublishedReservations(){
        const publishedReservations = await prisma.publishedReservation.findMany() as PublishedReservation[];
        return publishedReservations;
    }

    async getPublishedReservationById(id: number): Promise<PublishedReservation> {
        const reservation = await prisma.publishedReservation.findUnique({where: {id: id}});
        return reservation as PublishedReservation;
    }

    // async getPublishedReservationWithHotelierById(id: number): Promise<PublishedReservationWHotelier> {
    //     console.log(`Repository called with id: ${id}`);
    //     const reservation = await prisma.publishedReservation.findUnique({
    //         where: { id: id },
    //         include: {
    //             hotelier: true,
    //         },
    //     });
    //     return reservation as PublishedReservation;
    // }

    async insertPublishedReservation(params: PublishedReservation): Promise <number> {
        const result = await prisma.publishedReservation.create({data: params});
        return result.id;
    }

    async updatePublishedReservationById(id:number, params: PublishedReservation): Promise<void> {
        await prisma.publishedReservation.update({where: {id:id}, data: params});
    }

    async deletePublishedReservationById(id:number){
        await prisma.publishedReservation.delete({where:{id:id}});
    }

    async insertImageUrl(reservation_id: number, imageUrl): Promise<void>{
        await prisma.publishedReservation.update({where: {id: reservation_id}, data: {imageUrl: imageUrl}});
    }

    async checkNoReservation(publishedReservationId: number): Promise <Reserve[] | null>{
        const reservations = await prisma.reserve.findMany({where: {publishedReservationId: publishedReservationId}});
        return reservations;
    }

    async checkReservationAlreadyExists(hotelier_id: number, name: string): Promise <PublishedReservation | null>{
        const reservation = await prisma.publishedReservation.findFirst({where: {name: name, hotelier_id: hotelier_id}});
        return reservation;
    }

    async getPublishedReservationsByFilters(params: IGetReservationsByFilters){
        const {num_rooms, num_adults, num_children} = params;
        const reservations = await prisma.publishedReservation.findMany({
            where: {
                people: {
                    gte: (num_adults + (num_children*0.5))
                },
                rooms: {
                    gte: num_rooms
                },
            }
        });

        if (!reservations) {
            throw new Error('Nenhuma reserva encontrada para o per�odo especificado');
        }

        return reservations as PublishedReservation[];
    }
}