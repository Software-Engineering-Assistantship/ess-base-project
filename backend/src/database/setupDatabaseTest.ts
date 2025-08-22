import { Prisma } from "@prisma/client";
import { Hotelier, PublishedReservation, Client, Reserve, PaymentMethod } from "../controllers/reservation.controller";
import prisma from ".";

export default class SetupDatabaseTest{

    

    async resetDatabase(){
        await prisma.rateReservation.deleteMany();
        await prisma.clientSavedReservation.deleteMany();
        await prisma.promotion.deleteMany();
        await prisma.reserve.deleteMany();
        await prisma.publishedReservation.deleteMany();
        await prisma.hotelier.deleteMany();
        await prisma.paymentMethod.deleteMany();
        await prisma.client.deleteMany();
    }

    async setupDatabaseforPromotionTests(hotelier: Prisma.HotelierCreateInput, publishedReservation: Prisma.PublishedReservationCreateInput[], promotion?: Prisma.PromotionCreateInput[]){
        await prisma.hotelier.create({data: hotelier});
        if(promotion){
            for(let i = 0; i<promotion.length; i++){
                await prisma.promotion.create({data: promotion[i]});
            }
        }
        for(let i = 0; i<publishedReservation.length; i++){
            await prisma.publishedReservation.create({data: publishedReservation[i]});
        }
    }

    async setupDatabaseforEmailTests(client: Prisma.ClientCreateInput, hotelier: Prisma.HotelierCreateInput, publishedReservation: Prisma.PublishedReservationCreateInput, paymentMethod: Prisma.PaymentMethodCreateInput, reservation?: Prisma.ReserveCreateInput){
        await prisma.client.create({data: client});
        await prisma.hotelier.create({data: hotelier});
        await prisma.publishedReservation.create({data: publishedReservation});
        await prisma.paymentMethod.create({data: paymentMethod});
        if(reservation){
            await prisma.reserve.create({data: reservation});
        }
    }

    async setupDatabaseforReservationTests(client: Prisma.ClientCreateInput, hotelier: Prisma.HotelierCreateInput, publishedReservation: Prisma.PublishedReservationCreateInput, paymentMethod?: Prisma.PaymentMethodCreateInput, reservation?: Prisma.ReserveCreateInput){
        await prisma.client.create({data: client});
        await prisma.hotelier.create({data: hotelier});
        await prisma.publishedReservation.create({data: publishedReservation});
        if(paymentMethod){
            await prisma.paymentMethod.create({data: paymentMethod});
        }
        if(reservation){
            await prisma.reserve.create({data: reservation});
        }
    }

    async setupDatabaseForBuscaTests(publishedReservation: Prisma.PublishedReservationCreateInput, reservation: Prisma.ReserveCreateInput, hotelier: Prisma.HotelierCreateInput, promotion: Prisma.PromotionCreateInput, client: Prisma.ClientCreateInput, paymentMethod: Prisma.PaymentMethodCreateInput){
        let cliente = await prisma.client.create({data: client});
        let hoteleiro = await prisma.hotelier.create({data: hotelier});
        let promocao = await prisma.promotion.create({data: promotion});



        let promocoes = await prisma.promotion.findMany();
        if(promocoes.length == 0){
            promocao = await prisma.promotion.create({data: promotion});
        }

        
        publishedReservation['hotelier_id'] = hoteleiro.id;
        publishedReservation['promotion_id'] = promocao.id;
        let pub = await prisma.publishedReservation.create({data: publishedReservation});

                
        let pubs = await prisma.publishedReservation.findMany();
        if(pubs.length == 0){
            publishedReservation['hotelier_id'] = hoteleiro.id;
            publishedReservation['promotion_id'] = promocao.id;
            pub = await prisma.publishedReservation.create({data: publishedReservation});
        }

        // console.log(pubs)
        
        
        let clientes = await prisma.client.findMany();
        if(clientes.length == 0){
            cliente = await prisma.client.create({data: client});
        }

        paymentMethod['clientId'] = cliente.id;

        let pay = await prisma.paymentMethod.create({data: paymentMethod})
        
        reservation['publishedReservationId'] = pub.id;
        reservation['clientId'] = cliente.id;
        reservation['paymentMethodId'] = pay.id;
        await prisma.reserve.create({data: reservation});
    }

    async setupDataBaseForPayMethodsTest(client : Prisma.ClientCreateInput, payMethod? : Prisma.PaymentMethodCreateInput){
        await prisma.client.create({data: client});
        if(payMethod){
            await prisma.paymentMethod.create({data: payMethod});
        }
    }
}
