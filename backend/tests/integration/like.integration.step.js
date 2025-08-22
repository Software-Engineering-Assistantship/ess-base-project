import request from 'supertest';
import fs from 'fs';
import path from 'path';
import app from '../../src/app.js'; 

const filePath = path.resolve('src/database/users.json');

describe('Teste de Integração - Likes', () => {
  let originalData;

  beforeAll(() => {
    originalData = fs.readFileSync(filePath, 'utf-8');
  });

  afterAll(() => {
    fs.writeFileSync(filePath, originalData, 'utf-8');
  });

  test('Deve curtir uma série com sucesso e atualizar o arquivo JSON', async () => {
    const userId = 'Ykaro';
    const serie = 'The Boys';

    const response = await request(app)
      .put(`/user/curtir/${userId}`)
      .send({ serie })
      .expect(200); 

    expect(response.body).toEqual({
      message: 'Série curtida com sucesso!',
      user: expect.objectContaining({
        user: userId,
        'Séries Curtidas': expect.arrayContaining([serie]),
      }),
    });

    const updatedData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const user = updatedData.find((u) => u.user === userId);
    
    expect(user).toBeDefined();
    expect(user["Séries Curtidas"]).toContain(serie);
  });
});
