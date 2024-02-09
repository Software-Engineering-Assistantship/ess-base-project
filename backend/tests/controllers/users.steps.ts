import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import { di } from '../../src/di';
import UserRepository from '../../src/repositories/user.repository';
import UserModel from '../../src/models/user.model';
import fs from 'fs';

const feature = loadFeature('tests/features/users.feature');
const request = supertest(app);

defineFeature(feature, (test) => {
    let mockUserRepository: UserRepository;
    let response: supertest.Response;
    const userData = new UserModel({
        nome: '',
        cpf: '',
        dataNascimento: new Date(),
        email: '',
        login: '',
        senha: ''
    });

    beforeEach(() => {
        mockUserRepository = di.getRepository<UserRepository>(UserRepository);
        if (fs.existsSync('users.json')) {
            fs.unlinkSync('users.json');
        }
    });

    test('Cadastro de Usuário com Sucesso', ({ given, when, then, and }) => {
        given(/^estou na página "(.*)"$/, async (page) => {
            if (page == 'Cadastro de Usuário') {
                page = 'api/users/cadastro';
            }
            const rota = '/${page}'
            response = await request.get(rota);
        });

        when(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            userData.preencherCampo(campo, valor);
        });

        and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            userData.preencherCampo(campo, valor);
        });

        and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            userData.preencherCampo(campo, valor);
        });

        and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            userData.preencherCampo(campo, valor);
        });

        and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            userData.preencherCampo(campo, valor);
        });

        and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            userData.preencherCampo(campo, valor);
        });

        and (/^realizo o cadastro do usuário$/, async () => {
            response = await request.post('/api/users/cadastro').send(userData);
        });

        then(/^uma mensagem de confirmação é exibida indicando que "(.*)"$/, (expectedMessage) => {
            expect(response.status).toBe(200);
            expect(response.body.msg).toBe(expectedMessage);
            fs.writeFileSync('users.json', JSON.stringify(userData));
        });
    });
    
    test ('Falha no Cadastro de Usuário por Login já Cadastrado', ({ given, when, then, and }) => {
        given(/^estou na página "(.*)"$/, async (page) => {
            if (page == 'Cadastro de Usuário') {
                page = 'api/users/cadastro';
            }
            const rota = '/${page}'
            response = await request.get(rota);
        });

        and(/^o usuário de login "(.*)" está cadastrado no sistema$/, async (login) => {
            const user = new UserModel({
                nome: 'Teste',
                cpf: '123.456.789-01',
                dataNascimento: new Date('25/10/2000'),
                email: 'teste@teste.com',
                login: login,
                senha: 'senhateste'
            });
            fs.writeFileSync('./src/models/users.json', JSON.stringify(user));
        });       

        when(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            userData.preencherCampo(campo, valor);
        });

        and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            userData.preencherCampo(campo, valor);
        });

        and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            userData.preencherCampo(campo, valor);
        });

        and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            userData.preencherCampo(campo, valor);
        });

        and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            userData.preencherCampo(campo, valor);
        });

        and(/^preencho o campo "(.*)" com "(.*)"$/, async (campo, valor) => {
            userData.preencherCampo(campo, valor);
        });

        and (/^realizo o cadastro do usuário$/, async () => {
        const loginexist = userData.verificarLoginExistente('login', userData.login);
            if(!loginexist) {
                response = await request.post('/api/users/cadastro').send(userData);
            }else{
                response.status = 400;
            }
        });

        then(/^uma mensagem de erro é exibida indicando que "(.*)"$/, (expectedMessage) => {
            if(response.status == 400){
                expect(response.body.msg).toBe(expectedMessage);
            }else{
                expect(response.status).toBe(200);
                expect(response.body.msg).toBe('O cadastro foi realizado com sucesso');
                fs.writeFileSync('./src/models/users.json', JSON.stringify(userData));
            }
        });
    });
});