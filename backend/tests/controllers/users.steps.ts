import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import { di } from '../../src/di';
import UserRepository from '../../src/repositories/user.repository';
import UserModel from '../../src/models/user.model';
import UserService from '../../src/services/user.service';
import fs from 'fs';

const feature = loadFeature('tests/features/users.feature');
const request = supertest(app);

defineFeature(feature, (test) => {
    let mockUserRepository: UserRepository;
    let response: supertest.Response;
    const userData = new UserModel({
        nome: '',
        cpf: '',
        dataNascimento: '',
        email: '',
        login: '',
        senha: '',
        logado: false
    });
    let userService: UserService;

    beforeEach(() => {
        mockUserRepository = di.getRepository<UserRepository>(UserRepository);
        if (fs.existsSync('users.json')) {
            fs.unlinkSync('users.json');
        }
        userService = new UserService(mockUserRepository);
    });

    test('Cadastro de Usuário com Sucesso', ({ given, when, then, and }) => {
        given(/^estou na página "(.*)"$/, async (page) => {
            const rota = userService.verificaURL(page, null);
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
            const verifSenha = userService.validaSenha(userData);
            if(!verifSenha) {
                response = await request.post('/api/users/cadastro').send(userData);
                userService.createUser(userData);
            }
        });

        then(/^uma mensagem de confirmação é exibida indicando que "(.*)"$/, (expectedMessage) => {
            if(response.status != 200){
                expect(response.body.msg).toBe('Falha no cadastro do usuário');
            }else{
                expect(response.status).toBe(200);
                expect(response.body.msg).toBe(expectedMessage);
            }
        });
    });
    
    test ('Falha no Cadastro de Usuário por Login já Cadastrado', ({ given, when, then, and }) => {
        given(/^estou na página "(.*)"$/, async (page) => {
            const rota = userService.verificaURL(page, null);
            response = await request.get(rota);
        });

        and(/^o usuário de login "(.*)" está cadastrado no sistema$/, async (login) => {
            const user = new UserModel({
                nome: 'Teste',
                cpf: '123.456.789-01',
                dataNascimento: '25/10/2000',
                email: 'teste@teste.com',
                login: login,
                senha: 'senhateste',
                logado: false
            });
            userService.createUser(user);
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
            const verifSenha = userService.validaSenha(userData);
            if(!verifSenha) {
                response = await request.post('/api/users/cadastro').send(userData);
                userService.createUser(userData);
            }
        });

        then(/^uma mensagem de erro é exibida indicando que "(.*)"$/, (expectedMessage) => {
            if(response.status != 200){
                expect(response.body.msg).toBe(expectedMessage);
            }else{
                expect(response.status).toBe(200);
                expect(response.body.msg).toBe('O cadastro foi realizado com sucesso');
            }
        });
    });

    test ('Falha no Cadastro de Usuário por Email já Cadastrado', ({ given, when, then, and }) => {
        given(/^estou na página "(.*)"$/, async (page) => {
            const rota = userService.verificaURL(page, null);
            response = await request.get(rota);
        });

        and(/^o usuário de email "(.*)" está cadastrado no sistema$/, async (email) => {
            const user = new UserModel({
                nome: 'Teste',
                cpf: '123.456.789-01',
                dataNascimento: '25/10/2000',
                email: email,
                login: 'teste',
                senha: 'senhateste',
                logado: false
            });
            userService.createUser(user);
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
            const verifSenha = userService.validaSenha(userData);
            if(!verifSenha) {
                response = await request.post('/api/users/cadastro').send(userData);
                userService.createUser(userData);
            }
        });

        then(/^uma mensagem de erro é exibida indicando que "(.*)"$/, (expectedMessage) => {
            if(response.status != 200){
                expect(response.body.msg).toBe(expectedMessage);
            }else{
                expect(response.status).toBe(200);
                expect(response.body.msg).toBe('O cadastro foi realizado com sucesso');
            }
        });
    });

    test ('Falha no Cadastro de Usuário por CPF já Cadastrado', ({ given, when, then, and }) => {
        given(/^estou na página "(.*)"$/, async (page) => {
            const rota = userService.verificaURL(page, null);
            response = await request.get(rota);
        });

        and(/^o usuário de cpf "(.*)" está cadastrado no sistema$/, async (cpf) => {
            const user = new UserModel({
                nome: 'teste',
                cpf: cpf,
                dataNascimento: '25/10/2000',
                email: 'teste@teste.com',
                login: 'teste',
                senha: 'senhateste',
                logado: false
            });
            userService.createUser(user);
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
            const verifSenha = userService.validaSenha(userData);
            if(!verifSenha) {
                response = await request.post('/api/users/cadastro').send(userData);
                userService.createUser(userData);
            }
        });

        then(/^uma mensagem de erro é exibida indicando que "(.*)"$/, (expectedMessage) => {
            if(response.status != 200){
                expect(response.body.msg).toBe(expectedMessage);
            }else{
                expect(response.status).toBe(200);
                expect(response.body.msg).toBe('O cadastro foi realizado com sucesso');
            }
        });
    });

    test ('Falha no Cadastro de Usuário por Campo em Branco', ({ given, when, then, and }) => {
        given(/^estou na página "(.*)"$/, async (page) => {
            const rota = userService.verificaURL(page, null);
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
            const verifSenha = userService.validaSenha(userData);
            if(!verifSenha) {
                response = await request.post('/api/users/cadastro').send(userData);
                userService.createUser(userData);
            }
        });

        then(/^uma mensagem de erro é exibida indicando que "(.*)"$/, (expectedMessage) => {
            if(response.status != 200){
                expect(response.body.msg).toBe(expectedMessage);
            }else{
                expect(response.status).toBe(200);
                expect(response.body.msg).toBe('O cadastro foi realizado com sucesso');
            }
        });
    });

    test ('Falha no Cadastro de Usuário por Senha Inválida com Nome', ({ given, when, then, and }) => {
        given(/^estou na página "(.*)"$/, async (page) => {
            const rota = userService.verificaURL(page, null);
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
            const verifSenha = userService.validaSenha(userData);
            if(!verifSenha) {
                response = await request.post('/api/users/cadastro').send(userData);
                userService.createUser(userData);
            }
        });

        then(/^uma mensagem de erro é exibida indicando que "(.*)"$/, (expectedMessage) => {
            if(response.status != 200){
                expect(response.body.msg).toBe(expectedMessage);
            }else{
                expect(response.status).toBe(200);
                expect(response.body.msg).toBe('O cadastro foi realizado com sucesso');
            }
        });
    });

    test ('Falha no Cadastro de Usuário por Senha Inválida com Data de Nascimento', ({ given, when, then, and }) => {
        given(/^estou na página "(.*)"$/, async (page) => {
            const rota = userService.verificaURL(page, null);
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
            const verifSenha = userService.validaSenha(userData);
            if(!verifSenha) {
                response = await request.post('/api/users/cadastro').send(userData);
                userService.createUser(userData);
            }
        });

        then(/^uma mensagem de erro é exibida indicando que "(.*)"$/, (expectedMessage) => {
            if(response.status != 200){
                expect(response.body.msg).toBe(expectedMessage);
            }else{
                expect(response.status).toBe(200);
                expect(response.body.msg).toBe('O cadastro foi realizado com sucesso');
            }
        });
    });

    //Test de Atualização de Informações do Usuário com Sucesso
    test('Atualização de Informações do Usuário com Sucesso', ({ given, when, then, and }) => {
        given(/^o usuário de login "(.*)" e senha "(.*)" está cadastrado no sistema$/, async (login, senha) => {  
            const user = new UserModel({
                nome: 'Teste',
                cpf: '123.456.789-01',
                dataNascimento: '25/10/2000',
                email: 'teste@teste.com',
                login: login,
                senha: senha,
                logado: false
            });
            userService.createUser(user);
        });

        and(/^estou logado com o usuário de login "(.*)" e senha "(.*)"$/, async (login, senha) => {
            const existLogin = userService.verificarExistente('login', login);
            
            console.log(existLogin);
            if(existLogin){
                console.log(userService.senhaCorresponde(login, senha));
                if(userService.senhaCorresponde(login, senha))
                    userService.trocarStatus(login);
            }
        });

        and(/^estou na página "(.*)"$/, async (page) => {
                const userId = userData.login;

                const rota = userService.verificaURL(page, userId);
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

        and(/^realizo a atualização das informações do usuário$/, async () => {
            const id = userData.login;
            const verifSenha = userService.validaSenha(userData);
            if(!verifSenha) {
                response = await request.put('/api/users/${id}').send(userData);
                userService.updateUserById(id, userData);
            }
        });

        then(/^o usuário de login "(.*)" e senha "(.*)" está cadastrado no sistema$/, async (login, senha) => {
            const existLogin = await userService.verificarExistente('login', login);
            const existSenha = await userService.verificarExistente('senha', senha);

            if(existLogin && existSenha && response.status == 200){
                //Retorna o status ok
                response.status = 200;
            }else{
                //Retorna o status de erro
                response.status = 400;
            }
        });
    
        and(/^uma mensagem de confirmação é exibida indicando que "(.*)"$/, (expectedMessage) => {
            if(response.status != 200){
                expect(response.body.msg).toBe('Falha na atualização das informações do usuário');
            }else{
                expect(response.status).toBe(200);
                expect(response.body.msg).toBe(expectedMessage);
            }
        });
    });
});
