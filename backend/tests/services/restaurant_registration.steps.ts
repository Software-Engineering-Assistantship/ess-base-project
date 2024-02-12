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

  const givenExisteUmRestauranteCadastradoNoSistemaComOsDados = (
    given: DefineStepFunction
  ) =>
    given(
      /^existe um restaurante cadastrado no sistema com os dados "(.*)" "(.*)", email "(.*)" e senha "(.*)"$/,
      async (name: string, cnpj: string, email: string, password: string) => {
        restaurants.push({
          id: restaurants.length + 1,
          name,
          cnpj,
          email,
          password,
        });
      }
    );

  const thenAMensagemContém = (then: DefineStepFunction) =>
    then(
      /^a mensagem contém "(.*)", "(.*)", "(.*)"$/,
      async (name, cnpj, email) => {
        await expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({ name, cnpj, email }),
          ])
        );
      }
    );

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

    then(
      /^é retornada uma mensagem com o status "(.*)"$/,
      async (statusCode) => {
        await expect(response.status).toBe(parseInt(statusCode, 10));
      }
    );

    thenAMensagemContém(and);
    thenAMensagemContém(and);
  });
});
