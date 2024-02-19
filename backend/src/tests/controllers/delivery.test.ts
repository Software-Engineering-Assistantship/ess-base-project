import { defineFeature, loadFeature } from 'jest-cucumber';
import { Item, PrismaClient } from '@prisma/client';

import database from '../database/connection';
import request from 'supertest';
import app from '../../app'

const feature = loadFeature('../backend/src/tests/features/delivery.feature');
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
        test('Tentativa de criação de um pedido sem nenhum item', ({ given, when, then, and }) => {
            given(/^a API solicita o argumento item como obrigatório para a criação do pedido$/, () => {
            
            });
            when(/^envio uma requisição POST para a rota \/delivery sem nenhum item$/, async () => {
                apiResponse = await request(app).post("/delivery").send({ItemsId: []})
            });
            then(/^o status da resposta deve ser "(.*)"$/, async (status) => {
                expect(apiResponse.status).toBe(Number(status))
            });
            and(/^o corpo da resposta deve conter a mensagem "(.*)"$/, async (message) => {
                expect(apiResponse.body.message).toBe(message)
            });
        });
        test('Criação de um pedido com sucesso', ({ given, when, then, and }) => {
            let item: Item | null
            given(/^a API solicita o argumento item como obrigatório para a criação do pedido$/, () => {
            
            });
            given(/^existe um item com id "(.*)", nome "(.*)", quantidade "(.*)", descrição "(.*)", preço "(.*)", imagem "(.*)", cores "(.*)", tamanhos "(.*)", categoria "(.*)"$/, async (
                id, name, amount, description, price, image, colors, sizes, category  
            ) => {
                const newItem = await prismaTestClient.item.create({
                    data: {id: 32, name, amount: Number(amount), description, price: parseFloat(price), image, colors, sizes, category}
                })
                item = await prismaTestClient.item.findUnique({where: {id: newItem.id}})
                expect(item?.id).toBe(Number(id))
                expect(item?.name).toBe(name)
                expect(item?.amount).toBe(Number(amount))
                expect(item?.description).toBe(description)
                expect(item?.price).toBe(parseFloat(price))
                expect(item?.image).toBe(image)
                expect(item?.colors).toBe(colors)
                expect(item?.sizes).toBe(sizes)
                expect(item?.category).toBe(category)
            });
            when(/^envio uma requisição POST para a rota \/delivery com o item de id "(.*)"$/, async (name) => {
                apiResponse = await request(app).post("/delivery").send({ItemsId: [item?.id!]})
            });
            then(/^o status da resposta deve ser "(.*)"$/, async (status) => {
                expect(apiResponse.status).toBe(Number(status))
            });
            and(/^o corpo da resposta deve conter a mensagem "(.*)"$/, async (message) => {
                expect(apiResponse.body.message).toBe(message)
            });
        });
})