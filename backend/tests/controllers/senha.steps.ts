import { defineFeature, loadFeature } from 'jest-cucumber';
import app from '../../src/app';
import request from 'supertest';
import fs from 'fs';

const feature = loadFeature('./tests/features/login.feature');

defineFeature(feature, (test) => {
  let response: any; // Variável para armazenar a resposta da solicitação HTTP

  test('Recuperação de senha com sucesso', ({ given, when, then }) => {
    given(/^I am a registered user with email "([^"]*)" and password "([^"]*)"$/, async (email: string, password: string) => {
      // Adicionar o usuário no banco de dados fictício
      const users = JSON.parse(fs.readFileSync('./src/models/testUsers.json', 'utf8'));
      users.push({ email, password });
      fs.writeFileSync('./src/models/testUsers.json', JSON.stringify(users));
    });

    when(/^I request to reset the password for email "([^"]*)"$/, async (email: string) => {
      // Realizar uma solicitação HTTP para a rota de recuperação de senha
      response = await request(app)
        .post('/reset-password')
        .send({ email });
    });

    then(/^I should receive the current password for the user$/, async () => {
      // Verificar se a resposta da solicitação HTTP contém a senha atual do usuário
      expect(response.status).toBe(200);
      expect(response.body.password).toBeDefined();
    });
  });

  test('Recuperação de senha para usuário não encontrado', ({ given, when, then }) => {
    let errorMessage: string; // Variável para armazenar a mensagem de erro

    given(/^there is no user registered with email "([^"]*)"$/, async (email: string) => {
      // Não é necessário adicionar nenhum usuário fictício aqui, pois queremos simular o cenário de usuário não encontrado
    });

    when(/^I request to reset the password for email "([^"]*)"$/, async (email: string) => {
      // Realizar uma solicitação HTTP para a rota de recuperação de senha
      response = await request(app)
        .post('/reset-password')
        .send({ email });
    });

    then(/^I should receive an error message saying "([^"]*)"$/, async (expectedErrorMessage: string) => {
      // Verificar se a resposta da solicitação HTTP indica que ocorreu um erro e se a mensagem de erro está correta
      expect(response.status).toBe(404);
      expect(response.body.message).toBe(expectedErrorMessage);
    });
  });
});
