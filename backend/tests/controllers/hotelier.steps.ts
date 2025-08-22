import { defineFeature, loadFeature, DefineStepFunction } from 'jest-cucumber';
import request from 'supertest';
import app from '../../src/app';
import { prismaMock } from '../../setupTests';
import { Hotelier } from '@prisma/client';
import bcrypt from 'bcrypt';
import SetupDatabaseTest from '../../src/database/setupDatabaseTest';

const feature = loadFeature('tests/features/hotelier.feature');

const mockHashedPassword = '$2b$10$B9j68DzP1ruNn5qyPCqXVO.TOFNGKvldEDasLhfLOAt169ytexgxK';

const createHotelier = async (name: string, hotel: string, email: string, password: string) => {
    return {
        id: 1,
        name: name,
        email: email,
        username: 'mavis',
        password: mockHashedPassword,
        hotel: hotel,
        city: 'Transilvânia"',
        cep: '12345678',
        address: 'Rua das Sextas',
        n_address: '13',
        UF: 'TR',
        cnpj: '12.215.333/0001-33',
    };
};

const hotelierExist = async (email: string) => {
    return {
        id: 1,
        name: 'Maria Letícia',
        email: email,
        username: 'mlng',
        password: mockHashedPassword,
        hotel: 'Polenguito Hotel',
        city: 'Paulista',
        cep: '2621731',
        address: 'Rua Dourada',
        n_address: '123',
        UF: 'PE',
        cnpj: '123.456.333-01',
    };
};

const createHotelierPayload = (
    name: string,
    hotel: string,
    email: string,
    username: string,
    password: string,
    city: string,
    cep: string,
    address: string,
    n_address: string,
    UF: string,
    cnpj: string,
) => {
    return {
        id: 1,
        name,
        hotel,
        email,
        username,
        password,
        city,
        cep,
        address,
        n_address,
        UF,
        cnpj,
    } as Hotelier;
};

