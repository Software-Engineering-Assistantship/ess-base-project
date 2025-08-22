import { loadFeature, defineFeature, DefineStepFunction } from "jest-cucumber";
import supertest from "supertest";
import app from "../../src/app";
import { Hotelier, PrismaClient, Promotion, PromotionType, PublishedReservation } from "@prisma/client";
import {prismaMock} from "../../setupTests";
import SetupDatabaseTest from "../../src/database/setupDatabaseTest";

const feature = loadFeature('tests/features/promotions.feature');
const request = supertest(app);

const createHotelier = async (hotel: string, email: string, password: string) => {
    return {
        id: 1,
        name: 'Maria Letícia',
        email: email,
        username: 'mlng',
        password: password,
        hotel: hotel,
        city: 'Paulista',
        cep: '2621721',
        address: 'Rua vale',
        n_address: '123',
        UF: 'PE',
        cnpj: '123.456.789-01',
    }
}

defineFeature(feature, (test) => {
    let response: supertest.Response;
    let promotions: Promotion[] = [];
    let publishedReservation: PublishedReservation[] = []
    let hoteliers: Hotelier[] = []

    const setupDBTest = new SetupDatabaseTest();
    //setupDBTest.resetDatabase();
    
    const createPublishedReservation = async (name: string, price: number) => {
        return {
            id: publishedReservation.length + 1,
            name: name,
            rooms: 3,
            people: 3,
            wifi: true,
            breakfast: true,
            airConditioner: true,
            parking: true,
            room_service: true, 
            price: price,
            new_price: price,
            promotion_id: null,
            hotelier_id: 1,
            imageUrl: null
        }
    }

    const createPublishedReservationWithPromotion = async (name: string, price: number, promotion_id: number) => {
        return {
            id: publishedReservation.length + 1,
            name: name,
            rooms: 3,
            people: 3,
            wifi: true,
            breakfast: true,
            airConditioner: true,
            parking: true,
            room_service: true, 
            price: price,
            new_price: price,
            promotion_id: promotion_id,
            hotelier_id: 1,
            imageUrl: null,
        }
    }

    const createPromotion = async (discount: number) => {
        return {
            id: promotions.length + 1,
            discount: discount,
            type: PromotionType.LIMITE_QUARTO,
            num_rooms: 3,
        }
    }

    beforeEach(async () => {
      await setupDBTest.resetDatabase();
   });

    afterEach(async () => {
        promotions = [];
        publishedReservation = [];
        hoteliers = [];
        await setupDBTest.resetDatabase();
    });

    const givenHotelierExist = (given: DefineStepFunction) => 
        given(/^existe um usuário "(.*)" do hotel "(.*)" logado com o username "(.*)" e a senha "(.*)"$/, async(user, hotel, email, password) => {
            expect(user).toBe('Hoteleiro');
            const hotelier = await createHotelier(hotel, email, password);
            hoteliers.push(hotelier);
            prismaMock.hotelier.findUnique.mockResolvedValue(hotelier);
        });

    const givenReservationExist = (given: DefineStepFunction) =>
        given (/^o quarto "(.*)" está nas reservas publicadas com o valor de "R\$ (.*)" a diária$/, async(room, price) => {
            const reservation = await createPublishedReservation(room, parseFloat(price));
            publishedReservation.push(reservation);
            prismaMock.publishedReservation.findUnique.mockResolvedValue(publishedReservation[0]);
        })
    
    const whenLimitRoomPromotionPost = (when: DefineStepFunction) => // rever
        when (/^uma requisição POST é enviada para "(.*)" com o desconto de "(.*)%", promoção "(.*)" e quantidade de quartos "(.*)"$/, async(url, discount, type, num_rooms) => {
            const new_url = `/reservation/${publishedReservation[0].id}/promotions`;
            await setupDBTest.setupDatabaseforPromotionTests(hoteliers[0], publishedReservation);
            response = await request.post(new_url).send({ discount: parseInt(discount, 10), type, num_rooms: parseInt(num_rooms, 10)});
        });

    const thenStatusIsReturned = (then: DefineStepFunction) =>
        then(/^o status da resposta deve ser "(.*)"$/, async(status) => {
            expect(response.status).toBe(parseInt(status, 10));
        })

    const thenReturnedMessage = (then: DefineStepFunction) => 
        then(/^é retornada a mensagem "(.*)"$/, async(message) => {
            expect(response.body.message).toEqual(message);
        })

    const whenLimitRoomPromotionPostWithoutRoom = (when: DefineStepFunction) => // rever
        when (/^uma requisição POST é enviada para "(.*)" com desconto de "(.*)%" e promoção "(.*)"$/, async(url, discount, type) => {
            const new_url = `/reservation/${publishedReservation[0].id}/promotions`;
            await setupDBTest.setupDatabaseforPromotionTests(hoteliers[0], publishedReservation);
            response = await request.post(new_url).send({discount: parseInt(discount, 10), type});
        });
    
    const givenPublishedPromotion = (given: DefineStepFunction) =>
        given(/^o quarto "(.*)" tem uma promoção de "(.*)%" cadastrada com o valor promocional de "R\$ (.*)" a diária$/, async (room, discount, price) => {
            const promotion = await createPromotion(parseInt(discount, 10));
            promotions.push(promotion);
            const reservation = await createPublishedReservationWithPromotion(room, parseFloat(price), promotion.id);
            publishedReservation.push(reservation);
        })
    
    const givenNoPromotionReservation = (given: DefineStepFunction) =>
        given(/^o quarto "(.*)" não possui nenhuma promoção cadastrada e seu valor original é "R\$ (.*)" a diária$/, async (room, price) => {
            const reservation = await createPublishedReservation(room, parseFloat(price));
            publishedReservation.push(reservation);
        })
    
    const whenPromotionDelete = (when: DefineStepFunction) =>
        when(/^uma requisição DELETE é enviada para "(.*)"$/, async(url) => {
            prismaMock.promotion.findMany.mockResolvedValue(promotions);
            prismaMock.publishedReservation.findMany.mockResolvedValue(publishedReservation);
            await setupDBTest.setupDatabaseforPromotionTests(hoteliers[0], publishedReservation, promotions);
            response = await request.delete(url);
        })

    const whenPromotionDeleteAll = (when: DefineStepFunction) =>
        when(/^uma requisição DELETE é enviada para "(.*)"$/, async(url) => {
            prismaMock.promotion.findMany.mockResolvedValue(promotions);
            prismaMock.publishedReservation.findMany.mockResolvedValue(publishedReservation);
            const new_url = `/hotelier/${hoteliers[0].id}/reservation/promotions`
            await setupDBTest.setupDatabaseforPromotionTests(hoteliers[0], publishedReservation, promotions);
            response = await request.delete(new_url);
        })

    const whenUnlimitedPromotionPostAllReservations = (when: DefineStepFunction) => // rever
        when (/^uma requisição POST é enviada para "(.*)" com o desconto de "(.*)%" e promoção "(.*)"$/, async(url, discount, type) => {
            prismaMock.promotion.findMany.mockResolvedValue(promotions);
            prismaMock.publishedReservation.findMany.mockResolvedValue(publishedReservation);
            const new_url = `/hotelier/${hoteliers[0].id}/reservation/promotions`
            await setupDBTest.setupDatabaseforPromotionTests(hoteliers[0], publishedReservation);
            response = await request.post(new_url).send({discount: parseInt(discount, 10), type});
        });

    const givenPublishedReservation = (given: DefineStepFunction) =>
        given(/^o quarto "(.*)" está nas reservas publicadas com o valor de "R\$ (.*)" a diária$/, async (room, price) => {
            const reservation = await createPublishedReservation(room, parseFloat(price));
            publishedReservation.push(reservation);
        })

    const whenPromotionPut = (when: DefineStepFunction) => 
        when (/^uma requisição PUT é enviada para "(.*)" com desconto de "(.*)%" e promoção "(.*)"$/, async(url, discount, type) => {
            const new_url = `/reservation/${publishedReservation[0].id}/promotions`
            prismaMock.promotion.findUnique.mockResolvedValue(promotions[0]);
            prismaMock.publishedReservation.findUnique.mockResolvedValue(publishedReservation[0]);
            await setupDBTest.setupDatabaseforPromotionTests(hoteliers[0], publishedReservation, promotions);
            response = await request.put(new_url).send({discount: parseInt(discount, 10), type});
        });

    const givenNoPromotion = (given: DefineStepFunction) =>
        given(/^não há nenhum quarto com promoção cadastrada$/, async () => {
            prismaMock.promotion.findUnique.mockResolvedValue(null);
            const reservation1 = await createPublishedReservation("Flores", 1400.00);
            publishedReservation.push(reservation1);
            const reservation2 = await createPublishedReservation("Jardins", 1500.00);
            publishedReservation.push(reservation2);
        })
    
    test('Cadastro da promoção realizado com sucesso', ({ given, when, then, and }) => {
        givenHotelierExist(given);
        givenReservationExist(and);
        whenLimitRoomPromotionPost(when);
        thenStatusIsReturned(then);
        thenReturnedMessage(and);
    });

    test('Tentativa de cadastro da promoção com algum campo não preenchido', ({ given, when, then, and }) => {
        givenHotelierExist(given);
        givenReservationExist(and);
        whenLimitRoomPromotionPostWithoutRoom(when);
        thenStatusIsReturned(then);
        thenReturnedMessage(and);
    });

    test('Deletar a promoção da reserva', ({ given, when, then, and }) => {
        givenHotelierExist(given);
        givenPublishedPromotion(and);
        whenPromotionDelete(when);
        thenStatusIsReturned(then);
        thenReturnedMessage(and);
    });

    test('Edição na promoção de uma reserva', ({ given, when, then, and }) => {
        givenHotelierExist(given);
        givenPublishedPromotion(and);
        whenPromotionPut(when);
        thenStatusIsReturned(then);
        thenReturnedMessage(and);
    });

    test('Deletar todas as promoções', ({ given, when, then, and }) => {
        givenHotelierExist(given);
        givenPublishedPromotion(and);
        givenPublishedPromotion(and);
        givenNoPromotionReservation(and);
        whenPromotionDeleteAll(when);
        thenStatusIsReturned(then);
        thenReturnedMessage(and);
    });

    test('Cadastrar uma promoção em todas as reservas publicadas', ({ given, when, then, and }) => {
        givenHotelierExist(given);
        givenPublishedReservation(and);
        givenPublishedReservation(and);
        givenPublishedReservation(and);
        whenUnlimitedPromotionPostAllReservations(when);
        thenStatusIsReturned(then);
        thenReturnedMessage(and);
    });

    test('Deletar todas as promoções com nenhuma promoção cadastrada', ({ given, when, then, and }) => {
        givenHotelierExist(given);
        givenNoPromotion(and);
        whenPromotionDeleteAll(when);
        thenStatusIsReturned(then);
        thenReturnedMessage(and);
    });


})