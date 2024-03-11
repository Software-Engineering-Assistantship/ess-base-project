// cypress/e2e/restaurants.ts

import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

// Scenario: Criação de um restaurante
Given('que o usuário admin está na rota {string}', (url: string) => {
  cy.visit(url)
})

Given('não existe a categoria de nome {string}', (categoryName: string) => {
  cy.contains(categoryName).should('not.exist')
})

When(
  'o usuário clica no botão de criar categoria {string}',
  (buttonText: string) => {
    cy.contains('button', buttonText).click()
  },
)

When(
  'o usuário preenche o campo {string} com {string} e o campo {string} com {string}',
  (label1: string, value1: string, label2: string, value2: string) => {
    cy.contains('label', label1).next().type(value1)
    cy.contains('label', label2).next().type(value2)
  },
)

When('o usuário clica no botão {string}', (buttonText: string) => {
  cy.contains('button', buttonText).click()
})

Then(
  'o usuário deve ver a categoria {string} na lista de categorias do restaurante',
  (categoryName: string) => {
    cy.contains(categoryName).should('exist')
  },
)
