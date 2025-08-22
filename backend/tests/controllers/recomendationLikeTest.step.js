import fs from 'fs'
import app from "../../src/app";
const supertest = require('supertest'); 
const request = supertest(app);
const { loadFeature, defineFeature } = require('jest-cucumber');
const feature = loadFeature('tests/features/recomendation_like.feature');

let server;
let response;
let userData;
let usersData;

beforeAll((done) => {
  server = app.listen(4000, () => {
    done();
  });
});

afterAll(async () => {
  server.close(() => {});
});


defineFeature(feature, (test) => {

  test('Exibindo recomendações com base nas curtidas', ({ given, when, then, and }) => {
    
    given(/^O usuário "(.*)" está logado no sistema$/, (username) => {
      usersData = JSON.parse(fs.readFileSync('src/database/users.json', 'utf8'));
      userData = usersData.find(user => user.user === username);

      expect(userData.user).toEqual(username);
    });

    when(/^Uma requisição "(.*)" é enviada para "(.*)"$/, async (method, route) => {
      response = await request
        .get(route);
    });

    then(/^O status da resposta deve ser "(.*)"$/, (statusCode) => {
      expect(response.status).toBe(parseInt(statusCode, 10));
    });

    and(/^O JSON da resposta contém a lista "(.*)" com os itens "(.*)", "(.*)", "(.*)", "(.*)", "(.*)", "(.*)", "(.*)", "(.*)", "(.*)", "(.*)"$/, (list, item1, item2, item3, item4, item5, item6, item7, item8, item9, item10) => {
      expect(response.body).toContain(item1, item2, item3, item4, item5, item6, item7, item8, item9, item10);
    });
  });

});

