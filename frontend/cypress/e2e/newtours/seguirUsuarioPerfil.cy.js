const { Given, When, Then } = require("cypress-cucumber-preprocessor");

Given('estou na página de perfil {string}', (page) => {
    cy.visit(page);

});

Given('tem {string}', (seguidores) => {
    cy.get('[data-cy=num-seguidores]').should('be.visible');
    cy.on('[data-cy=num-seguidores]', (str) => {
      expect(str).to.equal(seguidores);});
});

When('eu sigo', () => {
    cy.get('[data-cy=seguir-profile]').should('be.visible');
    cy.get('[data-cy=seguir-profile]').click();
});

Then('tem {string}', (seguidores) => {
  cy.get('[data-cy=num-seguidores]').should('be.visible');
  cy.on('[data-cy=num-seguidores]', (str) => {
    expect(str).to.equal(seguidores);});
});

Then('eu posso deixar de seguir', () => {
  cy.get('[data-cy=deixar-de-seguir-profile]').should('be.visible');
});
