import { defineFeature, loadFeature } from 'jest-cucumber';
import { Item, PrismaClient } from '@prisma/client';

import database from '../database/connection';
import request from 'supertest';
import app from '../../app'

const feature = loadFeature('../backend/src/tests/features/NewDeliveriesNotification.feature');
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

  // Scenario: Notificação de Nova Entrega para Pessoa Entregadora
  // Given uma entrega com id "1" que possui os campos: status "pendente"
  // When o servidor recebe uma requisição POST na rota "/delivery-notifications/1" com campos: status "solicitada", deliveryPersonEmail "ricardo@root.com.br"
  // Then a entrega com id "1" atualizará o campo de status para "solicitada"
  // And a resposta deve retornar status "200"
  // And a resposta deve conter os campos: deliveryPersonEmail "ricardo@root.com.br", category "new-delivery", title "Nova entrega 1 solicitada"


  test('Notificação de Nova Entrega para Pessoa Entregadora', ({ given, when, then, and }) => {
    let delivery: any;
    let notification: any;

    given(/^uma entrega com id "(.*)" que possui os campos: status "(.*)"$/, async (id, status) => {
      const newDelivery = await prismaTestClient.delivery.create({
        data: { id: Number(id), status }
      })
      delivery = await prismaTestClient.delivery.findUnique({ where: { id: newDelivery.id } })
      expect(delivery?.id).toBe(Number(id))
      expect(delivery?.status).toBe(status)
    });

    when(/^o servidor recebe uma requisição POST na rota "(.*)" com campos: status "(.*)", deliveryPersonEmail "(.*)"$/, async (route, status, deliveryPersonEmail) => {
      apiResponse = await request(app).post(route).send({ status, deliveryPersonEmail })
    });

    then(/^a entrega com id "(.*)" atualizará o campo de status para "(.*)"$/, async (id, status) => {
      const updatedDelivery = await prismaTestClient.delivery.findUnique({ where: { id: Number(id) } })
      expect(updatedDelivery?.status).toBe(status)
    });

    and(/^a resposta deve retornar status "(.*)"$/, async (status) => {
      expect(apiResponse.status).toBe(Number(status))
    });

    and(/^a resposta deve conter os campos: deliveryPersonEmail "(.*)", category "(.*)", title "(.*)"$/, async (deliveryPersonEmail, category, title) => {
      notification = apiResponse.body.data.notification
      delivery = apiResponse.body.data.deliveryPersonEmail
      expect(delivery).toBe(deliveryPersonEmail)
      expect(notification.category).toBe(category)
      expect(notification.title).toBe(title)
    });
  })

  // Scenario: Falha ao Notificar Nova Entrega
  // Given uma entrega cadastrada com o id "1" e o campo status com valor "deslocamento"
  // When uma requisição POST é feita para o endpoint "/delivery-notifications/1" com campos: status "solicitada", deliveryPersonEmail "ricardo@root.com.br"
  // Then o sistema deve retornar uma resposta com status "400" e a mensagem de erro "Status inválido para notificação de nova entrega"

  test('Falha ao Notificar Nova Entrega', ({ given, when, then }) => {
    let delivery: any;
    given(/^uma entrega cadastrada com o id "(.*)" e o campo status com valor "(.*)"$/, async (id, status) => {
      const newDelivery = await prismaTestClient.delivery.create({
        data: { id: Number(id), status }
      })
      delivery = await prismaTestClient.delivery.findUnique({ where: { id: newDelivery.id } })
      expect(delivery?.id).toBe(Number(id))
      expect(delivery?.status).toBe(status)
    });

    when(/^uma requisição POST é feita para o endpoint "(.*)" com campos: status "(.*)", deliveryPersonEmail "(.*)"$/, async (route, status, deliveryPersonEmail) => {
      apiResponse = await request(app).post(route).send({ status, deliveryPersonEmail })
    });

    then(/^o sistema deve retornar uma resposta com status "(.*)" e a mensagem de erro "(.*)"$/, async (status, message) => {
      expect(apiResponse.status).toBe(Number(status))
      expect(apiResponse.body.message).toBe(message)
    });
  })

  // Scenario: Notificação de Entrega Realizada para Pessoa Entregadora
  // Given uma entrega com id "1" que possui os campos: status "deslocamento"
  // When o servidor recebe uma requisição PATCH na rota "/delivery-notifications/1" com campos: status "entregue", deliveryPersonEmail "ricardo@root.com.br"
  // Then a entrega com id "1" atualizará o campo de status para "entregue"
  // And a resposta deve conter os campos: deliveryPersonEmail "ricardo@root.com.br", category "delivery-status", title "Entrega 1 realizada com sucesso"

  test('Notificação de Entrega Realizada para Pessoa Entregadora', ({ given, when, then, and }) => {
    let delivery: any;
    let notification: any;

    given(/^uma entrega com id "(.*)" que possui os campos: status "(.*)"$/, async (id, status) => {
      const newDelivery = await prismaTestClient.delivery.create({
        data: { id: Number(id), status }
      })
      delivery = await prismaTestClient.delivery.findUnique({ where: { id: newDelivery.id } })
      expect(delivery?.id).toBe(Number(id))
      expect(delivery?.status).toBe(status)
    });

    when(/^o servidor recebe uma requisição PATCH na rota "(.*)" com campos: status "(.*)", deliveryPersonEmail "(.*)"$/, async (route, status, deliveryPersonEmail) => {
      apiResponse = await request(app).patch(route).send({ status, deliveryPersonEmail })
    });

    then(/^a entrega com id "(.*)" atualizará o campo de status para "(.*)"$/, async (id, status) => {
      const updatedDelivery = await prismaTestClient.delivery.findUnique({ where: { id: Number(id) } })
      expect(updatedDelivery?.status).toBe(status)
    });

    and(/^a resposta deve conter os campos: deliveryPersonEmail "(.*)", category "(.*)", title "(.*)"$/, async (deliveryPersonEmail, category, title) => {
      notification = apiResponse.body.data.notification
      delivery = apiResponse.body.data.deliveryPersonEmail
      expect(delivery).toBe(deliveryPersonEmail)
      expect(notification.category).toBe(category)
      expect(notification.title).toBe(title)
    });
  })

  // Scenario: Falha ao Atualizar Status de Entrega
  // Given uma entrega cadastrada com o id "1" e o campo status com valor "entregue"
  // When uma requisição PATCH é feita para o endpoint "/delivery-notifications/1" com o campo status "deslocamento", deliveryPersonEmail "ricardo@root.com.br"
  // Then o sistema deve retornar uma resposta com status "400" e a mensagem de erro "Status inválido para notificação de entrega finalizada"
  // And a entrega com id "1" não deve ter seu campo status atualizado para "deslocamento"

  test('Falha ao Atualizar Status de Entrega', ({ given, when, then, and }) => {
    let delivery: any;
    given(/^uma entrega cadastrada com o id "(.*)" e o campo status com valor "(.*)"$/, async (id, status) => {
      const newDelivery = await prismaTestClient.delivery.create({
        data: { id: Number(id), status }
      })
      delivery = await prismaTestClient.delivery.findUnique({ where: { id: newDelivery.id } })
      expect(delivery?.id).toBe(Number(id))
      expect(delivery?.status).toBe(status)
    });

    when(/^uma requisição PATCH é feita para o endpoint "(.*)" com o campo status "(.*)", deliveryPersonEmail "(.*)"$/, async (route, status, deliveryPersonEmail) => {
      apiResponse = await request(app).patch(route).send({ status, deliveryPersonEmail })
    });

    then(/^o sistema deve retornar uma resposta com status "(.*)" e a mensagem de erro "(.*)"$/, async (status, message) => {
      expect(apiResponse.status).toBe(Number(status))
      expect(apiResponse.body.message).toBe(message)
    });

    and(/^a entrega com id "(.*)" não deve ter seu campo status atualizado para "(.*)"$/, async (id, status) => {
      const updatedDelivery = await prismaTestClient.delivery.findUnique({ where: { id: Number(id) } })
      expect(updatedDelivery?.status).not.toBe(status)
    });
  })

});