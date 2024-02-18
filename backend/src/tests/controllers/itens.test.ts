import { defineFeature, loadFeature } from 'jest-cucumber';
import { PrismaClient } from '@prisma/client';

import database from '../database/connection';
import request from 'supertest';
import app from '../../app';

const feature = loadFeature('../backend/src/tests/features/itens-cadastro.feature');
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
    test('Criar Item', ({ given, when, then }) => {
        given(/^a API solicita os argumentos nome, quantidade, descrição, preço, imagem, cores, tamanhos, categoria como obrigatórios para a criação do item$/, () => {

        });

        when(/^envio uma requisição POST para a rota \/itens com nome "(.*)", quantidade "(.*)", descrição "(.*)", preço "(.*)", imagem "(.*)", cores "(.*)", tamanhos "(.*)", categoria "(.*)"$/, async (
            name, amount, description, price, image, colors, sizes, category
        ) => {
            const parsedAmount = parseInt(amount, 10);
            const parsedPrice = parseFloat(price);
            apiResponse = await request(app)
            .post('/itens')
            .send({
                name,
                amount: parsedAmount,
                description,
                price: parsedPrice,
                image,
                colors,
                sizes,
                category
            });
        });

        then(/^o status da resposta deve ser (\d+)$/, async (status) => {
            expect(apiResponse.status).toBe(Number(status));
        });
    });
    test('Atualizar item', ({ given, when, then, and }) => {
        given(/^a API solicita os argumentos nome, quantidade, descrição, preço, imagem, cores, tamanhos, categoria como opcionais para a atualização do item$/, () => {
        });
        
        when(/^Eu envio uma requisição PATCH para a rota \/itens\/1 com quantidade "(.*)"$/, async (amount) => {
            const parsedAmount = parseInt(amount, 10);
            apiResponse = await request(app)
            .patch('/itens/1')
            .send({
                amount: parsedAmount
            });
        });
        
        then(/^o status da resposta deve ser (\d+)$/, async (status) => {
            expect(apiResponse.status).toBe(Number(status));
        });
        
        and(/^o item deve ter sido atualizado$/, async () => {
            const item = await prismaTestClient.item.findFirst({
            where: {
                id: Number(1),
            }
            });
        
            expect(item).toHaveProperty('amount', 10);
        });
    });
    test('Listar Itens', ({ given, when, then, and }) => {
        given(/^Eu tenho um item com id "(.*)" cadastrado$/, async (id) => {
            const item = await prismaTestClient.item.findFirst({
            where: {
                id: Number(id),
            }
            });
        
            expect(item).toHaveProperty('id', Number(id));
        });
        
        when(/^Eu envio uma requisição GET para a rota \/itens$/, async () => {
            apiResponse = await request(app)
            .get('/itens');
        });
        
        then(/^o status da resposta deve ser (\d+)$/, async (status) => {
            expect(apiResponse.status).toBe(Number(status));
        });
        
        and(/^o corpo da resposta deve conter o item com id "(.*)"$/, async (expectedId) => {
            const expectedObject = { id: Number(expectedId) };
            const responseBody = apiResponse.body;
        
            expect(responseBody.data).toBeDefined();
        
            const itemWithId = responseBody.data.find((item: any) => item.id === expectedObject.id);
            expect(itemWithId).toBeDefined();
        });
        
        
    });
    test('Tentar adicionar um item ao menu geral sem informar todos os campos obrigatórios no banco de dados', ({ given, when, then, and }) => {
        given(/^a API solicita os argumentos nome, quantidade, descrição, preço, imagem, cores, tamanhos, categoria como obrigatórios para a criação do item$/, () => {
        });
        
        when(/^envio uma requisição POST para a rota \/itens com nome "(.*)", quantidade "(.*)", descrição "(.*)" e imagem "(.*)"$/, async (name, amount, description, image) => {
            const parsedAmount = parseInt(amount, 10);
            apiResponse = await request(app)
            .post('/itens')
            .send({
                name,
                amount: parsedAmount,
                description,
                image
            });
        });
        
        then(/^o status da resposta deve ser (\d+)$/, async (status) => {
            expect(apiResponse.status).toBe(Number(status));
        });
        
        and(/^o corpo da resposta deve conter a mensagem "(.*)"$/, async (message) => {
            expect(apiResponse.body).toHaveProperty('message', message);
        });
    });
    test('Remover Item', ({ given, when, then, and }) => {
        given(/^Eu tenho um item com id "(.*)" cadastrado$/, async (id) => {
            const item = await prismaTestClient.item.findFirst({
            where: {
                id: Number(id),
            }
            });
        
            expect(item).toHaveProperty('id', Number(id));
        });
        
        when(/^Eu envio uma requisição DELETE para a rota \/itens\/(.*)$/, async (id) => {
            apiResponse = await request(app)
            .delete(`/itens/${id}`);
        });
        
        then(/^o status da resposta deve ser (\d+)$/, async (status) => {
            expect(apiResponse.status).toBe(Number(status));
        });
        
        and(/^o item deve ter sido removido$/, async () => {
            const item = await prismaTestClient.item.findFirst({
            where: {
                id: Number(1),
            }
            });
        
            expect(item).toBe(null);
        });
    });
});