import { defineFeature, loadFeature } from 'jest-cucumber';
import { Item, PrismaClient } from '@prisma/client';

import database from '../database/connection';
import request from 'supertest';
import app from '../../app'

const feature = loadFeature('../backend/src/tests/features/rating.feature');
const prismaTestClient = new PrismaClient();
let apiResponse: request.Response;

defineFeature(feature, test => {

    beforeAll(async () => {
      await database.clearValues();
      await database.connect();
    });
    afterAll(async () => {
        await database.clearValues();
        await database.disconnect();
      });
    beforeEach(async () => {
        await database.clearValues();
      });
        test('Tentativa de criação de uma avaliação sem o campo rating', ({ given, when, then, and }) => {
            given(/^a API solicita o argumento rating como obrigatório para a criação da avaliação$/, () => {
            
            });
            when(/^envio uma requisição POST para a rota \/rating sem o campo rating$/, async () => {
                apiResponse = await request(app).post("/rating").send({})
            });
            then(/^o status da resposta deve ser "(.*)"$/, async (status) => {
                expect(apiResponse.status).toBe(Number(status))
            });
            and(/^o corpo da resposta deve conter a mensagem "(.*)"$/, async (message) => {
                expect(apiResponse.body.message).toBe(message)
            });
        });
        test('Tentativa de criação de uma avaliação com o status da entrega pendente', ({ given, when, then, and }) => {
            let newItem: Item
            given(/^a API exige que o status do delivery indicado pelo campo deliveryId seja "entregue" como obrigatório para a criação da avaliação$/, () => {
                
            });
            when(/^envio uma requisição POST para a rota \/rating com o rating "(.*)" e o delivery de id igual ao deliveryId tem o status "(.*)"$/, async (status) => {
                newItem = await prismaTestClient.item.create({
                    data: {id: 32, name: "Blusa azul", amount: 5, description: "Bela blusa", price: 60.00, image: "link.com", colors: "Azul", sizes: "P, M, G", category: "Blusa"}
                })
                const newDelivery = await prismaTestClient.delivery.create({
                    data: {item: {connect: {id: newItem.id}}}
                })
                apiResponse = await request(app).post("/rating").send({ rating: 5, deliveryId: newDelivery.id })
                status = newDelivery.status
            });
            then(/^o status da resposta deve ser "(.*)"$/, async (status) => {
                expect(apiResponse.status).toBe(Number(status))
            });
            and(/^o corpo da resposta deve conter a mensagem "(.*)"$/, async (message) => {
                expect(apiResponse.body.message).toBe(message)
            });
        });
        test('Criação de uma avaliação com sucesso', ({ given, when, then, and }) => {
            let newItem: Item
            given(/^a API solicita o argumento rating e o status do delivery indicado pelo campo deliveryId "entregue" como obrigatório para a criação da avaliação$/, () => {
            
            });
            when(/^envio uma requisição POST para a rota \/rating com o rating "(.*)" e o delivery de id igual ao deliveryId tem o status "(.*)"$/, async (rating, status) => {
                newItem = await prismaTestClient.item.create({
                    data: {id: 32, name: "Blusa azul", amount: 5, description: "Bela blusa", price: 60.00, image: "link.com", colors: "Azul", sizes: "P, M, G", category: "Blusa"}
                })
                const newDelivery = await prismaTestClient.delivery.create({
                    data: {item: {connect: {id: newItem.id}}, status}
                })
                apiResponse = await request(app).post("/rating").send({rating: Number(rating), itemId: newItem.id, deliveryId: newDelivery.id})
            });
            then(/^o status da resposta deve ser "(.*)"$/, async (status) => {
                expect(apiResponse.status).toBe(Number(status))
            });
            and(/^o corpo da resposta deve conter a mensagem "(.*)"$/, async (message) => {
                expect(apiResponse.body.message).toBe(message)
            });
        });
})