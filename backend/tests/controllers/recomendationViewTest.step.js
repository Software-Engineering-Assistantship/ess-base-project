import fs from 'fs'
import app from "../../src/app";
const supertest = require('supertest'); 
const request = supertest(app);
const { loadFeature, defineFeature } = require('jest-cucumber');
const feature = loadFeature('tests/features/recomendation_view.feature');

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

  test('Exibindo recomendações para o usuário com histórico de visualizações (gênero 1) (Service)', ({ given, when, then, and }) => {
    
    given(/^A lista "(.*)" do usuário "(.*)" contém os itens "(.*)", "(.*)"$/, (list, username, item1, item2) => {
      usersData = JSON.parse(fs.readFileSync('src/database/users.json', 'utf8'));
      userData = usersData.find(user => user.user === username);

      expect(userData).toBeDefined();
      expect(userData.user).toEqual(username);

      // Verifica se a lista existe
      expect(userData).toHaveProperty(list);
      const userList = userData[list];

      // Verifica se a lista é um array
      expect(Array.isArray(userList)).toBe(true);

      // Verifica se os itens estão na lista
      expect(userList).toContain(item1);
      expect(userList).toContain(item2);
    });

    when(/^Uma requisição "(.*)" é enviada para "(.*)"$/, async (method, route) => {
      response = await request
        .get(route);
    });

    then(/^O status da resposta deve ser "(.*)"$/, (statusCode) => {
      expect(response.status).toBe(parseInt(statusCode, 10));
    });

    and(/^O JSON da resposta contém os itens "(.*)", "(.*)"$/, (item1, item2) => {
      expect(response.body).toContain(item1, item2);
    });
  });

  test('Exibindo recomendações para o usuário com histórico de visualizações (gênero 2) (Service)', ({ given, when, then, and }) => {
    
    given(/^A lista "(.*)" do usuário "(.*)" contém o item "(.*)"$/, (list, username, item) => {
      usersData = JSON.parse(fs.readFileSync('src/database/users.json', 'utf8'));
      userData = usersData.find(user => user.user === username);

      expect(userData).toBeDefined();
      expect(userData.user).toEqual(username);

      // Verifica se a lista existe
      expect(userData).toHaveProperty(list);
      const userList = userData[list];

      // Verifica se a lista é um array
      expect(Array.isArray(userList)).toBe(true);

      // Verifica se o item está na lista
      expect(userList).toContain(item);
    });

    when(/^Uma requisição "(.*)" é enviada para "(.*)"$/, async (method, route) => {
      response = await request
        .get(route);
    });

    then(/^O status da resposta deve ser "(.*)"$/, (statusCode) => {
      expect(response.status).toBe(parseInt(statusCode, 10));
    });

    and(/^O JSON da resposta contém os itens "(.*)", "(.*)"$/, (item1, item2) => {
      expect(response.body).toContain(item1, item2);
    });
  });

  test('Exibindo recomendações para o usuário sem histórico de visualizações (Service)', ({ given, when, then, and }) => {
    
    given(/^A lista "(.*)" do usuário "(.*)" está vazia$/, (list, username) => {
      usersData = JSON.parse(fs.readFileSync('src/database/users.json', 'utf8'));
      userData = usersData.find(user => user.user === username);

      expect(userData).toBeDefined();
      expect(userData.user).toEqual(username);

      // Verifica se a lista existe
      expect(userData).toHaveProperty(list);
      const userList = userData[list];

      // Verifica se a lista é um array
      expect(Array.isArray(userList)).toBe(true);

      // Verifica se o item está na lista
      expect(userList.length).toBe(0);
    });

    when(/^Uma requisição "(.*)" é enviada para "(.*)"$/, async (method, route) => {
      response = await request
        .get(route);
    });

    then(/^O status da resposta deve ser "(.*)"$/, (statusCode) => {
      expect(response.status).toBe(parseInt(statusCode, 10));
    });

    and(/^O JSON da resposta contém os itens "(.*)", "(.*)"$/, (item1, item2) => {
      expect(response.body).toContain(item1, item2);
    });
  });
});