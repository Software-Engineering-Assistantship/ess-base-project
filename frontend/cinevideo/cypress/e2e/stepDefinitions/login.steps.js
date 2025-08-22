import { Given, When, Then, And } from '@badeball/cypress-cucumber-preprocessor';

Given('o usuário acessa a página de login', () => {
  cy.visit('/login');
});

When('o usuário preenche o campo {string} com {string}', (campo, valor) => {
  cy.get(`input[placeholder="${campo}"]`).type(valor);
});

And('o usuário clica no botão {string}', (textoBotao) => {
  cy.get('button').contains(textoBotao).click();
});

Then('o usuário é redirecionado para a página {string}', (pagina) => {
  cy.url().should('include', pagina);
});

And('uma mensagem de boas-vindas é exibida', () => {
  cy.contains('Bem-vindo').should('be.visible'); // Adapte a mensagem de boas-vindas conforme necessário
});