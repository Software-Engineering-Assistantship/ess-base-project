import { loadFeature, defineFeature, DefineStepFunction } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import { prismaMock } from '../../setupTests';
import { Restaurant } from '@prisma/client';

const feature = loadFeature(
  'tests/features/restaurant_registration.backend.feature'
);
const request = supertest(app);

defineFeature(feature, (test) => {
  let response: supertest.Response;
  let restaurants: Restaurant[] = [];

  // Clears the restaurants array after each scenario
  afterEach(() => {
    restaurants = [];
  });

  // Definition of common steps
  const givenExisteUmRestauranteCadastradoNoSistemaComOsDados = (
    given: DefineStepFunction
  ) =>
    given(
      /^existe um restaurante cadastrado no sistema com os dados id "(.*)", nome "(.*)", cnpj "(.*)", email "(.*)" e senha "(.*)"$/,
      async (id, name, cnpj, email, password) => {
        restaurants.push({
          id: parseInt(id, 10),
          name,
          cnpj,
          email,
          password,
        });
      }
    );

  const thenAMensagemContem = (then: DefineStepFunction) =>
    then(
      /^a mensagem contém "(.*)", "(.*)", "(.*)"$/,
      async (name, cnpj, email) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({ name, cnpj, email }),
          ])
        );
      }
    );

  const thenERetornadaUmaMensagemComStatus = (then: DefineStepFunction) =>
    then(/^é retornada uma mensagem com status "(.*)"$/, async (status) => {
      expect(response.status).toBe(parseInt(status, 10));
    });

  const thenAMensagemDiz = (then: DefineStepFunction) => {
    then(/^a mensagem diz "(.*)"$/, async (message) => {
      expect(response.body).toEqual(expect.objectContaining({ message }));
    });
  };

  const whenUmaRequisicaoPostEEnviadaPara = (when: DefineStepFunction) =>
    when(
      /^uma requisição POST é enviada para "(.*)" com os valores "(.*)", "(.*)", email "(.*)", senha "(.*)"$/,
      async (url, name, cnpj, email, password) => {
        prismaMock.restaurant.findFirst.mockResolvedValueOnce(restaurants[0]);
        prismaMock.restaurant.create.mockResolvedValue({
          id: restaurants.length + 1,
          name,
          cnpj,
          email,
          password,
        });
        response = await request
          .post(url)
          .send({ name, CNPJ: cnpj, email, password });
      }
    );

  const thenNaoEstaSalvoNoBancoDeDados = (then: DefineStepFunction) => {
    then(
      /^o restaurante "(.*)" não está salvo no banco de dados$/,
      async (name) => {
        expect(prismaMock.restaurant.create).not.toHaveBeenCalled();
      }
    );
  };

  const thenORestauranteEstaSalvoNoBancoDeDados = (
    then: DefineStepFunction,
    index: number
  ) => {
    then(
      /^o restaurante "(.*)" está salvo no banco de dados com os dados id "(.*)", nome "(.*)", cnpj "(.*)", email "(.*)" e senha "(.*)"$/,
      async (name, id, cnpj, email, password) => {
        expect(prismaMock.restaurant.update).not.toHaveBeenCalledWith({
          where: { id: restaurants[index].id },
          data: { cnpj, email, password, name, id },
        });
      }
    );
  };

  //Test scenarios
  // === Successful scenarios ===

  test('Cadastro bem sucedido de restaurante', async ({
    given,
    when,
    then,
    and,
  }) => {
    given(
      /^não existe nenhum restaurante com o cnpj "(.*)" nem com o email "(.*)" cadastrado no sistema$/,
      async (cnpj, email) => {
        prismaMock.restaurant.findFirst.mockResolvedValue(null);
      }
    );

    whenUmaRequisicaoPostEEnviadaPara(when);

    thenERetornadaUmaMensagemComStatus(then);
    thenAMensagemDiz(and);
  });

  test('Leitura de restaurantes do sistema', async ({
    given,
    when,
    then,
    and,
  }) => {
    givenExisteUmRestauranteCadastradoNoSistemaComOsDados(given);
    givenExisteUmRestauranteCadastradoNoSistemaComOsDados(and);

    when(/^uma requisição GET é enviada para "(.*)"$/, async (url) => {
      prismaMock.restaurant.findMany.mockResolvedValue(restaurants);
      response = await request.get(url);
    });

    thenERetornadaUmaMensagemComStatus(then);

    thenAMensagemContem(and);
    thenAMensagemContem(and);
  });

  test('Remoção bem sucedida de um restaurante', async ({
    given,
    when,
    then,
    and,
  }) => {
    givenExisteUmRestauranteCadastradoNoSistemaComOsDados(given);

    when(/^uma requisição DELETE é enviada para "(.*)"$/, async (url) => {
      prismaMock.restaurant.findFirst.mockResolvedValue(restaurants[0]);
      prismaMock.restaurant.delete.mockResolvedValue(restaurants[0]);
      response = await request.delete(url);
    });

    thenERetornadaUmaMensagemComStatus(then);

    thenAMensagemDiz(and);

    and(
      /^o restaurante "(.*)" não está mais salvo no banco de dados$/,
      async (name) => {
        expect(prismaMock.restaurant.delete).toHaveBeenCalledWith({
          where: { id: restaurants[0].id },
        });
      }
    );
  });

  test('Atualização bem sucedida de um restaurante', async ({
    given,
    when,
    then,
    and,
  }) => {
    givenExisteUmRestauranteCadastradoNoSistemaComOsDados(given);

    when(
      /^uma requisição PUT é enviada para "(.*)" com o valor "(.*)" no campo "(.*)"$/,
      async (url, name, key) => {
        prismaMock.restaurant.findFirst
          .mockResolvedValueOnce(null)
          .mockResolvedValue(restaurants[0]);

        prismaMock.restaurant.update.mockResolvedValue({
          ...restaurants[0],
          name,
        });
        response = await request.put(url).send({ name });
      }
    );

    thenERetornadaUmaMensagemComStatus(then);

    thenAMensagemDiz(and);

    and(
      /^o restaurante com o nome "(.*)", cnpj "(.*)", email "(.*)", senha "(.*)" está armazenado no sistema$/,
      async (name, cnpj, email, password) => {
        expect(prismaMock.restaurant.update).toHaveBeenCalledWith({
          where: { id: restaurants[0].id },
          data: { name },
        });
      }
    );
  });

  test('Atualização bem sucedida de um restaurante (email)', async ({
    given,
    when,
    then,
    and,
  }) => {
    givenExisteUmRestauranteCadastradoNoSistemaComOsDados(given);

    and(
      /^não existe nenhum restaurante com o email "(.*)" cadastrado no sistema$/,
      async (email) => {
        prismaMock.restaurant.findFirst
          .mockResolvedValueOnce(null)
          .mockResolvedValue(restaurants[0]);
      }
    );

    when(
      /^uma requisição PUT é enviada para "(.*)" com o valor "(.*)" no campo "(.*)"$/,
      async (url, email, key) => {
        prismaMock.restaurant.update.mockResolvedValue({
          ...restaurants[0],
          email,
        });
        response = await request.put(url).send({ email });
      }
    );

    thenERetornadaUmaMensagemComStatus(then);
    thenAMensagemDiz(and);

    and(
      /^o restaurante com o nome "(.*)", cnpj "(.*)", email "(.*)", senha "(.*)" está armazenado no sistema$/,
      async (name, cnpj, email, password) => {
        expect(prismaMock.restaurant.update).toHaveBeenCalledWith({
          where: { id: restaurants[0].id },
          data: { email },
        });
      }
    );
  });

  // === Unsuccesful scenarios ===

  test('Cadastro mal sucedido de um restaurante (CNPJ já cadastrado)', async ({
    given,
    when,
    then,
    and,
  }) => {
    givenExisteUmRestauranteCadastradoNoSistemaComOsDados(given);

    whenUmaRequisicaoPostEEnviadaPara(when);

    thenERetornadaUmaMensagemComStatus(then);

    thenAMensagemDiz(and);

    thenNaoEstaSalvoNoBancoDeDados(and);
  });

  test('Cadastro mal sucedido de um restaurante (email já cadastrado)', async ({
    given,
    when,
    then,
    and,
  }) => {
    givenExisteUmRestauranteCadastradoNoSistemaComOsDados(given);

    whenUmaRequisicaoPostEEnviadaPara(when);

    thenERetornadaUmaMensagemComStatus(then);

    thenAMensagemDiz(and);

    thenNaoEstaSalvoNoBancoDeDados(and);

    and(/^o restaurante "(.*)" está salvo no banco de dados$/, async (name) => {
      expect(prismaMock.restaurant.update).not.toHaveBeenCalledWith({
        where: { id: restaurants[0].id },
        data: { name },
      });
    });
  });

  test('Remoção mal sucedida de um restaurante (restaurante não encontrado)', async ({
    given,
    when,
    then,
    and,
  }) => {
    given(
      /^não existe nenhum restaurante com o id "(.*)" cadastrado no sistema$/,
      async (id) => {
        prismaMock.restaurant.findFirst.mockResolvedValue(null);
      }
    );

    when(/^uma requisição DELETE é enviada para "(.*)"$/, async (url) => {
      response = await request.delete(url);
    });

    thenERetornadaUmaMensagemComStatus(then);
    thenAMensagemDiz(and);
  });

  test('Atualização mal sucedida dos dados de um restaurante (CNPJ já cadastrado)', async ({
    given,
    when,
    then,
    and,
  }) => {
    givenExisteUmRestauranteCadastradoNoSistemaComOsDados(given);

    givenExisteUmRestauranteCadastradoNoSistemaComOsDados(and);

    when(
      /^uma requisição PUT é enviada para "(.*)" com o valor "(.*)" no campo "(.*)"$/,
      async (url, CNPJ, key) => {
        prismaMock.restaurant.findFirst.mockResolvedValueOnce(restaurants[0]);
        response = await request.put(url).send({ CNPJ });
      }
    );
    thenERetornadaUmaMensagemComStatus(then);

    thenAMensagemDiz(and);

    thenORestauranteEstaSalvoNoBancoDeDados(and, 0);

    thenORestauranteEstaSalvoNoBancoDeDados(and, 1);
  });

  test('Atualização mal sucedida dos dados de um restaurante (email já cadastrado)', async ({
    given,
    when,
    then,
    and,
  }) => {
    givenExisteUmRestauranteCadastradoNoSistemaComOsDados(given);

    givenExisteUmRestauranteCadastradoNoSistemaComOsDados(and);

    when(
      /^uma requisição PUT é enviada para "(.*)" com o valor "(.*)" no campo "(.*)"$/,
      async (url, email, key) => {
        prismaMock.restaurant.findFirst.mockResolvedValueOnce(restaurants[0]);
        response = await request.put(url).send({ email });
      }
    );

    thenERetornadaUmaMensagemComStatus(then);

    thenAMensagemDiz(and);

    thenORestauranteEstaSalvoNoBancoDeDados(and, 0);

    thenORestauranteEstaSalvoNoBancoDeDados(and, 1);
  });
});
