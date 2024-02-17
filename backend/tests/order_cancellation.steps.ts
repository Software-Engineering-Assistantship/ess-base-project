import { loadFeature, defineFeature, DefineStepFunction } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../src/app';
import { prismaMock } from '../setupTests';
import { Orders, Client } from '@prisma/client';
import prisma from '../src/database';

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
      /^existe um usuário com id "(.*)", com senha "(.*)", com nome "(.*)", email "(.*)", cpf "(.*)" e endereço "(.*)".$/,
      async (
        clientId: string,
        password: string,
        name: string,
        email: string,
        cpf: string,
        address: string
      ) => {
        const client_1 = {
          id: parseInt(clientId, 10),
          password: password,
          name: name,
          email: email,
          cpf: cpf,
          address: address,
        };
        clients.push(client_1);
      }
    );

  const givenOrderExist = (given: DefineStepFunction) =>
    given(
      /^um pedido com número "(.*)", status "(.*)", tempo "(.*)" e preço "(.*)" está registrado nos pedidos do usuario de id "(.*)".$/,
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
          time: time,
          price: parseFloat(price),
        };
        orders.push(order_1);
      }
    );

  const reqPut = (when: DefineStepFunction) =>
    when(
      /^uma requisição de PUT com motivo "(.*)" e senha "(.*)" é enviada para "(.*)".$/,
      async (reason: string, password: string, url: string) => {
        prismaMock.client.findUnique.mockResolvedValue(clients[0]);
        prismaMock.orders.findUnique.mockResolvedValue(orders[0]);
        response = await request.put(url).send({ reason, password });
      }
    );

  const reqGet = (when: DefineStepFunction) =>
    when(
      /^uma requisição de GET com senha "(.*)" é enviada para "(.*)".$/,
      async (password: string, url: string) => {
        prismaMock.orders.findMany.mockResolvedValue(orders);
        prismaMock.client.findUnique.mockResolvedValue(clients[0]);
        response = await request.get(url).send({ password });
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

  const ansMustContain = (then: DefineStepFunction) =>
    then(
      /^a mensagem possui número: "(.*)", status: "(.*)", tempo "(.*)" e preço "(.*)".$/,
      (id: string, status: string, time: string, price: string) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: parseInt(id, 10),
              status: status,
              time: time,
              price: parseFloat(price),
            }),
          ])
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

  test('Cancelamento mal sucedido (pedido já aceito).', ({
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

  test('Carregamento pedidos bem sucedido.', ({ given, and, when, then }) => {
    givenUserExist(given);
    givenOrderExist(given);
    givenOrderExist(given);
    reqGet(when);
    ansStatusMustBe(then);
    ansMustContain(and);
    ansMustContain(and);
  });

  test('Cancelamento mal sucedido (cliente não existe).', ({
    given,
    and,
    when,
    then,
  }) => {
    givenUserExist(given);
    givenOrderExist(and);
    when(
      /^uma requisição de PUT com motivo "(.*)" e senha "(.*)" é enviada para "(.*)".$/,
      async (reason: string, password: string, url: string) => {
        prismaMock.client.findUnique.mockResolvedValue(null);
        prismaMock.orders.findUnique.mockResolvedValue(orders[0]);
        response = await request.put(url).send({ reason, password });
      }
    );
    ansStatusMustBe(then);
    ansMsgMustBe(and);
  });

  test('Cancelamento mal sucedido (pedido não existe).', ({
    given,
    and,
    when,
    then,
  }) => {
    givenUserExist(given);
    givenOrderExist(and);
    when(
      /^uma requisição de PUT com motivo "(.*)" e senha "(.*)" é enviada para "(.*)".$/,
      async (reason: string, password: string, url: string) => {
        prismaMock.client.findUnique.mockResolvedValue(clients[0]);
        prismaMock.orders.findUnique.mockResolvedValue(null);
        response = await request.put(url).send({ reason, password });
      }
    );
    ansStatusMustBe(then);
    ansMsgMustBe(and);
  });
});