defineFeature(feature, (test) => {
    let response: request.Response;
    let hoteliers: Hotelier[] = [];
    const setupDBTest = new SetupDatabaseTest();

    beforeAll(async () => {
        jest.clearAllMocks();
        jest.spyOn(bcrypt, 'hash').mockImplementation(async () => mockHashedPassword);
        await setupDBTest.resetDatabase();
    });

    afterAll(async () => {
        hoteliers = [];
        await setupDBTest.resetDatabase();
    });

    const givenNewHotelier = (given: DefineStepFunction) =>
        given('que eu sou um novo hoteleiro', async () => {
            const hotelier = await createHotelier(
                'Maria Letícia',
                'Hotel Transilvânia',
                'mavis.dracula@gmail.com',
                '$2b$10$B9j68DzP1ruNn5qyPCqXVO.TOFNGKvldEDasLhfLOAt169ytexgxK',
            );
            hoteliers.push(hotelier);
            prismaMock.hotelier.create.mockResolvedValue(hotelier);
        });

    const givenEmailExists = (given: DefineStepFunction) =>
        given(/^que o e-mail "(.*)" já está cadastrado$/, async (email) => {
            const existingHotelier = await hotelierExist(email);
            hoteliers.push(existingHotelier);
            prismaMock.hotelier.findUnique.mockResolvedValue(existingHotelier);
        });

    const givenUsernameExists = (given: DefineStepFunction) =>
        given(/^que o nome de usuário "(.*)" já está cadastrado$/, async (username) => {
            const existingHotelier = await createHotelier(
                'Maria Letícia',
                'Polenguito Hotel',
                'mleticiagaspar17@gmail.com',
                '@AmoHotel123',
            );
            existingHotelier.username = username;
            prismaMock.hotelier.findUnique.mockResolvedValue(existingHotelier);
        });

    const whenSendRegisterRequest = (when: DefineStepFunction) =>
        when(
            /^eu envio uma solicitação de cadastro com o hotel "(.*)", email "(.*)", username "(.*)", password "(.*)", name "(.*)", cidade "(.*)", cep "(.*)", endereço "(.*)", número do endereço "(.*)", UF "(.*)" e CNPJ "(.*)"$/,
            async (
                hotel,
                email,
                username,
                password,
                name,
                city,
                cep,
                address,
                n_address,
                UF,
                cnpj,
            ) => {
                const payload = createHotelierPayload(
                    name,
                    hotel,
                    email,
                    username,
                    password,
                    city,
                    cep,
                    address,
                    n_address,
                    UF,
                    cnpj,
                );
                response = await request(app).post('/hotelier/create').send(payload);
                //console.log('Payload enviado:', payload);
                //console.log('Resposta recebida:', response.body);
            },
        );

    const whenSendRegisterRequestInvalidPassword = (when: DefineStepFunction) =>
        when(
            /^eu envio uma solicitação de cadastro com o hotel "(.*)", email "(.*)", username "(.*)", password "(.*)", name "(.*)"$/,
            async (hotel, email, username, password, name) => {
                const payload = createHotelierPayload(
                    name,
                    hotel,
                    email,
                    username,
                    password,
                    'Transilvânia',
                    '12345678',
                    'Rua das Sextas',
                    '13',
                    'TR',
                    '12.215.333/0001-33',
                );
                response = await request(app).post('/hotelier/create').send(payload);
            },
        );

    const thenRegistrationShouldBeSuccessful = (then: DefineStepFunction) =>
        then('o cadastro deve ser realizado com sucesso', () => {
            expect(response.status).toBe(201);
        });

    const thenShouldReceiveConfirmationMessage = (then: DefineStepFunction) =>
        then('eu devo receber uma mensagem de confirmação:', (expectedResponse) => {
            const expected = JSON.parse(expectedResponse);
            expect(response.body.hotelier).toMatchObject({
                id: hoteliers[0].id,
                name: hoteliers[0].name,
                email: hoteliers[0].email,
                username: hoteliers[0].username,
                password: hoteliers[0].password,
                hotel: hoteliers[0].hotel,
                city: hoteliers[0].city,
                cep: hoteliers[0].cep,
                address: hoteliers[0].address,
                n_address: hoteliers[0].n_address,
                UF: hoteliers[0].UF,
                cnpj: hoteliers[0].cnpj,
            });
            expect(response.body.hotelier.id).toBeDefined();
        });

    const thenRegistrationShouldFail = (then: DefineStepFunction) =>
        then('o cadastro não deve ser realizado', () => {
            expect(response.status).toBe(500);
        });
    const thenRegistrationShouldFail1 = (then: DefineStepFunction) =>
        then('o cadastro não deve ser realizado', () => {
            expect(response.status).toBe(400);
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

    test('Cadastro Bem-Sucedido de Usuário Hoteleiro', ({ given, when, then }) => {
        givenNewHotelier(given);
        whenSendRegisterRequest(when);
        thenRegistrationShouldBeSuccessful(then);
        thenShouldReceiveConfirmationMessage(then);
    });

    test('Cadastro Mal-Sucedido de Usuário Hoteleiro por E-mail já Cadastrado', ({
        given,
        when,
        then,
    }) => {
        givenEmailExists(given);
        whenSendRegisterRequest(when);
        thenRegistrationShouldFail(then);
        thenShouldReceiveErrorMessage(then);
    });

    test('Cadastro Mal-Sucedido de Usuário Hoteleiro por Usuário já Cadastrado', ({
        given,
        when,
        then,
    }) => {
        givenUsernameExists(given);
        whenSendRegisterRequest(when);
        thenRegistrationShouldFail(then);
        thenShouldReceiveUsernameErrorMessage(then);
    });

    test('Cadastro Mal-Sucedido de Usuário Hoteleiro por Senha Inválida', ({
        given,
        when,
        then,
    }) => {
        givenNewHotelier(given);
        whenSendRegisterRequestInvalidPassword(when);
        thenRegistrationShouldFail1(then);
        thenShouldReceiveInvalidPasswordMessage(then);
    });
});
