import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import { di } from '../../src/di';
import UserRepository from '../../src/repositories/user.repository';
import UserModel from '../../src/models/user.model';

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
        console.log(response.body);
        expect(response.status).toBe(200);
        expect(response.body.msg).toBe(expectedMessage);
    });
  });
});