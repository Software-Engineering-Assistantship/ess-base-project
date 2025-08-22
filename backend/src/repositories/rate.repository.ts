import{PrismaClient, Client, Reserve, RateReservation, PublishedReservation} from "@prisma/client";
import prisma from "../database";

export default class RateRepository{

    async rateReservation(client_id: number, reservation_id :number, params: Partial<RateReservation>): Promise<void>{
        try {
            const reservation = await prisma.reserve.findUnique({
                where:{
                    id : reservation_id
                }    
            });

            if (!reservation) {
                throw new Error('Reserva não encontrada');
            }
         
            // Teste para ver se já é possível fazer a reserva
            if (params.rating === undefined) {
                throw new Error('Rating is required');
            }

            // Criação de RateReservation com dados combinados corretamente
            await prisma.rateReservation.create({
                data: {
                    client_id,
                    reservation_id,
                    rating: params.rating,
                    comments: params.comments
                }
            });
        } 
        catch (error) {
            throw error;
        }
    }

    async getAllRatesbyPublishedReservation(publishedReservation_id : number): Promise<RateReservation[]>{
        try{
            const rates = await prisma.rateReservation.findMany({
                where: {
                    reserve: {
                        publishedReservationId: publishedReservation_id,
                    },
                },
                include:{
                    reserve: true,
                    client: true
                }
            })

            if (!rates) {
                throw new Error('Nenhuma avaliação na na reserva');
            }
            return rates as RateReservation[];
        }
        catch (error){
            throw error;
        }
    }

    async getAllRatesbyClient(client_id : number): Promise<RateReservation[]>{
        try{
            const rates = await prisma.rateReservation.findMany({
                where:{
                    client_id:client_id,
                    
                },
                include:{
                    reserve: true,
                    client: true
                }
            })

            if (!rates) {
                throw new Error('Nenhuma avaliação feita pelo usuário');
            }
            return rates as RateReservation[];
        }
        catch (error){
            throw error;
        }

    }
    async deleteRateReservation(client_id: number, reservation_id: number): Promise<void> { 
        try {
            await prisma.rateReservation.deleteMany({
                where:{
                    client_id: client_id,
                    reservation_id : reservation_id
                }
            })
        } 
        catch (error) {
            throw error;
        }

    }
    async editRateReservation(client_id: number,reservation_id:number, params: Partial<RateReservation>): Promise<void>{
        try {
            const rate = await prisma.rateReservation.update({
                where: {
                    client_id_reservation_id: {
                        client_id: client_id,
                        reservation_id: reservation_id
                    
                    }
                },
                data: params
            });
        } catch (error) {
            throw error;
        }
    }

}
