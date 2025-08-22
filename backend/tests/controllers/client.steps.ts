import { defineFeature, loadFeature, DefineStepFunction } from 'jest-cucumber';
import request from 'supertest';
import app from '../../src/app';
import { prismaMock } from '../../setupTests';
import { Customer } from '../../src/controllers/client.controller';
import { HttpConflictError } from '../../src/utils/errors/http.error';
import SetupDatabaseTest from '../../src/database/setupDatabaseTest';
import { Client } from '@prisma/client';
import bcrypt from 'bcrypt';

const feature = loadFeature('tests/features/client.feature');

let lastId = 0;

const generateId = () => {
    return ++lastId;
};

const mockHashedPassword = '$2b$10$B9j68DzP1ruNn5qyPCqXVO.TOFNGKvldEDasLhfLOAt169ytexgxK';

const createClient = async (email: string, password: string) => {
    return {
        id: 1,
        name: 'Bárbara Alencar',
        email: email,
        username: 'barbaralencar',
        password: mockHashedPassword,
        cpf: '021.957.235-12',
        phone: '(81) 99342-3591',
        birthDate: '1984/09/12',
    };
};

const clientExist = async (email: string) => {
    return {
        id: 1,
        name: 'Bárbara Alencar',
        email: email,
        username: 'barbaralencar',
        password: mockHashedPassword,
        cpf: '021.957.235-12',
        phone: '(81) 99342-3591',
        birthDate: '1984/09/12',
    };
};

const createCustomerPayload = (
    name: string,
    email: string,
    username: string,
    cpf: string,
    phone: string,
    birthDate: string,
    password: string,
) => {
    return { id: 1, name, email, username, cpf, phone, birthDate, password } as Client;
};

