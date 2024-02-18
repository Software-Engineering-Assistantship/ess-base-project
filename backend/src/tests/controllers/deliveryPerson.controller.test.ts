import { defineFeature, loadFeature } from 'jest-cucumber';
import { PrismaClient } from '@prisma/client';

import database from '../database/connection';
import request from 'supertest';
import app from '../../app';
import deliveryPerson from '../../controllers/deliveryPerson';

const feature = loadFeature(
  '../backend/src/tests/features/deliveryPerson.feature',
);
const prismaTestClient = new PrismaClient();
let apiResponse: request.Response;

defineFeature(feature, (test) => {
  beforeAll(async () => {
    await database.clearValues();
    await database.connect();
  });
  beforeEach(async () => {
    await database.clearValues();
  });
  afterAll(async () => {
    await database.clearValues();
    await database.disconnect();
  });

  test('Cadastro de entregador', ({ given, when, then, and }) => {
    given(
      /^não existe pessoa entregadora cadastrada no banco de dados com cpf "(.*)"$/,
      async (cpf) => {
        const userExists = await prismaTestClient.deliveryPerson.findFirst({
          where: {
            cpf,
          },
        });

        expect(userExists).toBe(null);
      },
    );

    when(
      /^uma nova requisição POST é feita para um end point "(.*)" com o corpo da requisição nome: "(.*)", cpf: "(.*)", cep: "(.*)", rua: "(.*)", numero: "(.*)", bairro: "(.*)", estado: "(.*)", cidade: "(.*)", email: "(.*)", telefone: "(.*)"$/,
      async (
        endpoint,
        name,
        cpf,
        cep,
        rua,
        numero,
        bairro,
        estado,
        cidade,
        email,
        telefone,
      ) => {
        apiResponse = await request(app)
          .post(endpoint)
          .send({
            deliveryPersonData: {
              name,
              cpf,
              email,
              phone: telefone,
              status: 'active',
            },
            addressData: {
              postalCode: cep,
              street: rua,
              number: numero,
              district: bairro,
              state: estado,
              city: cidade,
            },
          });
      },
    );

    then(/^o Status resposta deve ser "(.*)"$/, async (status) => {
      expect(apiResponse.status).toBe(Number(status));
    });

    and(/^a resposta deve conter o detalhe "(.*)"$/, async (detail) => {
      expect(apiResponse.body.message).toBe(detail);
    });
  });

  test('Falha conseguiu Cadastrar', ({ given, when, then, and }) => {
    given(
      /^existe pessoa entregadora cadastrada no banco de dados com cpf "(.*)"$/,
      async (cpf) => {
        apiResponse = await request(app)
          .post('/deliveryperson')
          .send({
            deliveryPersonData: {
              name: 'paula perazzo',
              cpf,
              email: 'paula@gmail.com',
              phone: '3333-3333',
              status: 'active',
            },
            addressData: {
              postalCode: '82892',
              street: 'da arvore',
              number: '89',
              district: 'boa viagem',
              state: 'pernambuco',
              city: 'recife',
            },
          });
        const userExists = await prismaTestClient.deliveryPerson.findFirst({
          where: {
            cpf,
          },
        });

        expect(userExists).not.toBe(null);
      },
    );

    when(
      /^uma nova requisição POST é feita para um end point "(.*)" com o corpo da requisição nome: "(.*)", cpf: "(.*)", cep: "(.*)", rua: "(.*)", numero: "(.*)", bairro: "(.*)", estado: "(.*)", cidade: "(.*)", email: "(.*)", telefone: "(.*)"$/,
      async (
        endpoint,
        name,
        cpf,
        cep,
        rua,
        numero,
        bairro,
        estado,
        cidade,
        email,
        telefone,
      ) => {
        apiResponse = await request(app)
          .post(endpoint)
          .send({
            deliveryPersonData: {
              name,
              cpf,
              email,
              phone: telefone,
              status: 'active',
            },
            addressData: {
              postalCode: cep,
              street: rua,
              number: numero,
              district: bairro,
              state: estado,
              city: cidade,
            },
          });
      },
    );

    then(/^o Status resposta deve ser "(.*)"$/, async (status) => {
      expect(apiResponse.status).toBe(Number(status));
    });

    and(/^a resposta deve conter o detalhe "(.*)"$/, async (detail) => {
      expect(apiResponse.body.message).toBe(detail);
    });
  });

  test('Mudança de caracteristicas', ({ given, when, then, and }) => {
    given(
      /^existe pessoa entregadora cadastrada no banco de dados com cpf "(.*)"$/,
      async (cpf) => {
        apiResponse = await request(app)
          .post('/deliveryperson')
          .send({
            deliveryPersonData: {
              name: 'paula perazzo',
              cpf,
              email: 'paula@gmail.com',
              phone: '3333-3333',
              status: 'active',
            },
            addressData: {
              postalCode: '82892',
              street: 'da arvore',
              number: '89',
              district: 'boa viagem',
              state: 'pernambuco',
              city: 'recife',
            },
          });
        const userExists = await prismaTestClient.deliveryPerson.findFirst({
          where: {
            cpf,
          },
        });

        expect(userExists).toHaveProperty('cpf', userExists?.cpf);
      },
    );

    when(
      /^uma nova requisição PATCH é feita para um end point "(.*)" com o corpo da requisição nome: "(.*)", cpf: "(.*)", cep: "(.*)", rua: "(.*)", numero: "(.*)", bairro: "(.*)", estado: "(.*)", cidade: "(.*)", email: "(.*)", telefone: "(.*)"$/,
      async (
        endpoint,
        name,
        cpf,
        cep,
        rua,
        numero,
        bairro,
        estado,
        cidade,
        email,
        telefone,
      ) => {
        apiResponse = await request(app)
          .patch(`${endpoint}/${cpf}`)
          .send({
            deliveryPersonData: {
              name,
              cpf,
              email,
              phone: telefone,
              status: 'active',
            },
            addressData: {
              postalCode: cep,
              street: rua,
              number: numero,
              district: bairro,
              state: estado,
              city: cidade,
            },
          });
      },
    );

    then(/^o Status resposta deve ser "(.*)"$/, async (status) => {
      expect(apiResponse.status).toBe(Number(status));
    });

    and(/^a resposta deve conter o detalhe "(.*)"$/, async (detail) => {
      expect(apiResponse.body.message).toBe(detail);
    });
  });

  test('Falha em mudança de caracteristicas', ({ given, when, then, and }) => {
    given(
      /^não existe pessoa entregadora cadastrada no banco de dados com cpf "(.*)"$/,
      async (cpf) => {
        const userExists = await prismaTestClient.deliveryPerson.findFirst({
          where: {
            cpf,
          },
        });

        expect(userExists).toBe(null);
      },
    );

    when(
      /^uma nova requisição PATCH é feita para um end point "(.*)" com o corpo da requisição nome: "(.*)", cpf: "(.*)", cep: "(.*)", rua: "(.*)", numero: "(.*)", bairro: "(.*)", estado: "(.*)", cidade: "(.*)", email: "(.*)", telefone: "(.*)"$/,
      async (
        endpoint,
        name,
        cpf,
        cep,
        rua,
        numero,
        bairro,
        estado,
        cidade,
        email,
        telefone,
      ) => {
        apiResponse = await request(app)
          .patch(`${endpoint}/${cpf}`)
          .send({
            deliveryPersonData: {
              name,
              cpf,
              email,
              phone: telefone,
              status: 'active',
            },
            addressData: {
              postalCode: cep,
              street: rua,
              number: numero,
              district: bairro,
              state: estado,
              city: cidade,
            },
          });
      },
    );

    then(/^o Status resposta deve ser "(.*)"$/, async (status) => {
      expect(apiResponse.status).toBe(Number(status));
    });

    and(/^a resposta deve conter o detalhe "(.*)"$/, async (detail) => {
      expect(apiResponse.body.message).toBe(detail);
    });
  });
});
