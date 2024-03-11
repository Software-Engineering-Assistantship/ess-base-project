// cypress/e2e/categories.ts

import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

// Scenario: Criar forma de pagamento
Given('que o usuário está na página {string}', (url: string) => {
  cy.visit(url)
})

Given('não existe um cartão com final {string}', (categoryName: string) => {
  cy.contains(categoryName).should('not.exist')
})

When(
  'o usuário clica no botão de adicionar novo cartão {string}',
  (buttonText: string) => {
    cy.contains('button', buttonText).click()
  },
)

When(
  'o usuário seleciona o campo {string} com {string} e o campo {string} com {string} e o campo {string} com {string} e o campo {string} com {string} e o campo {string} com {string}',
  (
    label1: string,
    value1: string,
    label2: string,
    value2: string,
    label3: string,
    value3: string,
    label4: string,
    value4: string,
    label5: string,
    value5: string,
  ) => {
    cy.get(label1).parent().click().get(`ul > li[data-value=${value1}]`).click()

    cy.contains('label', label2).next().type(value2)
    cy.contains('label', label3).next().type(value3)
    cy.contains('label', label4).next().type(value4)
    cy.contains('label', label5).next().type(value5)
  },
)

When('o usuário clica no botão de salvar {string}', (buttonText: string) => {
  cy.contains('button', buttonText).click()
})

Then(
  'o usuário deve ver os últimos dígitos {string} na lista de cartões',
  (categoryName: string) => {
    cy.contains(categoryName).should('exist')
  },
)

// Scenario: Criar forma de pagamento com mesmo número
Given(
  'existe um cartão com os 4 últimos dígitos {string}',
  (cardNumber: string) => {
    cy.contains(cardNumber).should('exist')
  },
)

Then(
  'o usuário deve receber uma mensagem de erro com o texto {string}',
  (errorMessage: string) => {
    cy.on('window:alert', (text) => {
      expect(text).to.equal(errorMessage)
    })
  },
)

// Scenario: Editar forma de pagamento
Given('que o usuário não admin está na página {string}', (url: string) => {
  cy.visit(url)
})

When(
  'o usuário clica no símbolo de editar cartão do cartão {string}',
  (cardNumber: string) => {
    cy.contains('div', cardNumber)
      .parent()
      .find('[aria-label="Editar"]')
      .click()
  },
)

When(
  'o usuário atualiza o campo {string} com o número {string}',
  (label1: string, value1: string) => {
    cy.contains('label', label1).next().type(value1)
  },
)

When('o usuário clica no botão para salvar {string}', (buttonText: string) => {
  cy.contains('button', buttonText).click()
})

Then(
  'o usuário deve ver o número {string} na lista de cartões',
  (cardNumber: string) => {
    cy.contains(cardNumber).should('exist')
  },
)

// Scenario: Deletar cartão
When(
  'o usuário clica no símbolo de deletar cartão do cartão {string}',
  (cardNumber: string) => {
    cy.contains('div', cardNumber)
      .parent()
      .find('[aria-label="Excluir"]')
      .click()
  },
)

When(
  'o usuário clica no botão de confirmação {string}',
  (buttonText: string) => {
    cy.contains('button', buttonText).click()
  },
)

Then(
  'o usuário não deve ver o cartão de número {string} na lista de cartões',
  (cardNumber: string) => {
    cy.contains(cardNumber).should('not.exist')
  },
)
