import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("eu estou na página {string}", (page: string) => {
  cy.visit(page);
});

When(
  "eu preencho o campo {string} com {string}",
  (field: string, value: string) => {
    cy.get(`[data-cy="${field}"]`).type(value);
  }
);

When("eu seleciono {string}", (button: string) => {
  cy.get(`[data-cy="${button}"]`).click();
});

Then(
  "eu vejo um toast de sucesso com a mensagem {string}",
  (message: string) => {
    cy.get(".Toastify__toast-body").should("contain.text", message);
  }
);

Then("eu vejo um toast de erro com a mensagem {string}", (message: string) => {
  cy.get(".Toastify__toast-body").should("contain.text", message);
});

Then("eu sou redirecionado para a página {string}", (page: string) => {
  cy.url().should("include", page);
});
Then("eu continuo na página {string}", (page: string) => {
  cy.url().should("include", page);
});
