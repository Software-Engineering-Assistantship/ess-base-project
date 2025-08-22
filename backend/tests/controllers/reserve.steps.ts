import { loadFeature, defineFeature, DefineStepFunction } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import {Reserve, PublishedReservation, PaymentMethod, CardType, Client} from '@prisma/client';
import prisma from '../../src/database';
import { prismaMock } from "../../setupTests";
import SetupDatabaseTest from "../../src/database/setupDatabaseTest";

const feature = loadFeature('tests/features/reserve.feature');

const request = supertest(app);

const createClient = async (email: string, password: string) => {
    return{
        id: 1,
        name: 'Victoria Cesar',
        email: email, 
        username: 'viccesar', 
        phone: '81998713499',
        password: password,
        cpf: '70558989438',
        birthDate: '2003-04-24',
    }
}

const createHotelier = {    
    id: 1,
    name: 'Maria Letícia',
    email: 'mleticiagaspar17@gmail.com',
    username: 'let',
    password: 'let123',
    hotel: 'polengrito',
    city: 'Paulista',
    cep: '2621721',
    address: 'Rua vale',
    n_address: '123',
    UF: 'PE',
    cnpj: '123.456.789-01',   
}

const createPublishedReservation = async (name: string, rooms: number, people: number, price: number) => {
    return {
        id: 1,
        name: name,
        rooms: rooms,
        people: people,
        wifi: true,
        breakfast: true,
        airConditioner: true,
        parking: true,
        room_service: true, 
        price: price,
        new_price: 1000,
        promotion_id: null,
        hotelier_id: 1,
        imageUrl: null
    }
}

const createPaymentMethod = async(name: string, clientId: number) => {
    return{
        id: 1,
        name: "Victoria C Figueiredo",
        numCard: name,
        cvv: 300,
        expiryDate: "09/28",
        type: CardType.CREDITO,
        clientId: clientId,
        cpf: '70558989438'
    }
}

