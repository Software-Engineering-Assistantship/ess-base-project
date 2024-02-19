import { defineFeature, loadFeature } from 'jest-cucumber';
import { PrismaClient } from '@prisma/client';

import database from '../database/connection';
import request from 'supertest';
import app from '../../app';

const feature = loadFeature('../backend/src/tests/features/registerRepairCupom.feature');
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

      test('Adicionar cupom', ({ given, when, then }) => {
        given(/^o banco de dados requisita os campos código, data de início, data de término e desconto como obrigatórios$/, () => {

        });

        when(/^um usuário envia uma requisição POST para a rota \/cupons com código "(.*)", data de início "(.*)", data de término "(.*)" e desconto "(.*)"$/, async (name, discount, start_date, end_date) => {
            apiResponse = await request(app).post('/cupons').send({
                    name,
                    start_date,
                    end_date,
                    discount,
                });

        });

        then(/^o Status da resposta deve ser (\d+)$/, async (status) => {
            expect(apiResponse.status).toBe(Number(status));
        });

    });


    test('Tentar adicionar uma cupom sem informar todos os campos obrigatórios no banco de dados', ({ given, when, then, and }) => {
        given(/^o banco de dados requisita os campos código, data de início, data de término e desconto como obrigatórios$/, () => {

        });

        when(/^um usuário envia uma requisição POST para a rota \/cupons com código "(.*)", data de início "(.*)"$/, async (
            name, start_date, discount
        ) => {
            apiResponse = await request(app).post('/cupons').send({
                name,
                start_date,
                discount,
            });

        });

        then(/^o Status da resposta deve ser (\d+)$/, async (status) => {
            expect(apiResponse.status).toBe(Number(status));
        });

    });

    test('Listar cupons', ({ given, when, then, and}) => {
        given(/^eu tenho vários cupons cadastrados no banco de dados$/, async () => {
            const cupom = await prismaTestClient.cupom.findFirst();

            expect(cupom).toHaveProperty('id');
        });

        when(/^um usuário envia uma requisição GET para a rota \/cupons$/, async () => {
            apiResponse = await request(app).get('/cupons');
        });

        then(/^o Status da resposta deve ser (\d+)$/, async (status) => {
            expect(apiResponse.status).toBe(Number(status));
        });

        and(/^a resposta deve conter a lista de cupons$/, async () => {
            const responseBody = apiResponse.body;
            expect(apiResponse.body).toBeDefined();
        });

    });

    

});
