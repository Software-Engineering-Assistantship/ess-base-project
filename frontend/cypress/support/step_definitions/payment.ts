// cypress/e2e/categories.ts

import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

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
  (label1: string, value1: string, label2: string, value2: string, label3: string, value3: string, label4: string, value4: string, label5: string, value5: string) => {
    cy.get(label1).parent()
    .click()
    .get(`ul > li[data-value=${value1}]`)
    .click();

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
