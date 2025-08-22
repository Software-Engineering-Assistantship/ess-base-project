const { Given, When, Then } = require('jest-cucumber');
const request = require('supertest');
const app = require('../../src/index'); // Certifique-se de que o caminho está correto
const fs = require('fs');
const path = require('path');

// Step: Garantir que não há usuário com o nome de usuário 'LucasHenrique'
Given('não há usuário cadastrado no sistema com usuário {string}', (username) => {
  const data = JSON.parse(fs.readFileSync(path.resolve('./samples/users.json'), 'utf-8'));
  const user = data.find(u => u.username === username);
  if (user) {
    // Remover o usuário para garantir que o cadastro funcione no teste
    const updatedData = data.filter(u => u.username !== username);
    fs.writeFileSync(path.resolve('./samples/users.json'), JSON.stringify(updatedData, null, 2));
  }
});

// Step: Fazer a requisição POST para criar o usuário
When('Faço uma Requisição POST para a rota "/users" com os seguintes dados:', async (dataTable) => {
  const userData = dataTable.rowsHash();
  // Remover o campo 'Foto' pois não estamos lidando com upload de imagens em testes simples
  const { Foto, ...userWithoutFoto } = userData;

  this.response = await request(app)
    .post('/users')
    .send({
      ...userWithoutFoto,
      photo: Foto,
      confirmPassword: userData.Senha,  // Enviar o campo confirmPassword para testar a verificação de senha
    });
});

// Step: Verificar se o usuário foi criado com sucesso
Then('o usuário deve ser cadastrado com sucesso', () => {
  const { status, body } = this.response;
  expect(status).toBe(201);
  expect(body).toHaveProperty('id');
  expect(body.fullName).toBe('Lucas Henrique');
  expect(body.username).toBe('LucasHenrique');
  expect(body.birth_date).toBe('20/02/2004');
  expect(body.gender).toBe('Masculino');
});
