import fs from 'fs'
import app from "../../src/app";
const supertest = require('supertest'); 
const request = supertest(app);
const { loadFeature, defineFeature } = require('jest-cucumber');
const feature = loadFeature('tests/features/like.feature');

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

  test('Obter a lista de séries curtidas pelo usuário', ({ given, when, then, and }) => {
    
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

    and(/^O JSON da resposta contém o item "(.*)"$/, (serie) => {
      expect(response.body).toContain(serie);
    });
  });

  test('Adicionar item a lista de "Séries Curtidas"', ({ given, and, when, then }) => {

    given(/^A lista "(.*)" do usuário "(.*)" contém o item "(.*)"$/, (list, username, item) => {

      usersData = JSON.parse(fs.readFileSync('src/database/users.json', 'utf8'));
      userData = usersData.find(user => user.user === username);
      
      expect(userData[list]).toContain(item); 
    });
    

    when(/^Uma requisição "(.*)" é enviada para "(.*)" com o item "(.*)"$/, async (method, route, serie) => {
      response = await request
        .put(route)
        .send({ serie });
    });

    then(/^O status da resposta deve ser "(.*)"$/, (statusCode) => {
      expect(response.status).toBe(parseInt(statusCode, 10));
    });

    and(/^A lista "(.*)" do usuário "(.*)" contém os itens "(.*)" e "(.*)"$/, (list, username, item1, item2) => {

      usersData = JSON.parse(fs.readFileSync('src/database/users.json', 'utf8'));
      userData = usersData.find(user => user.user === username);
      
      expect(userData[list]).toEqual(expect.arrayContaining([item1, item2]));
      request.put("/user/descurtir/Ykaro").send({ item2 });

    });
  });

  test('Remover item da lista de "Séries Curtidas"', ({ given, when, then, and }) => {

    given(/^A lista "(.*)" do usuário "(.*)" contém os itens "(.*)" e "(.*)"$/, (list, username, item1, item2) => {

      usersData = JSON.parse(fs.readFileSync('src/database/users.json', 'utf8'));
      userData = usersData.find(user => user.user === username);
      
      expect(userData[list]).toEqual(expect.arrayContaining([item1, item2]));
 
    });
    
    when(/^Uma requisição "(.*)" é enviada para "(.*)" com o item "(.*)"$/, async (method, route, serie) => {
      response = await request
        .put(route)
        .send({ serie });
    });

    then(/^O status da resposta deve ser "(.*)"$/, (statusCode) => {
      expect(response.status).toBe(parseInt(statusCode, 10));
    });

    and(/^A lista "(.*)" do usuário "(.*)" contém o item "(.*)"$/, (list, username, item) => {

      usersData = JSON.parse(fs.readFileSync('src/database/users.json', 'utf8'));
      userData = usersData.find(user => user.user === username);
      
      expect(userData[list]).toContain(item); 
    });
  });
});

