import { loadFeature, defineFeature, DefineStepFunction } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import { prismaMock } from '../../setupTests';
import { Client } from '@prisma/client';

const feature = loadFeature(
  'tests/features/client_registration.feature'
);
const request = supertest(app);

defineFeature(feature, (test) => {
  let response: supertest.Response;
  let clients: Client[] = [];

  
  afterEach(() => {
    clients = [];
  });



  test('E-mail usado no cadastro já está cadastrado', ({ given, when, then, and }) => {
    given(/^um cliente cadastrado no sistema com os dados id "(.*)" "(.*)" "(.*)", email "(.*)" endereço "(.*)" senha "(.*)"$/,
     async (id, name, cpf, email, address, password) => {
      clients.push({
        id: parseInt(id, 10),
        password,
        name,
        email,
        cpf,
        address,
      })
    });

    when(/^uma requisição POST é enviada para "(.*)" com os valores "(.*)",  "(.*)", email "(.*)", senha "(.*)", endereco "(.*)"$/,
      async (url, name, cpf, email, address, password) => {
        prismaMock.client.findFirst.mockResolvedValueOnce(clients[0]);
        prismaMock.client.create.mockResolvedValue({
          id: clients.length + 1,
          password,
          name,
          email,
          cpf,
          address
        });
        response = await request.post(url).send({
          password,
          name,
          email,
          cpf,
          address
        });
    });

    then(/^é retornada uma mensagem com status "(.*)"$/,
    async (status) => {
      expect(response.status).toBe(parseInt(status,10));
    });

    and(/^retorna uma mensagem "(.*)"$/,
    async (message) => {
      expect(response.body).toEqual(expect.objectContaining({ message }));
    });

  });



  test('CPF usado no cadastro já está cadastrado', ({ given, when, then, and }) => {
    given(/^um cliente cadastrado no sistema com os dados id "(.*)" "(.*)" "(.*)", email "(.*)" endereço "(.*)" senha "(.*)"$/,
    async (id, name, cpf, email, address, password) => {
      clients.push({
        id: parseInt(id, 10),
        password,
        name,
        email,
        cpf,
        address,
      })
    });


    when(/^uma requisição POST é enviada para "(.*)" com os valores "(.*)",  "(.*)", email "(.*)", senha "(.*)", endereco "(.*)"$/,
    async (url, name, cpf, email, address, password) => {
      prismaMock.client.findFirst.mockResolvedValueOnce(clients[0]);
      prismaMock.client.create.mockResolvedValue({
        id: clients.length + 1,
        password,
        name,
        email,
        cpf,
        address
      });
      response = await request.post(url).send({
        password,
        name,
        email,
        cpf,
        address
      });
    });

    then(/^é retornada uma mensagem com status "(.*)"$/,
    async (status) => {
      expect(response.status).toBe(parseInt(status,10));
    });

    and(/^retorna uma mensagem "(.*)"$/,
    async (message) => {
      expect(response.body).toEqual(expect.objectContaining({ message }));
    });
  });


  test('Remover conta', ({ given, when, then, and }) => {
    given(/^um cliente cadastrado no sistema com os dados id "(.*)" "(.*)" "(.*)", email "(.*)" endereço "(.*)" senha "(.*)"$/,
    async (Id, name, cpf, email, address, password) => {
      clients.push({
        id: parseInt(Id, 10),
        password,
        name,
        email,
        cpf,
        address,
      })
    });


    when(/^uma requisição DELETE é enviada para "(.*)"$/,
    async (url) => {
      prismaMock.client.findFirst.mockResolvedValue(clients[0]);
      prismaMock.client.delete.mockResolvedValue(clients[0]);
      response = await request.delete(url);
    });

    then(/^é retornada uma mensagem com o status "(.*)"$/,
    async (status) => {
      expect(response.status).toBe(parseInt(status,10));
    });


    and(/^retorna uma mensagem "(.*)"$/,
    async (message) => {
      expect(response.body).toEqual(expect.objectContaining({ message }));
    });

  });

  test('Leitura de cliente do sistema', ({ given, when, then, and }) => {
    given(/^um cliente cadastrado no sistema com os dados id "(.*)" "(.*)" "(.*)", email "(.*)" endereço "(.*)" senha "(.*)"$/,
    async (id, name, cpf, email, address, password) => {
      clients.push({
        id: parseInt(id, 10),
        password,
        name,
        email,
        cpf,
        address,
      })
    });

    when(/^uma requisição GET é enviada para "(.*)"$/,
    async ( url) => {
      prismaMock.client.findMany.mockResolvedValue(clients);
      response = await request.get(url);
    });

    then(/^é retornada uma mensagem com status "(.*)"$/,
    async (status) => {
      expect(response.status).toBe(parseInt(status,10));
    });

    and(/^a mensagem contém "(.*)" "(.*)", email "(.*)" endereço "(.*)"$/,
    async (arg0, arg1, arg2, arg3) => {

    });
  });


  test('Alteração de e-mail mal sucedida', ({ given, and, when, then }) => {
    given(/^um cliente cadastrado no sistema com os dados id "(.*)" "(.*)" "(.*)", email "(.*)" endereço "(.*)" senha "(.*)"$/,
    async (id, name, cpf, email, address, password) => {
      clients.push({
        id: parseInt(id, 10),
        password,
        name,
        email,
        cpf,
        address,
      })
    });

    and(/^um cliente cadastrado no sistema com os dados id "(.*)" "(.*)" "(.*)", email "(.*)" endereço "(.*)" senha "(.*)"$/,
    async (id, name, cpf, email, address, password) => {
      clients.push({
        id: parseInt(id, 10),
        password,
        name,
        email,
        cpf,
        address,
      })
    });

    when(/^uma requisição PUT é enviada para "(.*)" com os valores "(.*)",  "(.*)", email "(.*)", endereco "(.*)" senha "(.*)"$/,
    async (url, name, cpf, email, address, password) => {
      prismaMock.client.findFirst.mockResolvedValueOnce(clients[0]);
      console.log(email);
      console.log(clients[0].email);
      console.log(clients[1].email);
    response = await request.put(url).send({ email });
    });

    then(/^é retornada uma mensagem com status "(.*)"$/,
    async (status) => {
      expect(response.status).toBe(parseInt(status,10));
    });

    and(/^retorna uma mensagem "(.*)"$/,
    async (message) => {
      expect(response.body).toEqual(expect.objectContaining({ message }));
    });
  });


});