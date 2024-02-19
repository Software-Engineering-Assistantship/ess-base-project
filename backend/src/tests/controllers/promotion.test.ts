import { defineFeature, loadFeature } from 'jest-cucumber';
import { PrismaClient } from '@prisma/client';

import database from '../database/connection';
import request from 'supertest';
import app from '../../app';

const feature = loadFeature('../backend/src/tests/features/registerRepairPromotion.feature');
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

    test('Adicionar promoção', ({ given, when, then }) => {
        given(/^o banco de dados requisita os campos, categoria, data de início, data de término e desconto como obrigatórios$/, () => {

        });

        when(/^um usuário envia uma requisição POST para a rota \/promocoes com a categoria "(.*)", com data de início "(.*)", data de término "(.*)" e desconto "(.*)"$/, async (category, discount, start_date, end_date) => {
            apiResponse = await request(app).post('/promotion').send({
                    category,
                    start_date,
                    end_date,
                    discount,
                });

        });

        then(/^o Status da resposta deve ser (\d+)$/, async (status) => {
            expect(apiResponse.status).toBe(Number(status));
        });

    });

    test('Deletar promoção', ({ given, when, then, and }) => {
        given(/^Eu tenho uma promoção cadastrada com id "(.*)"$/, async (id) => {
            const promotion = await prismaTestClient.promotion.findFirst({
                where: {
                    id: Number(id),
                }
            });

            expect(promotion).toHaveProperty('id', Number(id));
        });

        when(/^Eu envio uma requisição DELETE para a rota \/promocoes\/1$/, async () => {
            apiResponse = await request(app)
                .delete('/promotion/1');
        });

        then(/^o status da resposta deve ser (\d+)$/, async (status) => {
            expect(apiResponse.status).toBe(Number(status));
        });

        and(/^o item deve ter sido removido$/, async () => {
            const promotion = await prismaTestClient.item.findFirst({
            where: {
                id: Number(1),
            }
            });
        
            expect(promotion).toBe(null);
        });

    });

    test('Tentar adicionar uma promoção sem informar todos os campos obrigatórios', ({ given, when, then, and }) => {
        given(/^o banco de dados requisita os campos, categoria, data de início, data de término e desconto como obrigatórios$/, () => {

        });

        when(/^um usuário envia uma requisição POST para a rota \/promocoes com a categoria "(.*)", com data de início "(.*)" e desconto "(.*)"$/, async (
            category, start_date, discount
        ) => {
            apiResponse = await request(app).post('/promotion').send({
                    category,
                    start_date,
                    discount,
                });
        });

        then(/^o Status da resposta deve ser (\d+)$/, async (status) => {
            expect(apiResponse.status).toBe(Number(status));
        });

        and(/^o corpo da resposta deve conter a mensagem "(.*)"$/, async (message) => {
            expect(apiResponse.body).toHaveProperty('message', message);
        });
    });


    test('Listar promoções', ({ given, when, then, and }) => {
        given(/^Eu tenho várias promoções cadastradas$/, async () => {
            const promotions = await prismaTestClient.promotion.findMany();
            expect(promotions).toBeDefined();
        });

        when(/^Eu envio uma requisição GET para a rota \/promocoes$/, async () => {
            apiResponse = await request(app)
                .get('/promotion');
        });

        then(/^o status da resposta deve ser (\d+)$/, async (status) => {
            expect(apiResponse.status).toBe(Number(status));
        });

        and(/^o corpo da resposta deve conter as categorias em promoção$/, async () => {
            const responseBody = apiResponse.body;
            expect(responseBody.data).toBeDefined();
        });

    });

    

});
