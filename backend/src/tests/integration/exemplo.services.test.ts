import { defineFeature, loadFeature } from 'jest-cucumber';
import { PrismaClient } from '@prisma/client';

import database from '../database/connection';
import { response } from 'express';
import { request } from 'http';
import { copyFile } from 'fs';

const feature = loadFeature('../backend/src/tests/features/example.feature');
const prismaTestClient = new PrismaClient();
defineFeature(feature, (test) => {
  beforeAll(async () => {
    await database.clearValues();
    await database.connect();
  });

  afterAll(async () => {
    await database.clearValues();
    await database.disconnect();
  });
  test('Cadastro de entregador', ({ given, when, then, and }) => {
    given(
      /^não existe pessoa entregadora cadastrada  no banco de dados com cpf "(.*)"$/,
      async (cpf) => {
        [];
        const userExists = await prismaTestClient.deliveryPerson.findFirst({
          where: {
            cpf,
          },
        });

        expect(userExists).toBe(null);
      },
    );

    //     Scenario: Mudança de caractesticas
    // Given existe pessoa entregadora cadastrada  no banco de dados com cpf ""1111111111"
    // When uma nova requisição PATCH é feita para um end point '/deliveryperson' com o corpo da requisição nome: "Beatriz Freire", cpf: "1111111111", cep:'11111111' rua: "ricardo b@zerra", numero: "23", bairro: "livia", estado: "joao", cidade: "jove",  email: "beatriz@gmail.com", telefone: “81 81372017”
    // Then o Status resposta deve ser 200
    // And a resposta deve conter o detalhe "User updated"
    when(
      /^uma nova requisição POST é feita para um end point '\/deliveryperson' com o corpo da requisição nome: "(.*)", cpf: "(.*)", cep: "(.*)", rua: "(.*)", numero: "(.*)", bairro: "(.*)", estado: "(.*)", cidade: "(.*)", email: "(.*)", telefone: "(.*)"$/,
      async (
        name,
        cpf,
        cep,
        rua,
        numero,
        bairro,
        estado,
        cidade,
        email,
        telefone,
      ) => {
        // Cria o usuário
        const newUser = await prismaTestClient.deliveryPerson.create({
          data: {
            name,
            cpf,
            phone: telefone,
            email,
            status: 'active',
          },
        });

        // Cria o endereço
        const newAddress = await prismaTestClient.address.create({
          data: {
            postalCode: cep,
            street: rua,
            number: numero,
            district: bairro,
            city: cidade,
            state: estado,
            DeliveryPerson: {
              connect: { cpf: newUser.cpf },
            },
          },
        });

        expect(newUser).toHaveProperty('name', name);
        expect(newUser).toHaveProperty('email', email);
        expect(newUser).toHaveProperty('cpf', cpf);
        expect(newUser).toHaveProperty('phone', telefone);
      },
    );
    then(/^Deve ter um usuário com cpf "(.*)"$/, async (cpf) => {
      const user = await prismaTestClient.deliveryPerson.findFirst({
        where: {
          cpf: cpf,
        },
      });

      expect(user).toHaveProperty('cpf', cpf);
    });
  });

  test('Não conseguiu Cadastrar', ({ given, when, then }) => {
    const prismaTestClient = new PrismaClient();

    given(
      /^existe pessoa entregadora cadastrada no banco de dados com cpf "(.*)"$/,
      async (cpf) => {
        // Verifica se o usuário com o CPF já existe no banco de dados
        const userExists = await prismaTestClient.deliveryPerson.findFirst({
          where: {
            cpf,
          },
        });

        // Garante que o usuário com o CPF já exista no banco de dados
        expect(userExists).not.toBe(null);
      },
    );

    when(
      /^uma nova requisição POST é feita para um end point '\/deliveryperson' com o corpo da requisição nome: "(.*)", cpf: "(.*)", cep: "(.*)", rua: "(.*)", numero: "(.*)", bairro: "(.*)", estado: "(.*)", cidade: "(.*)", email: "(.*)", telefone: "(.*)"$/,
      async (
        name,
        cpf,
        cep,
        rua,
        numero,
        bairro,
        estado,
        cidade,
        email,
        telefone,
      ) => {
        // Verifica se já existe uma pessoa com o CPF fornecido
        const existingUser = await prismaTestClient.deliveryPerson.findFirst({
          where: {
            cpf,
          },
        });

        // Se já existir uma pessoa com o CPF fornecido, não faz nada e sai da função
        if (existingUser) {
          return;
        }

        // Caso contrário, cria o novo usuário
        const newUser = await prismaTestClient.deliveryPerson.create({
          data: {
            name,
            cpf,
            phone: telefone,
            email,
            status: 'active',
          },
        });

        // Verifica se o novo usuário foi criado corretamente
        expect(newUser).not.toBeNull();
        expect(newUser).toHaveProperty('name', name);
        expect(newUser).toHaveProperty('email', email);
        expect(newUser).toHaveProperty('cpf', cpf);
        expect(newUser).toHaveProperty('phone', telefone);

        // Cria o endereço
        const newAddress = await prismaTestClient.address.create({
          data: {
            postalCode: cep,
            street: rua,
            number: numero,
            district: bairro,
            city: cidade,
            state: estado,
            DeliveryPerson: {
              connect: { cpf: newUser.cpf },
            },
          },
        });
      },
    );

    then(/^Não deve criar um novo usuário com cpf "(.*)"$/, async (cpf) => {
      // Verifica novamente se o usuário com o CPF já existe no banco de dados
      const user = await prismaTestClient.deliveryPerson.findFirst({
        where: {
          cpf: cpf,
        },
      });

      // Garante que o usuário com o CPF já exista no banco de dados
      expect(user).not.toBe(null);

      // Verifica se o endereço foi criado para o novo usuário
    });
  });
});
// defineFeature(feature, (test) => {
//   test('Mudança de caractesticas', ({ given, when, then }) => {
//     const prismaTestClient = new PrismaClient();
//     given(
//       /^existe pessoa entregadora cadastrada  no banco de dados com cpf "(.*)"$/,
//       async (cpf) => {
//         await database.connect();
//         const userExists = await prismaTestClient.deliveryPerson.findFirst({
//           where: {
//             cpf,
//           },
//         });

