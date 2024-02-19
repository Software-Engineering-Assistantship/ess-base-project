import { defineFeature, loadFeature } from 'jest-cucumber';
import { PrismaClient } from '@prisma/client';

import database from '../database/connection';
import request from 'supertest';
import app from '../../app';

const feature = loadFeature('../backend/src/tests/features/categories.feature');
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
  

  test('Criar Categoria', ({ given, when, then, and }) => {  
    given(/^a API solicita os argumentos Nome como obrigatório e Descrição como opcional para a criação da categoria$/, 
        async () => {
          apiResponse = await request(app).post('/categories').send({ name:"Vestido" });
          expect(apiResponse.status).not.toBe(500);
    });
    
    when(/envio uma requisição POST para a rota \/categories com nome "(.*)" e a descrição "(.*)"$/, 
      async (name, description) => {
        apiResponse = await request(app).post('/categories').send({ name, description });
    });

    then(/^o status da resposta deve ser 201$/, async () => {
      expect(apiResponse.status).toBe(201);
    });
  });

  test('Criar categoria que ja existe', ({ given, when, then, and }) => {

    const existentCategory = {
      name: 'Vestido',
      description: 'bla'
    };

    given(/^a API solicita os argumentos Nome como obrigatório e Descrição como opcional para a criação da categoria$/, 
      async() => {
        await prismaTestClient.categorie.create({data: existentCategory})
      });

    when(/^envio uma requisição POST para a rota \/categories com nome "(.*)"$/, 
      async(name) =>{
        apiResponse = await request(app).post('/categories').send({ name })
    });

    then(/^o status da resposta deve ser 400$/, 
      async() => {
        expect(apiResponse.status).toBe(400);
      });
  });

  test('Remover Categoria', ({given, when, then, and }) => {

    given(/^Eu tenho uma categoria com id "(.*)" cadastrado$/, 
      async (id) => {
        await prismaTestClient.categorie.create({ data: {id: Number(id), name: 'Vestido'} })
    });

    when(/^Eu envio uma requisição DELETE para a rota \/categories\/1$/,
      async () =>{
        apiResponse = await request(app).delete('/categories/1')
    });

    then(/^o status da resposta deve ser 200$/, 
      async () => {
        expect(apiResponse.status).toBe(200);
    });

  });

  test('Atualizar Categoria', ({given, when, then, and }) => {

    given(/^Eu tenho uma categoria com o id "(.*)" e nome "(.*)" cadastrado$/, 
      async (id, nome) => {
        await prismaTestClient.categorie.create({data: {id: Number(id), name: nome, description: "bla"}});
      });

    and(/^a API Solicita os argumentos Nome e Descrição como opcional para a edição$/, () => {})

    when(/^Eu envio uma requisição PATCH para a rota \/categories\/1 com a Descrição "(.*)"$/, 
      async (description) => {
        apiResponse = await request(app).patch('/categories/1').send({description: description});
      });

    then(/^o status da resposta deve ser 200$/, 
      async () => {
        expect(apiResponse.status).toBe(200)
      });

  });

  test('Listar Itens', ({given, when, then, and }) => {

    given(/^Eu tenho uma Categoria com id "(.*)" cadastrado$/, 
      async (id) => {
        await prismaTestClient.categorie.create({data: {id: Number(id), name: "Calça"}})
      });

    when(/^Eu envio uma requisição GET para a rota \/categories$/, 
      async () => {
        apiResponse = await request(app).get("/categories")
      });

    then(/^o status da resposta deve ser 200$/, 
      async () => {
        expect(apiResponse.status).toBe(200)
      });
    
    and(/^o corpo da resposta deve conter a categoria com o id "(.*)"$/, 
      async(id) => {
        expect(apiResponse.body.data[0].id).toBe(Number(id))
      })
  });
});