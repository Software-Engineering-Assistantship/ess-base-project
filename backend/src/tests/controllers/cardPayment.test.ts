import { defineFeature, loadFeature } from 'jest-cucumber';
import { CardPayment, PrismaClient, User } from '@prisma/client';

import database from '../database/connection';
import request from 'supertest';
import app from '../../app';
import { print } from '@swc/core';
import { number } from 'zod';
import cardPayment from '../../controllers/CardPaymentController';
import { CardPaymentRepository } from '@repositories';
import cardPaymentRepository from '../../repositories/cardPaymentRepository';

const feature = loadFeature('../backend/src/tests/features/cardPayment.feature');
const prismaTestClient = new PrismaClient();
let apiResponse: request.Response;

defineFeature(feature, test => {

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
  
  test('Visualização dos métodos de pagamento quando existem', ({ given, when, then, and }) => {  
    let User: User;
    given(/^há usuário cadastrado com CPF "(.*)"$/, async (cpf) => {
        User = await prismaTestClient.user.create({data: {name: "José", cpf:cpf, phone: "77777777", email:"test@test.com", password:"40028922"}})
        const userExist = await prismaTestClient.user.findFirst({
          where: {cpf}
        })

        expect(userExist?.cpf).toBe(cpf)
      });
  
    and(/^há cartão cadastrado com o card_number "(.*)" e type "(.*)"$/, async (card_number, type) => { 
      const Card = await prismaTestClient.cardPayment.create({data: {number: User.id, card_number, cvv: 777, expire_date: new Date(), name: "José", password: "282828", type:"credit"}})
      const cardExists = await prismaTestClient.cardPayment.findFirst({
        where:{
          card_number,
          type
        },
      });

      expect(cardExists?.card_number).toBe(card_number);
      expect(cardExists?.type).toBe(type);
    });
    
    when(/^uma nova requisição GET é feita para o endpoint "(.*)"$/, async (
      endpoint
    ) => {
      apiResponse = await request(app).get(`${endpoint}/${User.id}`)
    });

    then(/^o usuário com CPF "(.*)" vê o cartão de card_number "(.*)" e type "(.*)"$/, async (cpf, card_number, type) => {
      expect(apiResponse.body.data[0]).toHaveProperty('card_number', card_number);
      expect(apiResponse.body.data[0]).toHaveProperty('type', type);
    });
  });

  test('Visualização dos métodos de pagamento quando não existem', ({ given, when, then, and }) => {  
    let User: User;
    given(/^há usuário cadastrado com CPF "(.*)"$/, async (cpf) => {
        User = await prismaTestClient.user.create({data: {name: "José", cpf:cpf, phone: "77777777", email:"test@test.com", password:"40028922"}})
        const userExist = await prismaTestClient.user.findFirst({
          where: {cpf}
        })

        expect(userExist?.cpf).toBe(cpf)
      });

    and(/^não há cartão cadastrado no banco de dados$/, async() =>{});

    when(/^uma nova requisição GET é feita para o endpoint "(.*)"$/, async (
      endpoint
    ) => {
      apiResponse = await request(app).get(`${endpoint}/${User.id}`)
    });

    then(/^o usuário com CPF "(.*)" vê o status "(.*)" e a mensagem "(.*)"$/, async (cpf, status, message) => {
      expect(apiResponse.status).toBe((Number(status)));
      expect(apiResponse.body.message).toBe(message);
    });
  });

  test('Cadastro de novo cartão no banco de dados', ({ given, when, then, and }) => {
    let User: User;
    given(/^há usuário cadastrado com CPF "(.*)"$/, async (cpf) => {
        User = await prismaTestClient.user.create({data: {name: "José", cpf:cpf, phone: "77777777", email:"test@test.com", password:"40028922"}})
        const userExist = await prismaTestClient.user.findFirst({
          where: {cpf}
        })

        expect(userExist?.cpf).toBe(cpf)
      });

    and(/^não há cartão cadastrado com o card_number "(.*)" e type "(.*)"$/, async (card_number, type) => { 
      const cardExists = await prismaTestClient.cardPayment.findFirst({
        where:{
          card_number,
          type
        },
      });

      expect(cardExists).toBe(null);
    });

    when(/^uma nova requisição POST é feita para o endpoint "(.*)" com o body: card_number: "(.*)", name: "(.*)", expire_date: "(.*)", password: "(.*)", type "(.*)" e CVV "(.*)"$/, async (
      endpoint, card_number, name, expire_date, password, type, cvv) => {
      const [month, year] = expire_date.split('/')
      cvv = parseInt(cvv)
      
      apiResponse = await request(app)
          .post(`${endpoint}`)
          .send({
            cardCreatedData: {
              card_number,
              name,
              expire_date: new Date(+month, +year),
              password,
              type,
              cvv,
            },
            User_id: User.id,
      });
    });

    then(/^o cadastro do cartão com o card_number "(.*)" e type "(.*)" no banco de dados é realizado com sucesso$/, async(card_number, type) =>{
      const cardExists = await prismaTestClient.cardPayment.findFirst({
        where:{
          card_number,
          type
        },
      });

      expect(cardExists?.card_number).toBe(card_number);
      expect(cardExists?.type).toBe(type);
    });

    and(/^o código de resposta é "(.*)" Created e a mensagem "(.*)" é exibida$/, async(status, message) =>{
      expect(apiResponse.status).toBe(Number(status))
      expect(apiResponse.body.message).toBe(message)
    });
  });

  test('Cadastro de novo cartão de mesmo card_number, mas types diferentes', ({ given, when, then, and }) => {
    let User: User;
    given(/^há usuário cadastrado com CPF "(.*)"$/, async (cpf) => {
      User = await prismaTestClient.user.create({data: {name: "José", cpf:cpf, phone: "77777777", email:"test@test.com", password:"40028922"}})
      const userExist = await prismaTestClient.user.findFirst({
        where: {cpf}
      })

      expect(userExist?.cpf).toBe(cpf)
    });

    and(/^não há cartão cadastrado com o card_number "(.*)" e type "(.*)"$/, async (card_number, type) => { 
      const cardExists = await prismaTestClient.cardPayment.findFirst({
        where:{
          card_number,
          type
        },
      });

      expect(cardExists).toBe(null);
    });

    and(/^há cartão cadastrado com o card_number "(.*)" e type "(.*)"$/, async (card_number, type) => { 
      const Card = await prismaTestClient.cardPayment.create({data: {number: User.id, card_id:'1' , card_number, cvv: 777, expire_date: new Date(), name: "José", password: "282828", type:"credit"}})
      const cardExists = await prismaTestClient.cardPayment.findFirst({
        where:{
          card_number,
          type
        },
      });

      expect(cardExists?.card_number).toBe(card_number);
      expect(cardExists?.type).toBe(type);
    });

    when(/^uma nova requisição POST é feita para o endpoint "(.*)" com o body: card_number: "(.*)", name: "(.*)", expire_date: "(.*)", password: "(.*)", type "(.*)" e CVV "(.*)"$/, async (
      endpoint, card_number, name, expire_date, password, type, cvv) => {
      const [month, year] = expire_date.split('/')
      cvv = parseInt(cvv)

      apiResponse = await request(app)
        .post(`${endpoint}`)
        .send({
          cardCreatedData: {
            card_id: '2',
            card_number,
            name,
            expire_date: new Date(+month, +year),
            password,
            type,
            cvv,
          },
          User_id: User.id,
      });
    });

    then(/^o cadastro do cartão com o card_number "(.*)" e type "(.*)" no banco de dados é realizado com sucesso$/, async(card_number, type) =>{
      const cardExists1 = await cardPaymentRepository.findByCardId('1');
      expect(cardExists1?.card_number).toBe(card_number)
      expect(cardExists1?.type).toBe('credit')

      const cardExists2 = await cardPaymentRepository.findByCardId('2');      
      expect(cardExists2?.card_number).toBe(card_number)
      expect(cardExists2?.type).toBe(type)
    });

    and(/^o código de resposta é "(.*)" Created e a mensagem "(.*)" é exibida$/, async(status, message) =>{
      expect(apiResponse.status).toBe(Number(status))
      expect(apiResponse.body.message).toBe(message)
    });
  });

  test('Cadastro de cartão de crédito repetido no banco de dados', ({ given, when, then, and }) => {
    let User: User;
    given(/^há usuário cadastrado com CPF "(.*)"$/, async (cpf) => {
      User = await prismaTestClient.user.create({data: {name: "José", cpf:cpf, phone: "77777777", email:"test@test.com", password:"40028922"}})
      const userExist = await prismaTestClient.user.findFirst({
        where: {cpf}
      })

      expect(userExist?.cpf).toBe(cpf)
    });

    and(/^há cartão cadastrado com o card_number "(.*)" e type "(.*)"$/, async (card_number, type) => { 
      const Card = await prismaTestClient.cardPayment.create({data: {number: User.id, card_number, cvv: 777, expire_date: new Date(), name: "José", password: "282828", type:"credit"}})
      const cardExists = await prismaTestClient.cardPayment.findFirst({
        where:{
          card_number,
          type
        },
      });

      expect(cardExists?.card_number).toBe(card_number);
      expect(cardExists?.type).toBe(type);
    });

    when(/^uma nova requisição POST é feita para o endpoint "(.*)" com o body: card_number: "(.*)", name: "(.*)", expire_date: "(.*)", password: "(.*)", type "(.*)" e CVV "(.*)"$/, async (
      endpoint, card_number, name, expire_date, password, type, cvv) => {
      const [month, year] = expire_date.split('/')
      cvv = parseInt(cvv)
      
      apiResponse = await request(app)
        .post(`${endpoint}`)
        .send({
          cardCreatedData: {
            card_id: "254",
            card_number,
            name,
            expire_date: new Date(+month, +year),
            password,
            type,
            cvv,
          },
      });
    });

    then(/^o cadastro do cartão não é realizado com sucesso$/, async() =>{
      const cardExists = await CardPaymentRepository.findByCardId("254");

      expect(cardExists).toBe(null)
    });

    and(/^o código de resposta é "(.*)" Bad Request e a mensagem "(.*)" são exibidos$/, async(status, message) =>{
      expect(apiResponse.status).toBe(Number(status))
      expect(apiResponse.body.message).toBe(message)
    });
  });

  test('Remoção de cartão de crédito no banco de dados com sucesso', ({ given, when, then, and }) => {
    let User: User;
    let cardDeleted: CardPayment;
    given(/^há usuário cadastrado com CPF "(.*)"$/, async (cpf) => {
      User = await prismaTestClient.user.create({data: {name: "José", cpf:cpf, phone: "77777777", email:"test@test.com", password:"40028922"}})
      const userExist = await prismaTestClient.user.findFirst({
        where: {cpf}
      })

      expect(userExist?.cpf).toBe(cpf)
    });

    and(/^há cartão cadastrado com o card_number "(.*)" e type "(.*)"$/, async (card_number, type) => { 
      cardDeleted = await prismaTestClient.cardPayment.create({data: {number: User.id, card_number, cvv: 777, expire_date: new Date(), name: "José", password: "282828", type}})
      const cardExists = await prismaTestClient.cardPayment.findFirst({
        where:{
          card_number,
          type
        },
      });

      expect(cardExists?.card_number).toBe(card_number);
      expect(cardExists?.type).toBe(type);
    });


    when(/^uma nova requisição DELETE é feita para o endpoint "(.*)"$/, async (endpoint) => {
      apiResponse = await request(app).delete(`${endpoint}/${cardDeleted.card_id}`);
    });

    then(/^o banco de dados deleta o cartão com sucesso$/, async() =>{
      const cardExists = await CardPaymentRepository.findByCardId(cardDeleted.card_id);

      expect(cardExists).toBe(null)
    });

    and(/^o código de resposta "(.*)" OK e a mensagem "(.*)" são exibidos$/, async(status, message) =>{
      expect(apiResponse.status).toBe(Number(status))
      expect(apiResponse.body.message).toBe(message)
    });
  });

  test('Cadastro de cartão de crédito com dados incompletos', ({ given, when, then, and }) => {
    let User: User;
    let cardExists: CardPayment;
    given(/^há usuário cadastrado com CPF "(.*)"$/, async (cpf) => {
      User = await prismaTestClient.user.create({data: {name: "José", cpf:cpf, phone: "77777777", email:"test@test.com", password:"40028922"}})
      const userExist = await prismaTestClient.user.findFirst({
        where: {cpf}
      })

      expect(userExist).not.toBe(null)
    });

    when(/^uma nova requisição POST é feita para o endpoint "(.*)" com o body: card_number: "(.*)", name: "(.*)", expire_date: "(.*)", password: "(.*)", type "(.*)" e CVV "(.*)"$/, async (
      endpoint, card_number, name, expire_date, password, type, cvv) => {
      const [month, year] = expire_date.split('/')
      cvv = parseInt(cvv)
      apiResponse = await request(app)
        .post(`${endpoint}`)
        .send({
          cardCreatedData: {
            card_id: "254",
            card_number,
            name,
            expire_date: new Date(+month, +year),
            password,
            type,
            cvv,
          },
      });
    });

    then(/^o cadastro do cartão não é realizado com sucesso$/, async() =>{
      const cardExists = await CardPaymentRepository.findByCardId("254");
    
      expect(cardExists).toBe(null)
    });

    and(/^o código de resposta é "(.*)" Bad Request e a mensagem "(.*)" é exibida$/, async(status, message) =>{
      expect(apiResponse.status).toBe(Number(status))
      expect(apiResponse.body.message).toBe(message)
    });
  });
});
