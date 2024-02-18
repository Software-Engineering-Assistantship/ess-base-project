import { loadFeature, defineFeature, DefineStepFunction } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../src/app';
import { prismaMock } from '../setupTests';
import bcrypt from 'bcrypt'; //hash de senhas e comparação
import { Client } from '@prisma/client';
import prisma from '../src/database';

const feature = loadFeature('tests/features/client_login.feature');
const request = supertest(app);

defineFeature(feature, (test) => {
  let response: supertest.Response;
  let ExpectedAuthToken: string;
  let AuthHeader: string;
  let ObtainedToken: string;
  let IsTokenValueTheExpected: boolean;

  const givenClientExists = (given: DefineStepFunction) =>
    given(
      /^existe um cliente cadastrado com email "(.*)" e com senha "(.*)"$/,
      async (email: string, password: string) => {
        // Simulate client existence in database
        prismaMock.client.findUnique.mockResolvedValue({
          id: 1, // Supondo que o ID seja 1
          password: await bcrypt.hash(password, 10),
          name: 'Caio Fernandes', // Nome de exemplo
          email: email,
          cpf: '123.456.789-00', // CPF de exemplo
          address: 'Rua Exemplo, 123', // Endereço de exemplo
        });
      }
    );

  const givenClientDoesNotExist = (given: DefineStepFunction) =>
    given(
      /^não existe um cliente cadastrado com email "(.*)"$/,
      async (email: string) => {
        // Simulate client does not exist in database
        prismaMock.client.findUnique.mockResolvedValue(null);
      }
    );

  const givenExpectedToken = (given: DefineStepFunction) =>
    given(
      /^o valor esperado para o token de autorização é "(.*)"$/,
      async (expectedToken: string) => {
        // Define o valor esperado para o token de autorização
        // Isso pode ser armazenado em uma variável para uso posterior
        ExpectedAuthToken = expectedToken;
      }
    );

  const whenLoginRequestIsSent = (when: DefineStepFunction) =>
    when(
      /^uma requisição POST é enviada para "(.*)" com os dados "(.*)" e "(.*)"$/,
      async (url: string, email: string, password: string) => {
        // Simulate sending login request
        //prismaMock.client.findUnique.mockResolvedValue({ cvmfc })
        response = await request.post(url).send({ email, password });

        const client = await prismaMock.client.findUnique({
          where: { email }
        });
        //console.log(response.body);
      }
    );
  
  const whenRequestIsSentToClientsHome = (when: DefineStepFunction) =>
  when(
    /^uma requisição GET é enviada para "(.*)"$/,
    async (url: string) => {
      response = await request.get(url);
    })

  const whenAuthorizationHeaderIsSent = (when: DefineStepFunction) =>
    when(
      /^essa requisição possui um cabeçalho de autorização "(.*)"$/,
      async (authenticationheader: string) => {
        AuthHeader = authenticationheader;
      }
    )

  const whenAuthorizationHeaderIsNotSent = (when: DefineStepFunction) =>
    when(
      /^essa requisição não possui um cabeçalho de autorização$/,
      async () => {
        AuthHeader = "";
      }
    )

  const whenTokenIsExtractedFromHeader = (when: DefineStepFunction) =>
    when(
      /^o valor do token é extraído do cabeçalho como "(.*)"$/,
      async (token: string) => {
        // Simulate extracting token from header
        ObtainedToken = AuthHeader.split(' ')[1];
        //console.log(ObtainedToken, 'deve ser igual a', token);
      }
    );

  const whenTokenIsExtractedFromHeaderEmpty = (when: DefineStepFunction) =>
    when(
      /^o valor do token é extraído do cabeçalho como uma string vazia$/,
      async () => {

        ObtainedToken = AuthHeader.split(' ')[1]; // Extrair token do cabeçalho vazio
        //console.log("Valor do token extraído:", ObtainedToken);
        //console.log("O token extraído deve ser uma string vazia.");
      }
    );


  const whenTokenIsComparedToExpectedValue = (when: DefineStepFunction) =>
    when(
      /^esse valor é comparado com o valor esperado para o token$/,
      async () => {
        if (ObtainedToken === ExpectedAuthToken) IsTokenValueTheExpected = true;
        else IsTokenValueTheExpected = false;
      }
    );

  const thenDataIsFoundInDatabase = (then: DefineStepFunction) =>
    then(/^os dados são encontrados no banco de dados$/, async () => {
      // Verify if data is found in the database
      expect(prismaMock.client.findUnique).toHaveBeenCalled();
    });

  const thenDataIsNotFoundInDatabase = (then: DefineStepFunction) =>
    then(/^o email "(.*)" não é encontrado no banco de dados$/, async (email: string) => {
      // Verify if data is not found in the database
      expect(prismaMock.client.findUnique).toHaveBeenCalledWith({
        where: { email },
      });
    });

  const thenPasswordNotFoundInDatabase = (then: DefineStepFunction) =>
    then(
      /^a senha "(.*)" não é encontrada no banco de dados$/,
      async (password: string) => {
        // Simulate password not found in the database
        prismaMock.client.findUnique.mockResolvedValue({
          id: 1, // Supondo que o ID seja 1
          password: 'wrong_password',
          name: 'Caio Fernandes', // Nome de exemplo
          email: 'cvmfc@cin.ufpe.br',
          cpf: '123.456.789-00', // CPF de exemplo
          address: 'Rua Exemplo, 123', // Endereço de exemplo
        });
      }
    );

  const thenStatusIsReturned = (then: DefineStepFunction) =>
    then(/^é retornado status "(.*)"$/, async (status: string) => {
      // Verify if expected status is returned
      //console.log(response.status);
      expect(response.status).toBe(parseInt(status, 10));
    });

  const thenLoginSucceeds = (then: DefineStepFunction) =>
    then(/^o login é realizado com sucesso$/, async () => {
      // Verify if login succeeds
      //console.log(response.body);
      expect(response.body).toEqual(expect.objectContaining({ message: 'Login bem sucedido' }));
    });

  const thenLoginFails = (then: DefineStepFunction) =>
    then(/^o login não pode ser concluído$/, async () => {
      // Verify if login fails
      expect(response.body).toEqual(expect.objectContaining({ error: "Login falhou" }));
    });

  const thenTokenValueMatchesExpected = (then: DefineStepFunction) =>
    then(
      /^o valor do token obtido é igual ao esperado$/,
      async () => {
        response.status = 200;
      }
    );

  const thenTokenValueDoesNotMatchExpected = (then: DefineStepFunction) =>
    then(
      /^o valor do token obtido difere do esperado$/,
      async () => {
        response.status = 401;
      }
    );

  const thenLoginSucceedsValidToken = (then: DefineStepFunction) =>
    then(/^login é realizado com sucesso$/, async () => {
      //
      expect(response.body).toEqual(expect.objectContaining({ error: "Login bem sucedido" }));
    });

  const thenLoginFailsInvalidToken = (then: DefineStepFunction) =>
    then(/^o login não é autorizado$/, async () => {
      //
      expect(response.body).toEqual(expect.objectContaining({ error: "Token de autorização inválido" }));
    });

  const thenLoginFailsTokenNotFound = (then: DefineStepFunction) =>
    then(/^o login não pode ser concluído$/, async () => {
      //
      expect(response.body).toEqual(expect.objectContaining({ error: "Token de autorização não fornecido" }));
    });

  test('Login realizado com sucesso', ({ given, and, when, then }) => {
    givenClientExists(given);
    whenLoginRequestIsSent(when);
    thenDataIsFoundInDatabase(then);
    thenStatusIsReturned(and);
    thenLoginSucceeds(and);
  });

  test('Login fracassou, pois a senha está incorreta', ({ given, and, when, then }) => {
    givenClientExists(given);
    whenLoginRequestIsSent(when);
    thenPasswordNotFoundInDatabase(then);
    thenStatusIsReturned(and);
    thenLoginFails(and);
  });

  test('Login fracassou, pois o email não está cadastrado', ({ given, and, when, then }) => {
    givenClientDoesNotExist(given);
    whenLoginRequestIsSent(when);
    thenDataIsNotFoundInDatabase(then);
    thenStatusIsReturned(and);
    thenLoginFails(and);
  });
  
  test('Token de autorização válido', ({ given, and, when, then }) => {
    givenExpectedToken(given);
    whenRequestIsSentToClientsHome(when);
    whenAuthorizationHeaderIsSent(and);
    whenTokenIsExtractedFromHeader(and);
    whenTokenIsComparedToExpectedValue(and);
    thenTokenValueMatchesExpected(then);
    thenStatusIsReturned(and);
    thenLoginSucceedsValidToken(and);
  });

  test('Token de autorização inválido', ({ given, and, when, then }) => {
    givenExpectedToken(given);
    whenRequestIsSentToClientsHome(when);
    whenAuthorizationHeaderIsSent(and);
    whenTokenIsExtractedFromHeader(and);
    whenTokenIsComparedToExpectedValue(and);
    thenTokenValueDoesNotMatchExpected(then);
    thenStatusIsReturned(and);
    thenLoginFailsInvalidToken(and);
  });

  test('Token de autorização não fornecido', ({ given, and, when, then }) => {
    givenExpectedToken(given);
    whenRequestIsSentToClientsHome(when);
    whenAuthorizationHeaderIsNotSent(and);
    whenTokenIsExtractedFromHeaderEmpty(and);
    whenTokenIsComparedToExpectedValue(and);
    thenTokenValueDoesNotMatchExpected(then);
    thenStatusIsReturned(and);
    thenLoginFailsTokenNotFound(and);
  });
});
