import { Given, When, Then, And } from '@badeball/cypress-cucumber-preprocessor';

Given('o usuário acessa a página de cadastro', () => {
  cypress.visit('http://localhost:3001/registration'); // Ajuste a rota conforme necessário
});

When('o usuário preenche o campo {string} com {string}', (campo, valor) => {
  cypress.get(`input[placeholder="${campo}"]`).type(valor);
});

And('o usuário clica no botão {string}', (textoBotao) => {
  cypress.get('button').contains(textoBotao).click();
});

Then('o usuário deve ver uma mensagem de cadastro bem-sucedido', () => {
  cypress.contains('Cadastro realizado com sucesso').should('be.visible');
});