defineFeature(feature, (test) => {
    let response: supertest.Response;
    let reservations: Reserve[] = [];
    let clients: Client[] = []; 
    let payments: PaymentMethod[] = [];
    let publishedReservations: PublishedReservation[] = [];
    const setupDBTest = new SetupDatabaseTest();
    //setupDBTest.resetDatabase();

    const createReservation = async (num_rooms: number, checkin: string, checkout: string, num_adults: number, num_children: number, paymentMethodName: string) => {
        return {
            id: reservations.length + 1,
            num_rooms: num_rooms,
            checkin: checkin,
            checkout: checkout,
            num_adults: num_adults,
            num_children: num_children,
            paymentMethodName: paymentMethodName,
            price: 2000,
            publishedReservationId: 1,
            clientId: 1,
            paymentMethodId: 1
        }
    }
    
    beforeEach(async () => {
      await setupDBTest.resetDatabase();
   });
   
    afterEach(async () => {
        clients = [],
        payments = [],
        publishedReservations = [],
        reservations = [],
        await setupDBTest.resetDatabase();
    });

    const givenClientExist = (given: DefineStepFunction) =>
        given(/^existe um usuário "(.*)" com o e-mail "(.*)" e a senha "(.*)"$/, async(user, email, password) => {
            expect(user).toBe('Cliente');
            const cliente = await createClient(email, password);
            clients.push(cliente);
            prismaMock.client.findUnique.mockResolvedValue(cliente);
        });

    const givenPaymentMethodExist = (given: DefineStepFunction) => 
        given(/^um método de pagamento com id "(.*)" e com nome "(.*)" está registrado nos métodos de pagamentos do usuário de id "(.*)"$/, async(id, name, clientId) => {
            expect(id).toBe("1");
            const paymentMethod = await createPaymentMethod(name, parseInt(clientId, 10));
            payments.push(paymentMethod);
            prismaMock.paymentMethod.findUnique.mockResolvedValue(paymentMethod);
        });

    const givenPage = (given: DefineStepFunction) =>
        given (/^está na página "(.*)"$/, async(page) => {
            expect(page).toBe('Quarto Zumbi Digital');
        });

    const givenMyPage = (given: DefineStepFunction) =>
        given (/^está na página "(.*)"$/, async(page) => {
            expect(page).toBe('Minhas reservas');
        });

    const givenPublishedReservationExist = (given: DefineStepFunction) => 
        given(/^existe a oferta com nome "(.*)" com id "(.*)", com quartos "(.*)", pessoas "(.*)" e preço "(.*)"$/, async(name, id, rooms, people, price) => {
            expect(id).toBe("1");
            const publishedReservation = await createPublishedReservation(name, parseInt(rooms, 10), parseInt(people, 10), parseFloat(price));
            publishedReservations.push(publishedReservation);
            prismaMock.publishedReservation.findUnique.mockResolvedValue(publishedReservation);
        });

    const givenReservationExist = (given: DefineStepFunction) => 
        given(/^existe a reserva com id "(.*)", com quartos "(.*)", checkin "(.*)", checkout "(.*)", adultos "(.*)", crianças "(.*)", pagamento "(.*)", preço "(.*)", id da reserva "(.*)", id do cliente "(.*)" e id do pagamento "(.*)"$/, async(id, num_rooms, checkin, checkout, num_adults, num_children, paymentMethodName, publishedReservationId, clientId, paymentMethodId) => {
            expect(id).toBe("1");
            const reservation = await createReservation(parseInt(num_rooms), checkin, checkout, parseInt(num_adults), parseInt(num_children), paymentMethodName);
            reservations.push(reservation);
            prismaMock.reserve.findUnique.mockResolvedValue(reservation);
        });

    const whenReservationPost = (when: DefineStepFunction) => 
        when (/^uma requisição POST é enviada para "(.*)" com quartos "(.*)", checkin "(.*)", checkout "(.*)", adultos "(.*)", crianças "(.*)" e pagamento "(.*)"$/, async(url, num_rooms, checkin, checkout, num_adults, num_children, paymentMethodName) => {
            await setupDBTest.setupDatabaseforReservationTests(clients[0], createHotelier, publishedReservations[0], payments[0]);
            response = await request.post(url).send({
                num_rooms: parseInt(num_rooms,10), 
                checkin, 
                checkout, 
                num_adults: parseInt(num_adults,10), 
                num_children: parseInt(num_children,10), 
                paymentMethodName
            });
        });

    const whenReservationPostWithoutPayment = (when: DefineStepFunction) => 
        when (/^uma requisição POST é enviada para "(.*)" com quartos "(.*)", checkin "(.*)", checkout "(.*)", adultos "(.*)", crianças "(.*)" e pagamento "(.*)"$/, async(url, num_rooms, checkin, checkout, num_adults, num_children, paymentMethodName) => {
            await setupDBTest.setupDatabaseforReservationTests(clients[0], createHotelier, publishedReservations[0]);
            response = await request.post(url).send({
                num_rooms: parseInt(num_rooms,10), 
                checkin, 
                checkout, 
                num_adults: parseInt(num_adults,10), 
                num_children: parseInt(num_children,10), 
                paymentMethodName
            });
        });

    const whenReservationPut = (when: DefineStepFunction) => 
        when(/^uma requisição PUT é enviada para "(.*)" com quartos "(.*)", checkin "(.*)", checkout "(.*)", adultos "(.*)", crianças "(.*)" e pagamento "(.*)"$/, async(url, num_rooms, checkin, checkout, num_adults, num_children, paymentMethodName) => {
            prismaMock.reserve.findUnique.mockResolvedValue(reservations[0]);
            const requestData = {
                num_rooms: parseInt(num_rooms, 10), 
                checkin, 
                checkout, 
                num_adults: parseInt(num_adults, 10), 
                num_children: parseInt(num_children, 10), 
                paymentMethodName
            };
            await setupDBTest.setupDatabaseforReservationTests(clients[0], createHotelier, publishedReservations[0], payments[0], reservations[0]);
            response = await request.put(url).send(requestData);
        });

    const whenReservationDelete = (when: DefineStepFunction) => 
        when(/^uma requisição DELETE é enviada para "(.*)"$/, async(url) => {
            prismaMock.reserve.findUnique.mockResolvedValue(reservations[0]);
            await setupDBTest.setupDatabaseforReservationTests(clients[0], createHotelier, publishedReservations[0], payments[0], reservations[0]);
            response = await request.delete(url);
        });
    
    const thenStatusIsReturned = (then: DefineStepFunction) =>
        then(/^o status da resposta deve ser "(.*)"$/, async(status) => {
            expect(response.status).toBe(parseInt(status, 10));
        });
    
    const thenReturnedMessage = (then: DefineStepFunction) => 
        then(/^é retornada a mensagem "(.*)"$/, async(message) => {
            expect(response.body.message).toEqual(message);
        });

    test('Reserva realizada com sucesso', ({ given, when, then, and }) =>{
        givenClientExist(given);
        givenPaymentMethodExist(and);
        givenPage(and);
        givenPublishedReservationExist(and);
        whenReservationPost(when);
        thenStatusIsReturned(then);
        thenReturnedMessage(and);
    });

    test('Realização de reserva mal sucedida (Campos obrigatórios não preenchidos)', ({ given, when, then, and }) => {
        givenClientExist(given);
        givenPaymentMethodExist(and);
        givenPage(and);
        givenPublishedReservationExist(and);
        whenReservationPost(when);
        thenStatusIsReturned(then);
        thenReturnedMessage(and);
    });

    test('Realização de reserva mal sucedida (Cliente não existe - não está logado)', ({ given, when, then, and }) => {
        givenClientExist(given);
        givenPage(and);
        givenPublishedReservationExist(and);
        whenReservationPostWithoutPayment(when);
        thenStatusIsReturned(then);
        thenReturnedMessage(and);
    });

    test('Realização de reserva mal sucedida (Pagamento não existe)', ({ given, when, then, and }) => {
        givenClientExist(given);
        givenPage(and);
        givenPublishedReservationExist(and);
        whenReservationPostWithoutPayment(when);
        thenStatusIsReturned(then);
        thenReturnedMessage(and);
    });
 
    test('Realização de reserva mal sucedida (Capacidade do quarto excedida)', ({ given, when, then, and }) => {
        givenClientExist(given);
        givenPaymentMethodExist(and);
        givenPage(and);
        givenPublishedReservationExist(and);
        whenReservationPost(when);
        thenStatusIsReturned(then);
        thenReturnedMessage(and);
    });
   
    test('Realização de reserva mal sucedida (Todos os quartos ocupados no período selecionado)', ({ given, when, then, and }) => {
        givenClientExist(given);
        givenPaymentMethodExist(and);
        givenPage(and);
        givenPublishedReservationExist(and);
        whenReservationPost(when);
        thenStatusIsReturned(then);
        thenReturnedMessage(and);
    });
 
    test('Reserva atualizada com sucesso', ({ given, when, then, and }) => {
        givenClientExist(given);
        givenPaymentMethodExist(and);
        givenMyPage(and);
        givenPublishedReservationExist(and);
        givenReservationExist(and);
        whenReservationPut(when);
        thenStatusIsReturned(then);
        thenReturnedMessage(and);
    });

    test('Atualização de reserva mal-sucedida (Campos obrigatórios não preenchidos)', ({ given, when, then, and }) =>{
        givenClientExist(given);
        givenPaymentMethodExist(and);
        givenMyPage(and);
        givenPublishedReservationExist(and);
        givenReservationExist(and);
        whenReservationPut(when);
        thenStatusIsReturned(then);
        thenReturnedMessage(then);
    });

    test('Atualização de reserva mal-sucedida (Indisponibilidade de quartos)', ({ given, when, then, and }) => {
        givenClientExist(given);
        givenPaymentMethodExist(and);
        givenMyPage(and);
        givenReservationExist(and);
        givenPublishedReservationExist(and);
        whenReservationPut(when);
        thenStatusIsReturned(then);
        thenReturnedMessage(then);      
    });

    test('Reserva cancelada com sucesso', ({ given, when, then, and }) => {
        givenClientExist(given);
        givenPaymentMethodExist(and);
        givenMyPage(and);
        givenPublishedReservationExist(and);
        givenReservationExist(and);
        whenReservationDelete(when);
        thenStatusIsReturned(then);
        thenReturnedMessage(then);  
    });
   
 })
