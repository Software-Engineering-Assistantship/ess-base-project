
import prisma from "../database";
import { Reserve, PublishedReservation, Client, PaymentMethod} from "../controllers/reservation.controller";
import { HttpNotFoundError } from "../utils/errors/http.error";

export default class ReservationRepository {

    async cancelReservation(id: number): Promise<void> {
        try {
            await prisma.reserve.delete({
                where: {
                    id: id
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async cancelReservationByClient(clientId: number): Promise<void> {
        try {
            await prisma.reserve.deleteMany({
                where: {
                    clientId: clientId
                }
            });
        } catch (error) {
            throw error;
        }
    }
    

    async getPublishedReservationById(publishedReservationId: number): Promise<PublishedReservation>{
        try {
            const publishedReservation = await prisma.publishedReservation.findUnique({
                where: {
                    id: publishedReservationId
                }
            })
            if (!publishedReservation) {
                throw new HttpNotFoundError({msg: 'Oferta de reserva não encontrada'});
            }

            return publishedReservation as PublishedReservation;
        } catch (error) {
            throw error;
        }
    }
    async getClientById(clientId: number): Promise<Client>{
        try {
            const client = await prisma.client.findUnique({
                where: {
                    id: clientId
                }
            })
            if (!client) {
                throw new HttpNotFoundError({msg: 'Faça login ou cadastre-se!'});
            }

            return client as Client;
        } catch (error) {
            throw error;
        }
    }
    async getPaymentMethod(clientId: number): Promise<PaymentMethod[]>{
        try {
            const paymentMethod = await prisma.paymentMethod.findMany({
                where: {
                    clientId: clientId,
                }
            })
            if (!paymentMethod) {
                throw new HttpNotFoundError({msg: 'Cadastre um método de pagamento.'});
            }

            return paymentMethod as PaymentMethod[];
        } catch (error) {
            throw error;
        }
    }
    async getReservationById(id: number): Promise<Reserve>{
        try {
            const reservation = await prisma.reserve.findUnique({
                where: {
                    id: id
                }
            })
            if (!reservation) {
                throw new HttpNotFoundError({msg: 'Reserva não encontrada.'});
            }

            return reservation as Reserve;
        } catch (error) {
            throw error;
        }
    }
    async getReservationsByClient(clientId: number): Promise<Reserve[]> {
        try {
            const reservations = await prisma.reserve.findMany({
                where: {
                    clientId: clientId
                }
            });

            if (!reservations) {
                throw new HttpNotFoundError({msg: 'Você ainda não possui reservas.'});
            }

            return reservations as Reserve[];
        } catch (error) {
            throw error;
        }
    }
    async createReservation(params: Reserve) : Promise<{id: number}>{
        try {
            const result = await prisma.reserve.create({data: params})
            
            return { id: result.id };
        } catch (error) {
            throw error;
        }
    }
    async getReservationsByPeriod(checkin: string, checkout: string, publishedReservationId: number): Promise<Reserve[]> {
        try {
            const reservations = await prisma.reserve.findMany({
                where: {
                    publishedReservationId: publishedReservationId,
                    checkin: {
                        lte: checkout // Check-in antes ou no dia do check-out desejado
                    },
                    checkout: {
                        gte: checkin // Check-out depois ou no dia do check-in desejado
                    }
                }
            });

            if (!reservations) {
                throw new HttpNotFoundError({msg: 'Nenhuma reserva encontrada para o período especificado.'});
            }

            return reservations as Reserve[];
        } catch (error) {
            throw error;
        }
    }
    async getReservationsByPeriodAndId(id: number, checkin: string, checkout: string, publishedReservationId: number): Promise<Reserve[]> {
        try {
            const reservations = await prisma.reserve.findMany({
                where: {
                    publishedReservationId: publishedReservationId,
                    checkin: {
                        lte: checkout // Check-in antes ou no dia do check-out desejado
                    },
                    checkout: {
                        gte: checkin // Check-out depois ou no dia do check-in desejado
                    },
                    id: {
                        not: id
                    }
                }
            });

            if (!reservations) {
                throw new HttpNotFoundError({msg: 'Nenhuma reserva encontrada para o período especificado.'});
            }

            return reservations as Reserve[];
        } catch (error) {
            throw error;
        }
    }
    async updateReservation(id: number, params: Partial<Reserve>): Promise<void> {
        try {
            await prisma.reserve.update({
                where: {
                    id: id
                },
                data: params
            });
        } catch (error) {
            throw error;
        }
    }
}

