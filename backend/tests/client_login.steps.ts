import { loadFeature, defineFeature, DefineStepFunction } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../src/app';
import { prismaMock } from '../setupTests';
import { Client } from '@prisma/client';
import prisma from '../src/database';

const feature = loadFeature('tests/features/client_login.feature');
const request = supertest(app);

defineFeature(feature, (test) => {
  let response: supertest.Response;

  const givenClientExists = (given: DefineStepFunction) =>
    given(
      /^existe um cliente cadastrado com email "(.*)" e com senha "(.*)"$/,
      async (email: string, password: string) => {
        // Simulate client existence in database
        prismaMock.client.findUnique.mockResolvedValue({
          id: 1, // Supondo que o ID seja 1
          password: password,
          name: 'Caio Fernandes', // Nome de exemplo
          email: email,
          cpf: '123.456.789-00', // CPF de exemplo
          address: 'Rua Exemplo, 123', // Endereço de exemplo
        });
      }
    );

  const givenClientDoesNotExist = (given: DefineStepFunction) =>
    given(
      /^não existe um cliente cadastrado com email "(.*)"$/,
      async (email: string) => {
        // Simulate client does not exist in database
        prismaMock.client.findUnique.mockResolvedValue(null);
      }
    );

  const whenLoginRequestIsSent = (when: DefineStepFunction) =>
    when(
      /^uma requisição POST é enviada para "(.*)" com os dados "(.*)" e "(.*)"$/,
      async (url: string, email: string, password: string) => {
        // Simulate sending login request
        response = await request.post(url).send({ email, password });
      }
    );

  const thenDataIsFoundInDatabase = (then: DefineStepFunction) =>
    then(/^os dados são encontrados no banco de dados$/, async () => {
      // Verify if data is found in the database
      expect(prismaMock.client.findUnique).toHaveBeenCalled();
    });

  const thenDataIsNotFoundInDatabase = (then: DefineStepFunction) =>
    then(/^o email "(.*)" não é encontrado no banco de dados$/, async (email: string) => {
      // Verify if data is not found in the database
      expect(prismaMock.client.findUnique).toHaveBeenCalledWith({
        where: { email },
      });
    });

  const thenPasswordNotFoundInDatabase = (then: DefineStepFunction) =>
    then(
      /^a senha "(.*)" não é encontrada no banco de dados$/,
      async (password: string) => {
        // Simulate password not found in the database
        prismaMock.client.findUnique.mockResolvedValue({
          id: 1, // Supondo que o ID seja 1
          password: 'wrong_password',
          name: 'Caio Fernandes', // Nome de exemplo
          email: 'cvmfc@cin.ufpe.br',
          cpf: '123.456.789-00', // CPF de exemplo
          address: 'Rua Exemplo, 123', // Endereço de exemplo
        });
      }
    );

  const thenStatusIsReturned = (then: DefineStepFunction) =>
    then(/^é retornado status "(.*)"$/, async (status: string) => {
      // Verify if expected status is returned
      expect(response.status).toBe(parseInt(status, 10));
    });

  const thenLoginFails = (then: DefineStepFunction) =>
    then(/^o login não pode ser concluído$/, async () => {
      // Verify if login fails
      expect(response.body).toEqual(expect.objectContaining({ success: false }));
    });

  const thenLoginSucceeds = (then: DefineStepFunction) =>
    then(/^o login é realizado com sucesso$/, async () => {
      // Verify if login succeeds
      expect(response.body).toEqual(expect.objectContaining({ success: true }));
    });

  test('Login realizado com sucesso', ({ given, when, then }) => {
    givenClientExists(given);
    whenLoginRequestIsSent(when);
    thenDataIsFoundInDatabase(then);
    thenStatusIsReturned(then);
    thenLoginSucceeds(then);
  });

  test('Login fracassou, pois a senha está incorreta', ({ given, when, then }) => {
    givenClientExists(given);
    whenLoginRequestIsSent(when);
    thenPasswordNotFoundInDatabase(then);
    thenStatusIsReturned(then);
    thenLoginFails(then);
  });

  test('Login fracassou, pois o email não está cadastrado', ({ given, when, then }) => {
    givenClientDoesNotExist(given);
    whenLoginRequestIsSent(when);
    thenDataIsNotFoundInDatabase(then);
    thenStatusIsReturned(then);
    thenLoginFails(then);
  });
});