defineFeature(feature, (test) => {
    let response: request.Response;
    let clients: Client[] = [];
    const setupDBTest = new SetupDatabaseTest();
    //setupDBTest.resetDatabase();

    beforeAll(async () => {
        jest.clearAllMocks();
        jest.spyOn(bcrypt, 'hash').mockImplementation(async () => mockHashedPassword); // Mock bcrypt.hash to return the same hash
        await setupDBTest.resetDatabase();
    });

    afterAll(async () => {
        clients = [];
        await setupDBTest.resetDatabase();
    });

    const givenNewUser = (given: DefineStepFunction) =>
        given('que eu sou um novo usuário', async () => {
            const client = await createClient('barbara.alencar@gmail.com', '@AmoBolo123');
            clients.push(client);
            prismaMock.client.create.mockResolvedValue(client);
        });

    const givenEmailExists = (given: DefineStepFunction) =>
        given(/^que o e-mail "(.*)" já está cadastrado$/, async (email) => {
            const existingClient = await clientExist(email);
            //console.log('existingClient:', existingClient);
            clients.push(existingClient);
            prismaMock.client.findUnique.mockResolvedValue(existingClient);
            /*console.log(
                'prismaMock.client.findUnique.mockResolvedValue(existingClient);',
                prismaMock.client.findUnique.mockResolvedValue(existingClient),
            );*/
        });

    const givenUsernameExists = (given: DefineStepFunction) =>
        given(/^que o nome de usuário "(.*)" já está cadastrado$/, async (username) => {
            const existingClient = await createClient('barbara.alencar@gmail.com', '@AmoBolo123');
            existingClient.username = username;
            prismaMock.client.findUnique.mockResolvedValue(existingClient);
        });

    const whenSendRegisterRequest = (when: DefineStepFunction) =>
        when(
            /^eu envio uma solicitação de cadastro com o nome "(.*)", email "(.*)", username "(.*)", cpf "(.*)", phone "(.*)", birthDate "(.*)" e password "(.*)"$/,
            async (name, email, username, cpf, phone, birthDate, password) => {
                const payload = createCustomerPayload(
                    name,
                    email,
                    username,
                    cpf,
                    phone,
                    birthDate,
                    password,
                );
                //console.log('Payload enviado:', payload);
                response = await request(app).post('/client/create').send(payload);
                //console.log('Resposta recebida:', response.body);
            },
        );

    const thenRegistrationShouldBeSuccessful = (then: DefineStepFunction) =>
        then('o cadastro deve ser realizado com sucesso', () => {
            expect(response.status).toBe(201);
        });

    const thenShouldReceiveConfirmationMessage = (then: DefineStepFunction) =>
        then('eu devo receber uma mensagem de confirmação:', (expectedResponse) => {
            const expected = JSON.parse(expectedResponse);
            expect(response.body.user).toMatchObject({
                id: clients[0].id,
                name: clients[0].name,
                email: clients[0].email,
                username: clients[0].username,
                cpf: clients[0].cpf,
                phone: clients[0].phone,
                birthDate: clients[0].birthDate,
                password: clients[0].password,
            });
            expect(response.body.user.id).toBeDefined();
        });

    const thenRegistrationShouldFail = (then: DefineStepFunction) =>
        then('o cadastro não deve ser realizado', () => {
            if (response.status !== 400) {
                console.error('Erro na solicitação Client:', response.body);
                //console.log('clients list', clients);
            }
            expect(response.status).toBe(400); // Conflict status
        });
    const thenRegistrationShouldFailBecauseIncorretField = (then: DefineStepFunction) =>
        then('o cadastro não deve ser realizado', () => {
            expect(response.status).toBe(400); // campo preenchido incorretamente
        });

    const thenShouldReceiveErrorMessage = (then: DefineStepFunction) =>
        then(
            'eu devo receber uma mensagem de erro indicando que o e-mail já está em uso:',
            (expectedResponse) => {
                const expected = JSON.parse(expectedResponse);
                expect(response.body.msg).toBe(expected.msg);
            },
        );

    const thenShouldReceiveUsernameErrorMessage = (then: DefineStepFunction) =>
        then(
            'eu devo receber uma mensagem de erro indicando que o nome de usuário já está em uso:',
            (expectedResponse) => {
                const expected = JSON.parse(expectedResponse);
                expect(response.body.msg).toBe(expected.msg);
            },
        );

    const thenShouldReceiveInvalidPasswordMessage = (then: DefineStepFunction) =>
        then(
            'eu devo receber uma mensagem de erro indicando que a senha é inválida:',
            (expectedResponse) => {
                const expected = JSON.parse(expectedResponse);
                expect(response.body.message).toContain('A senha deve ter mais de 6 dígitos');
            },
        );

    test('Cadastro Bem-Sucedido de Usuário Cliente', ({ given, when, then }) => {
        givenNewUser(given);
        whenSendRegisterRequest(when);
        thenRegistrationShouldBeSuccessful(then);
        thenShouldReceiveConfirmationMessage(then);
    });

    test('Cadastro Mal-Sucedido de Usuário Cliente por E-mail já Cadastrado', ({
        given,
        when,
        then,
    }) => {
        givenEmailExists(given);
        whenSendRegisterRequest(when);
        thenRegistrationShouldFail(then);
        thenShouldReceiveErrorMessage(then);
    });

    test('Cadastro Mal-Sucedido de Usuário Cliente por Usuário já Cadastrado', ({
        given,
        when,
        then,
    }) => {
        givenUsernameExists(given);
        whenSendRegisterRequest(when);
        thenRegistrationShouldFail(then);
        thenShouldReceiveUsernameErrorMessage(then);
    });

    test('Cadastro Mal-Sucedido de Usuário Cliente por Senha Inválida', ({ given, when, then }) => {
        givenNewUser(given);
        whenSendRegisterRequest(when);
        thenRegistrationShouldFailBecauseIncorretField(then);
        thenShouldReceiveInvalidPasswordMessage(then);
    });
});
