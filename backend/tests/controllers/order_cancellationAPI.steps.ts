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
  });

  test('Cancelamento de pedido bem sucedido', ({ given, and, when, then }) => {
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

    and(
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

    when(
      /^uma requisição de PUT com id "(.*)", motivo "(.*)" e senha "(.*)" é enviada para "(.*)".$/,
      async (
        clientId: string,
        reason: string,
        password: string,
        url: string
      ) => {
        const client_1 = {
          id: parseInt(clientId),
          password: password,
          name: 'joao',
          email: 'joao@cin.ufpe.br',
          cpf: '11122233344',
          endereco: 'rua 1',
        };
        const order_1 = {
          id: 4,
          clientId: parseInt(clientId),
          status: 'Confirmado',
          time: 2,
          price: 50.0,
        };
        prismaMock.client.findUnique.mockResolvedValue(client_1);
        prismaMock.orders.findUnique.mockResolvedValue(order_1);
        response = await request.put(url).send({ reason, password });
      }
    );

    then(/^o status da resposta deve ser "(.*)".$/, async (val: string) => {
      expect(response.status).toBe(parseInt(val, 10));
    });

    and(
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
  });
  //   const givenExisteUmRestauranteCadastradoNoSistemaComOsDados = (
  //     given: DefineStepFunction
  //   ) =>
  //     given(
  //       /^existe um restaurante cadastrado no sistema com os dados id "(.*)", nome "(.*)", cnpj "(.*)", email "(.*)" e senha "(.*)"$/,
  //       async (
  //         id: string,
  //         name: string,
  //         cnpj: string,
  //         email: string,
  //         password: string
  //       ) => {
  //         restaurants.push({
  //           id: parseInt(id, 10),
  //           name,
  //           cnpj,
  //           email,
  //           password,
  //         });
  //       }
  //     );

  //   const thenAMensagemContem = (then: DefineStepFunction) =>
  //     then(
  //       /^a mensagem contém "(.*)", "(.*)", "(.*)"$/,
  //       async (name, cnpj, email) => {
  //         await expect(response.body).toEqual(
  //           expect.arrayContaining([
  //             expect.objectContaining({ name, cnpj, email }),
  //           ])
  //         );
  //       }
  //     );

  //   const thenERetornadaUmaMensagemComStatus = (then: DefineStepFunction) =>
  //     then(/^é retornada uma mensagem com status "(.*)"$/, async (status) => {
  //       await expect(response.status).toBe(parseInt(status, 10));
  //     });

  //   const thenAMensagemDiz = (then: DefineStepFunction) => {
  //     then(/^a mensagem diz "(.*)"$/, async (message) => {
  //       await expect(response.body).toEqual(expect.objectContaining({ message }));
  //     });
  //   };

  //   const whenUmaRequisicaoPostEEnviadaPara = (when: DefineStepFunction) =>
  //     when(
  //       /^uma requisição POST é enviada para "(.*)" com os valores "(.*)", "(.*)", email "(.*)", senha "(.*)"$/,
  //       async (url, name, cnpj, email, password) => {
  //         prismaMock.restaurant.create.mockResolvedValue({
  //           id: 1,
  //           name,
  //           cnpj,
  //           email,
  //           password,
  //         });
  //         response = await request
  //           .post(url)
  //           .send({ name, CNPJ: cnpj, email, password });
  //       }
  //     );
  //   test('Leitura de restaurantes do sistema', async ({
  //     given,
  //     when,
  //     then,
  //     and,
  //   }) => {
  //     givenExisteUmRestauranteCadastradoNoSistemaComOsDados(given);
  //     givenExisteUmRestauranteCadastradoNoSistemaComOsDados(and);

  //     when(/^uma requisição GET é enviada para "(.*)"$/, async (url) => {
  //       prismaMock.restaurant.findMany.mockResolvedValue(restaurants);
  //       response = await request.get(url);
  //     });

  //     thenERetornadaUmaMensagemComStatus(then);

  //     thenAMensagemContem(and);
  //     thenAMensagemContem(and);
  //   });

  //   test('Cadastro bem sucedido de restaurante', async ({
  //     given,
  //     when,
  //     then,
  //     and,
  //   }) => {
  //     given(
  //       /^não existe nenhum restaurante com o CNPJ "(.*)" nem com o email "(.*)" cadastrado no sistema$/,
  //       async (cnpj, email) => {
  //         prismaMock.restaurant.findFirst.mockResolvedValue(null);
  //       }
  //     );

  //     whenUmaRequisicaoPostEEnviadaPara(when);

  //     thenERetornadaUmaMensagemComStatus(then);
  //     thenAMensagemDiz(and);
  //   });

  //   test('Remoção bem sucedida de um restaurante', async ({
  //     given,
  //     when,
  //     then,
  //     and,
  //   }) => {
  //     givenExisteUmRestauranteCadastradoNoSistemaComOsDados(given);

  //     when(/^uma requisição DELETE é enviada para "(.*)"$/, async (url) => {
  //       prismaMock.restaurant.delete.mockResolvedValue(restaurants[0]);
  //       response = await request.delete(url.replace('{id}', restaurants[0].id));
  //     });

  //     thenERetornadaUmaMensagemComStatus(then);

  //     thenAMensagemDiz(and);

  //     and(
  //       /^o restaurante "(.*)" não está mais salvo no banco de dados$/,
  //       async (name) => {
  //         expect(prismaMock.restaurant.delete).toHaveBeenCalledWith({
  //           where: { id: restaurants[0].id },
  //         });
  //       }
  //     );
  //   });

  //   test('Atualização bem sucedida de um restaurante', async ({
  //     given,
  //     when,
  //     then,
  //     and,
  //   }) => {
  //     givenExisteUmRestauranteCadastradoNoSistemaComOsDados(given);

  //     when(
  //       /^uma requisição PUT é enviada para "(.*)" com o valor "(.*)" no campo "(.*)"$/,
  //       async (url, name, key) => {
  //         prismaMock.restaurant.update.mockResolvedValue({
  //           ...restaurants[0],
  //           name,
  //         });
  //         response = await request
  //           .put(url.replace('{id}', restaurants[0].id))
  //           .send({ name });
  //       }
  //     );

  //     thenERetornadaUmaMensagemComStatus(then);

  //     thenAMensagemDiz(and);

  //     and(
  //       /^o restaurante com o nome "(.*)", CNPJ "(.*)", email "(.*)", senha "(.*)" está armazenado no sistema$/,
  //       async (name, cnpj, email, password) => {
  //         expect(prismaMock.restaurant.update).toHaveBeenCalledWith({
  //           where: { id: restaurants[0].id },
  //           data: { name },
  //         });
  //       }
  //     );
  //   });
});
