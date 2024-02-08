// import { defineFeature, loadFeature } from 'jest-cucumber';
// import { PrismaClient } from '@prisma/client';

// import database from '../database/connection';
// import request from 'supertest';
// import app from '../../app';

// const feature = loadFeature('../features/entregadores.feature');
// const prismaTestClient = new PrismaClient();
// let apiResponse: request.Response;

// defineFeature(feature, (test) => {
//   beforeAll(async () => {
//     await database.clearValues();
//     await database.connect();
//   });

//   afterAll(async () => {
//     await database.clearValues();
//     await database.disconnect();
//   });

//   test('Cadastro e Manutenção dos entregadores', ({
//     given,
//     when,
//     then,
//     and,
//   }) => {
//     given(
//       /^não existe pessoa entregadora cadastrada  no banco de dados com cpf "(.*)"$/,
//       async (cpf) => {
//         const userExists = await prismaTestClient.deliveryPerson.findFirst({
//           where: {
//             cpf,
//           },
//         });

//         expect(userExists).toBe(null);
//       },
//     );

//     when(
//       /^uma nova requisição POST é feita para um end point '\/deliveryperson' com o corpo da requisição nome: "(.*)", cpf: "(.*)", cep: "(.*)", rua: "(.*)", numero: "(.*)", bairro: "(.*)", estado: "(.*)", cidade: "(.*)", email: "(.*)", telefone: "(.*)"$/,
//       async (
//         name,
//         cpf,
//         cep,
//         rua,
//         numero,
//         bairro,
//         estado,
//         cidade,
//         email,
//         telefone,
//       ) => {
//         // Cria o usuário
//         const apiResponse = await request(app).post('/deliveryperson').send({
//           name,
//           cpf,
//           cep,
//           rua,
//           numero,
//           bairro,
//           estado,
//           cidade,
//           email,
//           telefone,
//         });
//       },
//     );

//     then(/^o Status resposta deve ser 201"(.*)"$/, (async) => {
//       expect(apiResponse.status).toBe(201);
//     });
//     and(/^a resposta deve conter o detalhe "User created" "(.*)"$/, (async) => {
//       expect(apiResponse.body).toBe('User created');
//     });
//   });
// });
