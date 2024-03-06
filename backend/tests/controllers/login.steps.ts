import { defineFeature, loadFeature } from 'jest-cucumber';
import app from '../../src/app';
import request from 'supertest';
import fs from 'fs';

const feature = loadFeature('./tests/features/login.feature');

defineFeature(feature, (test) => {
  let response: any; // Variável para armazenar a resposta da solicitação HTTP

  test('Login com sucesso', ({ given, when, then }) => {
    given(/^I am a registered user with email "([^"]*)" and password "([^"]*)"$/, async (email: string, password: string) => {
      // Adicionar o usuário no banco de dados fictício
      const users = JSON.parse(fs.readFileSync('./src/models/testUsers.json', 'utf8'));
      users.push({ email, password });
      fs.writeFileSync('./src/models/testUsers.json', JSON.stringify(users));
    });

    when(/^I log in with email "([^"]*)" and password "([^"]*)"$/, async (email: string, password: string) => {
      // Realizar uma solicitação HTTP para a rota de login
      response = await request(app)
        .post('/login')
        .send({ email, password });
    });

    then(/^I should be logged in successfully$/, async () => {
      // Verificar se a resposta da solicitação HTTP indica que o login foi bem-sucedido
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Login bem-sucedido.');
    });
  });

  test('Login com email inválido', ({ given, when, then }) => {
    let errorMessage: string; // Variável para armazenar a mensagem de erro

    given(/^there is no user registered with email "([^"]*)"$/, async (email: string) => {
      // Não é necessário adicionar nenhum usuário fictício aqui, pois queremos simular o cenário de usuário não encontrado
    });

    when(/^I log in with email "([^"]*)" and password "([^"]*)"$/, async (email: string, password: string) => {
      // Realizar uma solicitação HTTP para a rota de login
      response = await request(app)
        .post('/login')
        .send({ email, password });
    });

    then(/^I should receive an error message saying "([^"]*)"$/, async (expectedErrorMessage: string) => {
      // Verificar se a resposta da solicitação HTTP indica que ocorreu um erro e se a mensagem de erro está correta
      expect(response.status).toBe(404);
      expect(response.body.message).toBe(expectedErrorMessage);
    });
  });

  test('Login com senha inválida', ({ given, when, then }) => {
    let errorMessage: string; // Variável para armazenar a mensagem de erro

    given(/^I am a registered user with email "([^"]*)" and password "([^"]*)"$/, async (email: string, password: string) => {
      // Adicionar o usuário no banco de dados fictício
      const users = JSON.parse(fs.readFileSync('./src/models/testUsers.json', 'utf8'));
      users.push({ email, password });
      fs.writeFileSync('./src/models/testUsers.json', JSON.stringify(users));
    });

    when(/^I log in with email "([^"]*)" and password "([^"]*)"$/, async (email: string, password: string) => {
      // Realizar uma solicitação HTTP para a rota de login
      response = await request(app)
        .post('/login')
        .send({ email, password });
    });

    then(/^I should receive an error message saying "([^"]*)"$/, async (expectedErrorMessage: string) => {
      // Verificar se a resposta da solicitação HTTP indica que ocorreu um erro e se a mensagem de erro está correta
      expect(response.status).toBe(401);
      expect(response.body.message).toBe(expectedErrorMessage);
    });
  });
});
