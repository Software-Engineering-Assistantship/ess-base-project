import { loadFeature, defineFeature, DefineStepFunction } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import { prismaMock } from '../../setupTests';
import { Orders, Client } from '@prisma/client';
import prisma from '../../src/database';

const feature = loadFeature(
  'tests/features/order_cancellation.backend.feature'
);
const request = supertest(app);

defineFeature(feature, (test) => {
  let response: supertest.Response;
  let orders: Orders[] = [];
  let clients: Client[] = [];

  // Clears the orders array after each scenario
  afterEach(() => {
    orders = [];
    clients = [];
  });

  const givenUserExist = (given: DefineStepFunction) =>
    given(
      /^existe um usuário com id "(.*)", com senha "(.*)", com nome "(.*)", email "(.*)", cpf "(.*)" e endereco "(.*)".$/,
      async (
        clientId: string,
        password: string,
        name: string,
        email: string,
        cpf: string,
        endereco: string
      ) => {
        const client_1 = {
          id: parseInt(clientId, 10),
          password: password,
          name: name,
          email: email,
          cpf: cpf,
          endereco: endereco,
        };
        clients.push(client_1);
      }
    );

  const givenOrderExist = (given: DefineStepFunction) =>
    given(
      /^um pedido com número "(.*)", status "(.*)", tempo "(.*)" e preco "(.*)" está registrado nos pedidos do usuario de id "(.*)".$/,
      async (
        orderId: string,
        status: string,
        time: string,
        price: string,
        clientId: string
      ) => {
        const order_1 = {
          id: parseInt(orderId, 10),
          clientId: parseInt(clientId, 10),
          status: status,
          time: parseFloat(time),
          price: parseFloat(price),
        };
        orders.push(order_1);
      }
    );

  const reqPut = (when: DefineStepFunction) =>
    when(
      /^uma requisição de PUT com id "(.*)", motivo "(.*)" e senha "(.*)" é enviada para "(.*)".$/,
      async (
        clientId: string,
        reason: string,
        password: string,
        url: string
      ) => {
        prismaMock.client.findUnique.mockResolvedValue(clients[0]);
        prismaMock.orders.findUnique.mockResolvedValue(orders[0]);
        response = await request.put(url).send({ reason, password });
      }
    );

  const ansStatusMustBe = (then: DefineStepFunction) =>
    then(/^o status da resposta deve ser "(.*)".$/, async (val: string) => {
      expect(response.status).toBe(parseInt(val, 10));
    });

  const ansMsgMustBe = (then: DefineStepFunction) =>
    then(
      /^uma mensagem de "(.*)" é retornada com id de pedido "(.*)".$/,
      async (txt: string, id: string) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            order_number: parseInt(id, 10),
            message: txt,
          })
        );
      }
    );

  test('Cancelamento de pedido bem sucedido', ({ given, and, when, then }) => {
    givenUserExist(given);
    givenOrderExist(and);
    reqPut(when);
    ansStatusMustBe(then);
    ansMsgMustBe(and);
  });

  test('Cancelamento mal sucedido (senha incorreta).', ({
    given,
    and,
    when,
    then,
  }) => {
    givenUserExist(given);

    givenOrderExist(and);
    reqPut(when);
    ansStatusMustBe(then);
    ansMsgMustBe(and);
  });

  test('Cancelamento mal sucedido (pedido já cancelado).', ({
    given,
    and,
    when,
    then,
  }) => {
    givenUserExist(given);
    givenOrderExist(and);
    reqPut(when);
    ansStatusMustBe(then);
    ansMsgMustBe(and);
  });

  test('Carregamento pedidos (serviço)', ({ given, when, then, and }) => {
    given(
      /^existe um usuário com id "(.*)" com senha "(.*)".$/,
      (arg0, arg1) => {}
    );

    when(
      /^uma requisição de "(.*)" com id "(.*)" é enviada para "(.*)"$/,
      (arg0, arg1, arg2) => {}
    );

    then(/^o status da resposta deve ser "(.*)"$/, (arg0) => {});

    and(/^uma mensagem de "(.*)" é retornada.$/, (arg0) => {});
  });
});
