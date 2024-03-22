import{ Given, When, Then } from "cypress-cucumber-preprocessor/steps"

let initialFollowingCount;

Given('estou logada como {string}, com email {string} e senha {string}', (name, email, senha) => {
  cy.visit('http://localhost:3000/login');
  cy.get('.input-field1').clear().type(email);
  cy.get('.input-field2').clear().type(senha);
  cy.get('.loginbutton').click();
  cy.get('.nameuser').should('contain', name);
});

Given('eu tenho "2 SEGUINDO"', () => {
    cy.get('.followinguser:contains(" SEGUINDO")')
    .invoke('text').then((initialFollowing) => {
        initialFollowingCount = parseInt(initialFollowing);
    });
});

When('eu visualizo a lista de usuários que sigo', () => {
    cy.get('[data-cy=num-seguindo]').click();
});

When('eu deixo de seguir {string}', (name) => {
    cy.get('.unit-info-follow')
      .contains(name)
      .parent()
      .parent()
      .parent()
      .within(() => {
        cy.get('.unit-buttons-follow').should('exist');
        cy.get('.unfollow-button').should('exist');
        cy.get('.unfollow-button').click();
      });
});

When('volto para a minha página', () => {
    cy.get('.close-button-follow').click();
});

Then('eu tenho "1 SEGUINDO"', () => {
    cy.get('.followinguser:contains(" SEGUINDO")')
    .invoke('text')
    .should('contain', (initialFollowingCount - 1).toString());
});