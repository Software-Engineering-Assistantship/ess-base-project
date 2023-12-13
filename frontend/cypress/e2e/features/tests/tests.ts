import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

// Scenario: Criar um test
//Given: common-step-definitions.ts

When(
  "o usuário preenche o campo {string} com {string} e clica no botão {string}",
  (field: string, value: string, button: string) => {
    cy.getDataCy(field).type(value);
    cy.getDataCy(button).click();
  }
);

Then("o usuário deve ver a mensagem {string}", (text: string) => {
  cy.on("window:alert", (str) => {
    expect(str).to.equal(text);
  });
});

// Scenario: Criar um test com nome vazio
//Given: common-step-definitions.ts

When(
  "o usuário não preenche o campo {string} e clica no botão {string}",
  (_: string, button: string) => {
    cy.getDataCy(button).click();
  }
);

Then(
  "o usuário deve ver a mensagem {string} do campo {string}",
  (text: string, field: string) => {
    cy.getDataCy(`${field}-error`).should("contain", text);
  }
);

// Scenario: Visualizar tests
Given(
  "o usuário está na página {string} com o test {string} criado",
  (page: string) => {
    cy.visit(page);
  }
);

When("o usuário clica no botão {string}", (button: string) => {
  cy.getDataCy(button).click();
});

Then(
  "o usuário deve ir para a página {string} e ver o test {string}",
  (page: string, test: string) => {
    cy.url().should("include", page);
    cy.getDataCy(`test-item-${test}`).should("contain", test);
  }
);
