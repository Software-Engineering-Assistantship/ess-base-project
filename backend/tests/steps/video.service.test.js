const { loadFeature, defineFeature } = require('jest-cucumber');
const VideoService = require('../../src/services/video.service');
const VideoRepository = require('../../src/repositories/video.repository');
const db = require('../../src/database');

const feature = loadFeature('tests/features/video-service.feature');

defineFeature(feature, (test) => {
  let serviceResult;
  let errorCaught;
  let videoService;

  beforeAll(async () => {
    // Obtém a instância do banco de dados (que já se conecta, inicializa e configura)
    const instance = await db.getInstance();
    // Semeia os dados
    await instance.seed();
    // Cria e inicializa o repositório de vídeos
    const videoRepo = new VideoRepository();
    await videoRepo.init();
    // Injeta o repositório no serviço
    videoService = new VideoService(videoRepo);
  });

  test('Retornar vídeo por videoId', ({ given, when, then }) => {
    given('o método getVideo do VideoService retorna um vídeo com videoId "101", título "Stranger Things - Piloto" e duração "45 minutos"', () => {
      // Os dados já estão inseridos pelo seed do banco.
    });
    when('o método getVideo do VideoService for chamado com o id "101"', async () => {
      try {
        serviceResult = await videoService.getVideo('101');
      } catch (err) {
        errorCaught = err;
      }
    });
    then('o vídeo retornado deve ter videoId "101", título "Stranger Things - Piloto" e duração "45 minutos"', () => {
      if (errorCaught) throw errorCaught;
      expect(serviceResult.videoId).toBe('101');
      expect(serviceResult.titulo).toBe('Stranger Things - Piloto');
      expect(serviceResult.duracao).toBe('45 minutos');
    });
  });
});
