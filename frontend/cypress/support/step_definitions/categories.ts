// cypress/e2e/categories.ts

import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

// Scenario: Criar categoria de um restaurante
Given('que o usuário admin está na página {string}', (url: string) => {
  const urlWithoutId = url.split(':restaurantId')[0]

  cy.visit(urlWithoutId)
  cy.get('p').first().click()
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

// Scenario: Editar categoria de um restaurante
Given('existe a categoria de nome {string}', (categoryName: string) => {
  cy.contains(categoryName).should('exist')
})

When(
  'o usuário clica no símbolo de editar categoria do item {string}',
  (categoryName: string) => {
    cy.contains('div', categoryName)
      .parent()
      .find('[aria-label="edit"]')
      .click()
  },
)

When(
  'o usuário atualiza o campo {string} com o valor {string}',
  (fieldName: string, value: string) => {
    cy.contains('label', fieldName).next().clear().type(value)
  },
)

Then(
  'o usuário deve ver a categoria atualizada com o nome {string} na lista de categorias do restaurante',
  (updatedCategoryName: string) => {
    cy.contains(updatedCategoryName).should('exist')
  },
)

// Scenario: Criar categoria de um restaurante com nome já existente
Given(
  'já existe a categoria de nome {string}',
  (existingCategoryName: string) => {
    cy.contains(existingCategoryName).should('exist')
  },
)

When(
  'o usuário preenche o campo da nova categoria {string} com {string} e o campo {string} com {string}',
  (label1: string, value1: string, label2: string, value2: string) => {
    cy.contains('label', label1).next().type(value1)
    cy.contains('label', label2).next().type(value2)
  },
)

Then(
  'o usuário deve receber uma mensagem de erro com {string}',
  (errorMessage: string) => {
    cy.on('window:alert', (text) => {
      expect(text).to.equal(errorMessage)
    })
  },
)

// Scenario: Deletar categoria de um restaurante
When(
  'o usuário clica no símbolo de deletar categoria do item {string}',
  (categoryName: string) => {
    cy.contains('div', categoryName)
      .parent()
      .find('[aria-label="delete"]')
      .click()
  },
)

Then(
  'o usuário não deve ver a categoria de nome {string} na lista de categorias do restaurante',
  (deletedCategoryName: string) => {
    cy.contains(deletedCategoryName).should('not.exist')
  },
)