//         expect(userExists).toBe(!null);
//       },
//     );

//     //     Scenario: Mudança de caractesticas
//     // Given existe pessoa entregadora cadastrada  no banco de dados com cpf ""1111111111"
//     // When uma nova requisição PATCH é feita para um end point '/deliveryperson' com o corpo da requisição nome: "Beatriz Freire", cpf: "1111111111", cep:'11111111' rua: "ricardo b@zerra", numero: "23", bairro: "livia", estado: "joao", cidade: "jove",  email: "beatriz@gmail.com", telefone: “81 81372017”
//     // Then o Status resposta deve ser 200
//     // And a resposta deve conter o detalhe "User updated"
//     when(
//       /^uma nova requisição PATCH é feita para um end point '\/deliveryperson' com o corpo da requisição nome: "(.*)", cpf: "(.*)", cep: "(.*)", rua: "(.*)", numero: "(.*)", bairro: "(.*)", estado: "(.*)", cidade: "(.*)", email: "(.*)", telefone: "(.*)"$/,
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
//         const newUser = await prismaTestClient.deliveryPerson.update({

//           where: {
//             cpf: cpf,
//           },
//           data: {
//             name,
//             phone: telefone,
//             email,
//           },
//         });
//         });

//         // Cria o endereço
//         const newAddress = await prismaTestClient.address.update({
//           where: {
//             DeliveryPerson: {
//               connect: { cpf: newUser.cpf },
//             },
//           },
//           data: {
//             postalCode: cep,
//             street: rua,
//             number: numero,
//             district: bairro,
//             city: cidade,
//             state: estado,
//             DeliveryPerson: {
//               connect: { cpf: newUser.cpf },
//             },
//           },
//         });

//         expect(newUser).toHaveProperty('name', name);
//         expect(newUser).toHaveProperty('email', email);
//         expect(newUser).toHaveProperty('cpf', cpf);
//         expect(newUser).toHaveProperty('phone', telefone);
//       },
//     );
//     then(
//       /^o usuário que tem cpf "(.*)" deve ser atualizado com nome: "(.*)", cpf: "(.*)", cep: "(.*)", rua: "(.*)", numero: "(.*)", bairro: "(.*)", estado: "(.*)", cidade: "(.*)", email: "(.*)", telefone: "(.*)"$/,
//       async (
//         cpf,
//         name,
//         cpfValue,
//         cep,
//         rua,
//         numero,
//         bairro,
//         estado,
//         cidade,
//         email,
//         telefone,
//       ) => {
//         const user = await prismaTestClient.deliveryPerson.findFirst({
//           where: {
//             cpf: cpf,
//           },
//           include: {
//             address: true, // Inclui os detalhes do endereço do usuário
//           },
//         });

//         expect(user).not.toBeNull(); // Verifica se o usuário existe

//         if (user) {
//           expect(user.name).toEqual(name);
//           expect(user.cpf).toEqual(cpfValue);

//           // Itera sobre cada endereço do usuário
//           user.address.forEach((address) => {
//             expect(address.postalCode).toEqual(cep);
//             expect(address.street).toEqual(rua);
//             expect(address.number).toEqual(numero);
//             expect(address.district).toEqual(bairro);
//             expect(address.state).toEqual(estado);
//             expect(address.city).toEqual(cidade);
//           });

//           expect(user.email).toEqual(email);
//           expect(user.phone).toEqual(telefone);
//         }

//         await database.clearValues();
//         await database.disconnect();
//       },
//     );
//   });
// });
