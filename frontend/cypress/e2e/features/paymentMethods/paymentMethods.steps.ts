import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// Given steps
Given('estou logado como cliente com o username {string} e a senha {string}', (username: string, password: string) => {
    cy.visit('/client/login');
    cy.get('[data-cy="username-c"]').type(username);
    cy.get('[data-cy="password-c"]').type(password);
    cy.get('[data-cy="login-button-c"]').click();
});

Given('eu vou para a página {string}', (page: string) => {
    cy.visit(page);
});

Given('não há nenhum método de pagamento cadastrado', () => {
    cy.get('[data-cy="cartao-item"]').should('not.exist');
});

Given('o método de pagamento com o número final 4242 está cadastrado com text {string}', (textCard: string) => {    
    cy.get('[data-cy="cartao-item-text"]').contains(textCard).should('be.visible');
});

// When steps
When('eu clico em adicionar um novo método de pagamento', () => {
    cy.wait(1000); // Espera por 1 segundo
    cy.get('[data-cy="add-card-button"]').click();
});

When('eu preencho o campo {string} com {string}', (field: string, value: string) => {
    //cy.get(`[data-cy="${field}"]`).clear();
    cy.get(`[data-cy="${field}"]`).type(value);
});

When('eu seleciono o tipo de cartão {string}', (type: string) => {
    cy.get('[data-cy="type-select"]').select(type);
});

When('eu clico em salvar', () => {
    cy.get('[data-cy="save-button"]').click();
});

When('eu clico em editar o método de pagamento com o número final {string}', (lastFourDigits: string) => {
    //cy.get('[data-cy="cartao-item"]').contains(`****${lastFourDigits}`).click();
    cy.get('[data-cy="edit-button"]').click();
});

When('eu clico em deletar o método de pagamento com o número final {string}', (lastFourDigits: string) => {
    //cy.get('[data-cy="cartao-item"]').contains(`****${lastFourDigits}`).click();
    cy.get('[data-cy="delete-button"]').click();
});

When('eu apago o campo cpf', () => {
    cy.get('[data-cy="cpf"]') // Seletor do campo CPF
      .clear(); // Apaga o conteúdo do campo
});

Then('eu vejo um toast de sucesso com a mensagem {string}', (message) => {
    cy.get('.chakra-toast').should('contain.text', message);
});

Then('eu vejo o método de pagamento com text {string} cadastrado', (message) => {
    cy.get('[data-cy="cartao-item-text"]').should('contain.text', message);
});


Then('o método de pagamento com o text {string} não está mais cadastrado', (cardText: string) => {
    cy.get('[data-cy="cartao-item-text"]').should('not.exist', cardText);
});

Then('eu vejo um toast de Erro com a mensagem {string}', (message) => {
    cy.get('.chakra-toast').should('contain.text', message);; // Verifica se o texto contém a mensagem esperada
});

