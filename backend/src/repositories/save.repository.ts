import { PrismaClient, Client,PublishedReservation } from "@prisma/client";
import PublishedReservationRepository from "./publishedReservation.repository";
import prisma from "../database";



export default class SaveRepository {

    // savedListId depepnde do cliente

    async saveReservation(client_id: number, reservation_id: number): Promise<{id: number}> {
        try {
            const reservation = await prisma.publishedReservation.findUnique({
                where: {
                    id: reservation_id
                }
            });

            if (!reservation) {
                throw new Error('Reserva não encontrada');
            }

            const client = await prisma.client.findUnique({
                where: {
                    id: client_id
                }
            });

            if (!client) {
                throw new Error('Cliente não encontrado');
            }

            // Adiciona a reserva à lista de reservas salvas
            const result = await prisma.clientSavedReservation.create({
                data: {
                    client_id: client_id,
                    reservation_id: reservation_id
                }
            });

            return { id:result.client_id};
        } 
        catch (error) {
            throw error;
        }
    }


    async getSavedReservationByClientId(client_id: number): Promise<PublishedReservation[]> {
        try {
            const clientReservations = await prisma.clientSavedReservation.findMany({
                where: {
                   client_id: client_id
                },
                include: {
                    reservation: true
                }

            });

            if (!clientReservations) {
                throw new Error('Nenhuma reserva salva');
            }
            let client_reservations: PublishedReservation[] = [];
           
            for (let i = 0; i < clientReservations.length; i++) {
                client_reservations.push(clientReservations[i].reservation);
            }

            return client_reservations as PublishedReservation[];
        } 
        catch (error) {
            throw error;
        }
    }


    async deleteSavedReservationById(client_id: number, reservation_id: number): Promise<void> {
        try {
            await prisma.clientSavedReservation.deleteMany({
                where:{
                    client_id : client_id,
                    reservation_id : reservation_id
                }
            })
        } 
        catch (error) {
            throw error;
        }
    }
}
