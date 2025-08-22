const { loadFeature, defineFeature } = require('jest-cucumber');
const supertest = require('supertest');
const app = require('../../src/app');
const Database = require('../../src/database');
const { di } = require('../../src/di');
const VideoRepository = require('../../src/repositories/video.repository');

const feature = loadFeature('tests/features/video-api.feature');

beforeAll(async () => {
  await Database.reset();
  const dbInstance = await Database.getInstance();
  await dbInstance.seed();
  await di.getRepository(VideoRepository).init();
});

defineFeature(feature, (test) => {
  let response;

  test('Obter dados de vídeo com sucesso', ({ given, when, then }) => {
    given('existe um vídeo com id "101" no sistema', () => {});
    given('esse vídeo tem título "Stranger Things - Piloto"', () => {});
    given('duração "45 minutos"', () => {});

    when('faço uma requisição GET para "/videos/101"', async () => {
      response = await supertest(app).get('/api/videos/101');
    });

    then('o status da resposta é "200 OK"', () => {
      expect(response.status).toBe(200);
    });

    then('o corpo da resposta (JSON) contém:', (docString) => {
      const expected = JSON.parse(docString);
      expect(response.body.data.videoId).toBe(expected.videoId);
      expect(response.body.data.titulo).toBe(expected.titulo);
      expect(response.body.data.duracao).toBe(expected.duracao);
      // Opcional: teste também o videoLink, se necessário
      // expect(response.body.data.videoLink).toBe(expected.videoLink);
    });
  });

  test('Vídeo não encontrado', ({ given, when, then }) => {
    given('não existe um vídeo com id "999"', () => {});
    when('faço uma requisição GET para "/videos/999"', async () => {
      response = await supertest(app).get('/api/videos/999');
    });
    then('o status da resposta é "404 Not Found"', () => {
      expect(response.status).toBe(404);
    });
    then('o corpo da resposta (JSON) indica "Vídeo não encontrado"', () => {
      expect(response.body.msg).toBe('Vídeo não encontrado');
    });
  });

  test('Registrar visualização de vídeo com sucesso', ({ given, when, then }) => {
    given('existe um vídeo com id "101" no sistema', () => {});
    given('existe um usuário com id "1"', () => {});
    when('faço uma requisição POST para "/videos/101/visualizacao" com o corpo:', async (docString) => {
      const payload = JSON.parse(docString);
      response = await supertest(app).post('/api/videos/101/visualizacao').send(payload);
    });
    then('o status da resposta é "201 Created"', () => {
      expect(response.status).toBe(201);
    });
    then('o corpo da resposta (JSON) contém:', (docString) => {
      const expected = JSON.parse(docString);
      expect(response.body.data.message).toBe(expected.message);
      expect(response.body.data.videoId).toBe(expected.videoId);
      expect(response.body.data.userId).toBe(expected.userId);
    });
  });
});
