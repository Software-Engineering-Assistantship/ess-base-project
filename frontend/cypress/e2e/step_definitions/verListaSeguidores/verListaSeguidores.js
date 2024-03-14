import{ Given, When, Then } from "cypress-cucumber-preprocessor/steps"

Given('estou logada como {string}, com email {string} e senha {string}', (name, email, senha) => {
    cy.visit('http://localhost:3000/login');
    cy.get('.input-field1').clear().type(email);
    cy.get('.input-field2').clear().type(senha);
    cy.get('.loginbutton').click();
    cy.get('.nameuser').should('contain', name);
});

Given('o usuário {string} segue {string}', (name1, name2) => {
    cy.get('.nameuser').should('contain', name2);
    cy.get('.nameuser').should('not.contain', name1);
});

When('eu clico em “SEGUIDORES”', () => {
    cy.get('[data-cy=num-seguidores]').click();
});

Then('eu deveria ver a lista {string}', (title) => {
    cy.get('.list-follow-title').invoke('text').should('contain', title);
});

Then('posso ver o usuário {string} na lista', (name) => {
    cy.contains(name).should('exist');
});