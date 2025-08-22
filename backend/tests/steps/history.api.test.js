const { loadFeature, defineFeature } = require('jest-cucumber');
const supertest = require('supertest');
const app = require('../../src/app');
const Database = require('../../src/database');
const { di } = require('../../src/di');
const HistoryRepository = require('../../src/repositories/history.repository');

const feature = loadFeature('tests/features/history-api.feature');

beforeAll(async () => {
  await Database.reset();
  const dbInstance = await Database.getInstance();
  await dbInstance.seed();
  await di.getRepository(HistoryRepository).init();
});

defineFeature(feature, (test) => {
  let response;

  test('Obter histórico com sucesso (não vazio)', ({ given, when, then }) => {
    given('existe um usuário com id "1" cadastrado no sistema', () => {});
    // Repita o given para a condição "And" se necessário:
    given('esse usuário possui os vídeos "101" e "102" no histórico', () => {});

    when('faço uma requisição GET para "/users/1/history"', async () => {
      response = await supertest(app).get('/api/users/1/history');
    });

    then('o status da resposta é "200 OK"', () => {
      expect(response.status).toBe(200);
    });

    then('o corpo da resposta (JSON) contém os vídeos "101" e "102"', () => {
      expect(response.body.data).toEqual(expect.arrayContaining(['101', '102']));
    });
  });

  test('Obter histórico vazio', ({ given, when, then }) => {
    given('existe um usuário com id "2" cadastrado no sistema', () => {});
    given('esse usuário não possui nenhum vídeo no histórico', () => {});

    when('faço uma requisição GET para "/users/2/history"', async () => {
      response = await supertest(app).get('/api/users/2/history');
    });

    then('o status da resposta é "200 OK"', () => {
      expect(response.status).toBe(200);
    });

    then('o corpo da resposta (JSON) contém uma lista vazia', () => {
      expect(response.body.data).toEqual([]);
    });
  });

  test('Obter histórico de usuário inexistente', ({ given, when, then }) => {
    given('não existe um usuário com id "999" no sistema', () => {});

    when('faço uma requisição GET para "/users/999/history"', async () => {
      response = await supertest(app).get('/api/users/999/history');
    });

    then('o status da resposta é "404 Not Found"', () => {
      expect(response.status).toBe(404);
    });

    then('o corpo da resposta (JSON) indica "Usuário não encontrado"', () => {
      expect(response.body.msg).toBe('Usuário não encontrado');
    });
  });

  test('Adicionar vídeo ao histórico', ({ given, when, then }) => {
    given('existe um usuário com id "3" cadastrado no sistema', () => {});
    given('esse usuário não possui o vídeo "201" no histórico', () => {});

    when('faço uma requisição PUT para "/users/3/history" com o corpo:', async (docString) => {
      const payload = JSON.parse(docString);
      response = await supertest(app).put('/api/users/3/history').send(payload);
    });

    then('o status da resposta deve ser "201 Created"', () => {
      expect(response.status).toBe(201);
    });

    then('o corpo da resposta (JSON) contém "Vídeo adicionado ao histórico"', () => {
      expect(response.body.msg).toBe('Vídeo adicionado ao histórico');
    });

    then('agora o histórico do usuário com id "3" possui o vídeo "201"', async () => {
      const check = await supertest(app).get('/api/users/3/history');
      expect(check.status).toBe(200);
      expect(check.body.data).toContain('201');
    });
  });

  test('Atualizar histórico para um usuário', ({ given, when, then }) => {
    given('existe um usuário com id "3" que já possui o vídeo "201" no histórico', () => {});

    when('faço uma requisição PUT para "/users/3/history" com o corpo:', async (docString) => {
      const payload = JSON.parse(docString);
      response = await supertest(app).put('/api/users/3/history').send(payload);
    });

    then('o status da resposta deve ser "200 OK"', () => {
      expect(response.status).toBe(200);
    });

    then('o corpo da resposta (JSON) contém "Data de visualização atualizada"', () => {
      expect(response.body.msg).toBe('Data de visualização atualizada');
    });
  });
});
