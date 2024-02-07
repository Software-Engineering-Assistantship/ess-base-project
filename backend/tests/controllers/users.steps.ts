import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import { di } from '../../src/di';
import UserService from '../../src/services/user.service';
import UserRepository from '../../src/repositories/user.repository';

const feature = loadFeature('tests/features/users.feature');
const request = supertest(app);

defineFeature(feature, (test) => {
  let mockUserRepository: UserRepository;
  let response: supertest.Response;
  let userData = {nome: '', cpf: '', dataNascimento: '', email: '', login: '', senha: ''};

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

    when(/^preencho o campo nome com "(.*)"$/, async (valor) => {
        userData.nome = valor;
    });

    and(/^preencho o campo cpf com "(.*)"$/, async (valor) => {
        userData.cpf = valor;
    });

    and(/^preencho o campo data de nascimento com "(.*)"$/, async (valor) => {
        userData.dataNascimento = valor;
    });

    and(/^preencho o campo e-mail com "(.*)"$/, async (valor) => {
        userData.email = valor;
    });

    and(/^preencho o campo login com "(.*)"$/, async (valor) => {
        userData.login = valor;
    });

    and(/^preencho o campo senha com "(.*)"$/, async (valor) => {
        userData.senha = valor;
    });

    and (/^realizo o cadastro do usuário$/, async () => {
     response = await request.post('/api/users/cadastro').send(userData);
    });

    then(/^uma mensagem de confirmação é exibida indicando que "(.*)"$/, (expectedMessage) => {
        expect(response.status).toBe(200);
        expect(response.body.msg).toBe(expectedMessage);
    });
  });
});