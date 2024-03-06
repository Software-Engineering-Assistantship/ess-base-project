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
    const userRepository = new UserRepository();
    const userService = new UserService(userRepository);
    const userData = new UserModel({
        id: '1',
        nome: 'teste',
        cpf: 'teste',
        dataNascimento: '09/09/2003',
        email: 'teste@teste.com',
        login: 'teste',
        senha: 'teste123',
        logado: false
    });

    beforeEach(() => {
        mockUserRepository = di.getRepository<UserRepository>(UserRepository);
        fs.writeFileSync('./src/models/users.json', JSON.stringify([]));
    });

    test('Cadastro de Usuário com Sucesso', ({ given, when, then, and }) => {
        given(/^estou na página "(.*)"$/, async (page) => {
            response = await request.get(page);
            expect(response.status).toBe(200);
            expect(response.body.text).toBe('Cadastro de Usuário');
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
        });
    });
    
    test ('Falha no Cadastro de Usuário por Login já Cadastrado', ({ given, when, then, and }) => {
        given(/^estou na página "(.*)"$/, async (page) => {
            response = await request.get(page);
            expect(response.status).toBe(200);
            expect(response.body.text).toBe('Cadastro de Usuário');
        }); 

        and(/^o usuário de login "(.*)" está cadastrado no sistema$/, async (login) => {
            userData.login = login;
            response = await request.post('/api/users/cadastro').send(userData);
            expect(response.status).toBe(200);
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
            const verifUser = (await userService.validaUsuario(userData)).result;
            const verifErro = (await userService.validaUsuario(userData)).erro;
            if(!verifUser) {
                response = await request.post('/api/users/cadastro').send(userData);
            }
            else{
                response.body.msg = verifErro;
            }
        });

        then(/^uma mensagem de erro é exibida indicando que "(.*)"$/, (expectedMessage) => {
            expect(response.body.msg).toBe(expectedMessage);
        });
    });

    test ('Falha no Cadastro de Usuário por Email já Cadastrado', ({ given, when, then, and }) => {
        given(/^estou na página "(.*)"$/, async (page) => {
            response = await request.get(page);
            expect(response.status).toBe(200);
            expect(response.body.text).toBe('Cadastro de Usuário');
        }); 

        and(/^o usuário de email "(.*)" está cadastrado no sistema$/, async (email) => {
            userData.email = email;
            response = await request.post('/api/users/cadastro').send(userData);
            expect(response.status).toBe(200);
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
            const verifUser = (await userService.validaUsuario(userData)).result;
            const verifErro = (await userService.validaUsuario(userData)).erro;
            if(!verifUser) {
                response = await request.post('/api/users/cadastro').send(userData);
            }
            else{
                response.body.msg = verifErro;
            }
        });

        then(/^uma mensagem de erro é exibida indicando que "(.*)"$/, (expectedMessage) => {
            expect(response.body.msg).toBe(expectedMessage);
        });
    });

    test ('Falha no Cadastro de Usuário por CPF já Cadastrado', ({ given, when, then, and }) => {
        given(/^estou na página "(.*)"$/, async (page) => {
            response = await request.get(page);
            expect(response.status).toBe(200);
            expect(response.body.text).toBe('Cadastro de Usuário');
        });

        and(/^o usuário de cpf "(.*)" está cadastrado no sistema$/, async (cpf) => {
            userData.cpf = cpf;
            response = await request.post('/api/users/cadastro').send(userData);
            expect(response.status).toBe(200);
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
            const verifUser = (await userService.validaUsuario(userData)).result;
            const verifErro = (await userService.validaUsuario(userData)).erro;
            if(!verifUser) {
                response = await request.post('/api/users/cadastro').send(userData);
            }
            else{
                response.body.msg = verifErro;
            }
        });

        then(/^uma mensagem de erro é exibida indicando que "(.*)"$/, (expectedMessage) => {
            expect(response.body.msg).toBe(expectedMessage);
        });
    });

    test ('Falha no Cadastro de Usuário por Campo em Branco', ({ given, when, then, and }) => {
        given(/^estou na página "(.*)"$/, async (page) => {
            response = await request.get(page);
            expect(response.body.text).toBe('Cadastro de Usuário');
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
            const verifUser = (await userService.validaUsuario(userData)).result;
            const verifErro = (await userService.validaUsuario(userData)).erro;
            if(!verifUser) {
                response = await request.post('/api/users/cadastro').send(userData);
            }
            else{
                response.body.msg = verifErro;
            }
        });

        then(/^uma mensagem de erro é exibida indicando que "(.*)"$/, (expectedMessage) => {
            expect(response.body.msg).toBe(expectedMessage);
        });
    });

    test ('Falha no Cadastro de Usuário por Senha Inválida com Nome', ({ given, when, then, and }) => {
        given(/^estou na página "(.*)"$/, async (page) => {
            response = await request.get(page);
            expect(response.body.text).toBe('Cadastro de Usuário');
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
            const verifUser = (await userService.validaUsuario(userData)).result;
            const verifErro = (await userService.validaUsuario(userData)).erro;
            if(!verifUser) {
                response = await request.post('/api/users/cadastro').send(userData);
            }
            else{
                response.body.msg = verifErro;
            }
        });

        then(/^uma mensagem de erro é exibida indicando que "(.*)"$/, (expectedMessage) => {
            expect(response.body.msg).toBe(expectedMessage);
        });
    });

    test ('Falha no Cadastro de Usuário por Senha Inválida com Data de Nascimento', ({ given, when, then, and }) => {
        given(/^estou na página "(.*)"$/, async (page) => {
            response = await request.get(page);
            expect(response.body.text).toBe('Cadastro de Usuário');
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
            const verifUser = (await userService.validaUsuario(userData)).result;
            const verifErro = (await userService.validaUsuario(userData)).erro;
            if(!verifUser) {
                response = await request.post('/api/users/cadastro').send(userData);
            }
            else{
                response.body.msg = verifErro;
            }
        });

        then(/^uma mensagem de erro é exibida indicando que "(.*)"$/, (expectedMessage) => {
            expect(response.body.msg).toBe(expectedMessage);
        });
    });

    //Test de Atualização de Informações do Usuário com Sucesso
    test('Atualização de Informações do Usuário com Sucesso', ({ given, when, then, and }) => {
        given(/^o usuário de login "(.*)" e senha "(.*)" está cadastrado no sistema$/, async (login, senha) => {
            userData.nome = 'Teste';
            userData.cpf = '12345678901';
            userData.dataNascimento = '09/09/2003';
            userData.email = 'email@exemple.com';
            userData.login = login;
            userData.senha = senha;
            response = await request.post('/api/users/cadastro').send(userData);
        });

        and(/^o usuário de login "(.*)" e senha "(.*)" está logado no sistema$/, async (login, senha) => {
            const user = await userService.getUserByLogin(login);
            
            if(user){
                if(userService.senhaCorresponde(user.login, senha)){
                    await userService.trocarStatus(user.id);
                }else{
                    throw new Error("Senha inválida");
                }
                const userLogado = await userService.getUserById(user.id);

                if(userLogado){
                    expect(userLogado.logado).toBe(true);
                }
            }else{
                throw new Error("Usuário não encontrado");
            }
        });

        and(/^estou na página do usuário de login "(.*)"$/, async (login) => {
            const user = await userService.getUserByLogin(login);

            if (user) {
                response = await request.get(`/api/users/${user.id}`);
                expect(response.status).toBe(200);
            } else {
                throw new Error("Página de usuário não encontrada");
            }
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
            const verifUser = userService.validaUpdate(userData).result;
            const verifErro = userService.validaUpdate(userData).erro;
            if(!verifUser) {
                const userId = userData.id;
                response = await request.put(`/api/users/${userId}`).send(userData);
            }else{
                response.body.msg = verifErro;
            }
        });

        then(/^uma mensagem de confirmação é exibida indicando que "(.*)"$/, (expectedMessage) => {
            expect(response.body.msg).toBe(expectedMessage);
        });
    });

    //Test Falha na Atualização de Informações do Usuário por Campo em Branco
    test('Falha na Atualização de Informações do Usuário por Campo em Branco', ({ given, when, then, and }) => {
        given(/^o usuário de login "(.*)" e senha "(.*)" está cadastrado no sistema$/, async (login, senha) => {  
            userData.nome = 'Teste';
            userData.cpf = '12345678901';
            userData.dataNascimento = '09/09/2003';
            userData.email = 'email@exemple.com';
            userData.login = login;
            userData.senha = senha;
            response = await request.post('/api/users/cadastro').send(userData);
        });

        and(/^o usuário de login "(.*)" e senha "(.*)" está logado no sistema$/, async (login, senha) => {
            const user = await userService.getUserByLogin(login);
            
            if(user){
                if(userService.senhaCorresponde(user.login, senha)){
                    await userService.trocarStatus(user.id);
                }else{
                    throw new Error("Senha inválida");
                }
                const userLogado = await userService.getUserById(user.id);

                if(userLogado){
                    expect(userLogado.logado).toBe(true);
                }
            }else{
                throw new Error("Usuário não encontrado");
            }
        });

        and(/^estou na página do usuário de login "(.*)"$/, async (login) => {
            const user = await userService.getUserByLogin(login);

            if (user) {
                response = await request.get(`/api/users/${user.id}`);
                expect(response.status).toBe(200);
            } else {
                throw new Error("Página de usuário não encontrada");
            }
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
            const verifUser = userService.validaUpdate(userData).result;
            const verifErro = userService.validaUpdate(userData).erro;
            if(!verifUser) {
                const userId = userData.id;
                response = await request.put(`/api/users/${userId}`).send(userData);
                console.log(response.body);
            }else{
                response.body.msg = verifErro;
            }
        });

        then(/^uma mensagem de erro é exibida indicando que "(.*)"$/, (expectedMessage) => {
            expect(response.body.msg).toBe(expectedMessage);
        });
    });

    //Test Falha na Atualização de Informações do Usuário por Senha Inválida com Nome
    test('Falha na Atualização de Informações do Usuário por Senha Inválida com Nome', ({ given, when, then, and }) => {
        given(/^o usuário de login "(.*)" e senha "(.*)" está cadastrado no sistema$/, async (login, senha) => {  
            userData.nome = 'Teste';
            userData.cpf = '12345678901';
            userData.dataNascimento = '09/09/2003';
            userData.email = 'email@exemple.com';
            userData.login = login;
            userData.senha = senha;
            response = await request.post('/api/users/cadastro').send(userData);
        });

        and(/^o usuário de login "(.*)" e senha "(.*)" está logado no sistema$/, async (login, senha) => {
            const user = await userService.getUserByLogin(login);
            
            if(user){
                if(userService.senhaCorresponde(user.login, senha)){
                    await userService.trocarStatus(user.id);
                }else{
                    throw new Error("Senha inválida");
                }
                const userLogado = await userService.getUserById(user.id);

                if(userLogado){
                    expect(userLogado.logado).toBe(true);
                }
            }else{
                throw new Error("Usuário não encontrado");
            }
        });

        and(/^estou na página do usuário de login "(.*)"$/, async (login) => {
            const user = await userService.getUserByLogin(login);

            if (user) {
                response = await request.get(`/api/users/${user.id}`);
                expect(response.status).toBe(200);
            } else {
                throw new Error("Página de usuário não encontrada");
            }
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
            const verifUser = userService.validaUpdate(userData).result;
            const verifErro = userService.validaUpdate(userData).erro;
            if(!verifUser) {
                const userId = userData.id;
                response = await request.put(`/api/users/${userId}`).send(userData);
                console.log(response.body);
            }else{
                response.body.msg = verifErro;
            }
        });

        then(/^uma mensagem de erro é exibida indicando que "(.*)"$/, (expectedMessage) => {
            expect(response.body.msg).toBe(expectedMessage);
        });
    });

    //Test Falha na Atualização de Informações do Usuário por Senha Inválida com Data de Nascimento
    test('Falha na Atualização de Informações do Usuário por Senha Inválida com Data de Nascimento', ({ given, when, then, and }) => {
        given(/^o usuário de login "(.*)" e senha "(.*)" está cadastrado no sistema$/, async (login, senha) => {  
            userData.nome = 'Teste';
            userData.cpf = '12345678901';
            userData.dataNascimento = '09/09/2003';
            userData.email = 'email@exemple.com';
            userData.login = login;
            userData.senha = senha;
            response = await request.post('/api/users/cadastro').send(userData);
        });

        and(/^o usuário de login "(.*)" e senha "(.*)" está logado no sistema$/, async (login, senha) => {
            const user = await userService.getUserByLogin(login);
            
            if(user){
                if(userService.senhaCorresponde(user.login, senha)){
                    await userService.trocarStatus(user.id);
                }else{
                    throw new Error("Senha inválida");
                }
                const userLogado = await userService.getUserById(user.id);

                if(userLogado){
                    expect(userLogado.logado).toBe(true);
                }
            }else{
                throw new Error("Usuário não encontrado");
            }
        });

        and(/^estou na página do usuário de login "(.*)"$/, async (login) => {
            const user = await userService.getUserByLogin(login);

            if (user) {
                response = await request.get(`/api/users/${user.id}`);
                expect(response.status).toBe(200);
            } else {
                throw new Error("Página de usuário não encontrada");
            }
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
            const verifUser = userService.validaUpdate(userData).result;
            const verifErro = userService.validaUpdate(userData).erro;
            if(!verifUser) {
                const userId = userData.id;
                response = await request.put(`/api/users/${userId}`).send(userData);
            }else{
                response.body.msg = verifErro;
            }
        });

        then(/^uma mensagem de erro é exibida indicando que "(.*)"$/, (expectedMessage) => {
            expect(response.body.msg).toBe(expectedMessage);
        });
    });
});