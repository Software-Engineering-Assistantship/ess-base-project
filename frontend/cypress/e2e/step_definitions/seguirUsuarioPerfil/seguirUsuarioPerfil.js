import{ Given, When, Then } from "cypress-cucumber-preprocessor/steps"

let initialFollowersCount;

Given('estou logada como {string}, com email {string} e senha {string}', (name, email, senha) => {
  cy.visit('http://localhost:3000/login');
  cy.get('.input-field1').clear().type(email);
  cy.get('.input-field2').clear().type(senha);
  cy.get('.loginbutton').click();
  cy.get('.nameuser').should('contain', name);
});

Given('estou na página de perfil de {string}, no {string}', (name, page) => {
    cy.visit(page);
    cy.get('.nameuser').should('contain', name);

});

Given('tem {string}', (seguidores) => {
    cy.get('.followersuser:contains(" SEGUIDORES")')
    .invoke('text').then((initialFollowers) => {
      initialFollowersCount = parseInt(initialFollowers);
    });
});

When('eu sigo', () => {
    cy.get('[data-cy=seguir-profile]').should('be.visible');
    cy.get('[data-cy=seguir-profile]').click();
});

Then('a mensagem {string} aparece', (msg) => {
  cy.get('.modal-follow-body p').invoke('text').should('contain', msg);
});

Then('tem {string}', (seguidores) => {
  cy.get('.followersuser:contains(" SEGUIDORES")').invoke('text').should('eq', (initialFollowersCount + 1).toString());
});

Then('eu posso deixar de seguir', () => {
  cy.get('[data-cy=deixar-de-seguir-profile]').should('be.visible');
});
