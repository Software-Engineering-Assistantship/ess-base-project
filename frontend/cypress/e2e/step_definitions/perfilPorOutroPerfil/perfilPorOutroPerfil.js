import{ Given, When, Then } from "cypress-cucumber-preprocessor/steps"

Given('estou logada como {string}, com email {string} e senha {string}', (name, email, senha) => {
  cy.visit('http://localhost:3000/login');
  cy.get('.input-field1').clear().type(email);
  cy.get('.input-field2').clear().type(senha);
  cy.get('.loginbutton').click();
  cy.get('.nameuser').should('contain', name);
});

Given('estou na página de {string}, no link {string}', (name, page) => {
    cy.visit(page);
    cy.get('.nameuser').should('contain', name);

});

When('eu clico nos usuário que segue', () => {
    cy.get('[data-cy=num-seguindo]').click();
});

When('eu seleciono "Ver perfil" de {string}', (name) => {
    cy.get('.unit-info-follow')
      .contains(name)
      .parent()
      .parent()
      .parent()
      .within(() => {
        cy.get('.unit-buttons-follow').should('exist');
        cy.get('.view-button-follow').click();
      });
      
})

When('eu estou na página de perfil de {string}', (name) => {
    cy.get('.nameuser').should('contain', name);
})