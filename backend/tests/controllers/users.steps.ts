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
            const verifSenha = userData.verificaSenha();
            const verifBranco = userData.verificaBranco();
            if(!userData.verificarExistente('login', userData.login) || !userData.verificarExistente('cpf', userData.cpf) || !userData.verificarExistente('email', userData.email) || !verifBranco || !verifSenha) {
                response = await request.post('/api/users/cadastro').send(userData);
            }else{
                response.status = 400;
            }
        });

        then(/^uma mensagem de confirmação é exibida indicando que "(.*)"$/, (expectedMessage) => {
            expect(response.status).toBe(200);
            expect(response.body.msg).toBe(expectedMessage);
            userData.salvarUsuario(userData);
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
            const verifSenha = userData.verificaSenha();
            const verifBranco = userData.verificaBranco();
            if(!userData.verificarExistente('login', userData.login) || !userData.verificarExistente('cpf', userData.cpf) || !userData.verificarExistente('email', userData.email) || !verifBranco || !verifSenha) {
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
            }
        });
    });

    test ('Falha no Cadastro de Usuário por Email já Cadastrado', ({ given, when, then, and }) => {
        given(/^estou na página "(.*)"$/, async (page) => {
            if (page == 'Cadastro de Usuário') {
                page = 'api/users/cadastro';
            }
            const rota = '/${page}'
            response = await request.get(rota);
        });

        and(/^o usuário de email "(.*)" está cadastrado no sistema$/, async (email) => {
            const user = new UserModel({
                nome: 'Teste',
                cpf: '123.456.789-01',
                dataNascimento: new Date('25/10/2000'),
                email: email,
                login: 'teste',
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
            const verifSenha = userData.verificaSenha();
            const verifBranco = userData.verificaBranco();
            if(!userData.verificarExistente('login', userData.login) || !userData.verificarExistente('cpf', userData.cpf) || !userData.verificarExistente('email', userData.email) || !verifBranco || !verifSenha) {
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
            }
        });
    });

    test ('Falha no Cadastro de Usuário por CPF já Cadastrado', ({ given, when, then, and }) => {
        given(/^estou na página "(.*)"$/, async (page) => {
            if (page == 'Cadastro de Usuário') {
                page = 'api/users/cadastro';
            }
            const rota = '/${page}'
            response = await request.get(rota);
        });

        and(/^o usuário de cpf "(.*)" está cadastrado no sistema$/, async (cpf) => {
            const user = new UserModel({
                nome: 'teste',
                cpf: cpf,
                dataNascimento: new Date('25/10/2000'),
                email: 'teste@teste.com',
                login: 'teste',
                senha: 'senhateste'
            });
            userData.salvarUsuario(user);
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
            const verifSenha = userData.verificaSenha();
            const verifBranco = userData.verificaBranco();
            if(!userData.verificarExistente('login', userData.login) || !userData.verificarExistente('cpf', userData.cpf) || !userData.verificarExistente('email', userData.email) || !verifBranco || !verifSenha){
                response = await request.post('/api/users/cadastro').send(userData);
            }else{
                response.status = 400;
            }
        });

        then(/^uma mensagem de erro é exibida indicando que "(.*)"$/, (expectedMessage) => {
            console.log(response.body);
            if(response.status == 400){
                expect(response.body.msg).toBe(expectedMessage);
            }else{
                expect(response.status).toBe(200);
                expect(response.body.msg).toBe('O cadastro foi realizado com sucesso');
            }
        });
    });

    test ('Falha no Cadastro de Usuário por Campo em Branco', ({ given, when, then, and }) => {
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
            const verifSenha = userData.verificaSenha();
            const verifBranco = userData.verificaBranco();
            if(!userData.verificarExistente('login', userData.login) || !userData.verificarExistente('cpf', userData.cpf) || !userData.verificarExistente('email', userData.email) || !verifBranco || !verifSenha) {
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
            }
        });
    });

    test ('Falha no Cadastro de Usuário por Senha Inválida com Nome', ({ given, when, then, and }) => {
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
            const verifSenha = userData.verificaSenha();
            const verifBranco = userData.verificaBranco();
            if(!userData.verificarExistente('login', userData.login) || !userData.verificarExistente('cpf', userData.cpf) || !userData.verificarExistente('email', userData.email) || !verifBranco || !verifSenha) {
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
            }
        });
    });

    test ('Falha no Cadastro de Usuário por Senha Inválida com Data de Nascimento', ({ given, when, then, and }) => {
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
            const verifSenha = userData.verificaSenha();
            const verifBranco = userData.verificaBranco();
            if(!userData.verificarExistente('login', userData.login) || !userData.verificarExistente('cpf', userData.cpf) || !userData.verificarExistente('email', userData.email) || !verifBranco || !verifSenha) {
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
            }
        });
    });
});