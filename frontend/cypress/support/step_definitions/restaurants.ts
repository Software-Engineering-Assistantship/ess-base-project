// cypress/e2e/restaurants.ts

import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

// Scenario: Criação de um restaurante
Given('o usuário admin está na rota {string}', (url: string) => {
  cy.visit(url)
})

Given('não existe o restaurante de nome {string}', (restaurantName: string) => {
  cy.contains(restaurantName).should('not.exist')
})

When(
  'o usuário clica no botão de criar restaurante {string}',
  (buttonText: string) => {
    cy.contains('button', buttonText).click()
  },
)

When(
  'O usuário preenche o campo {string} com {string}, {string} com {string}, {string} com {string} e {string} com {string}',
  (
    label1: string,
    value1: string,
    label2: string,
    value2: string,
    label3: string,
    value3: string,
    label4: string,
    value4: string,
  ) => {
    cy.contains('label', label1).next().type(value1)
    cy.contains('label', label2).next().type(value2)
    cy.contains('label', label3).next().type(value3)
    cy.contains('label', label4).next().type(value4)
  },
)

When('clica no botão {string}', (buttonText: string) => {
  cy.contains('button', buttonText).click()
})

Then(
  'o usuário deve ver o restaurante {string} na lista de restaurantes',
  (restaurantName: string) => {
    cy.contains(restaurantName).should('exist')
  },
)

// Scenario: Atualização de um restaurante
Given('existe o restaurante de nome {string}', (restaurantName: string) => {
  cy.contains(restaurantName).should('exist')
})

When(
  'o usuário clica no símbolo de editar restaurante do restaurante {string}',
  (restaurantName: string) => {
    cy.contains('div', restaurantName)
      .parent()
      .find('[aria-label="edit-restaurant"]')
      .click()
  },
)

When(
  'o usuário atualiza o campo {string} para {string}',
  (fieldName: string, value: string) => {
    cy.contains('label', fieldName).next().clear().type(value)
  },
)

Then(
  'o usuário deve ver o restaurante atualizado com nome {string} na lista de restaurantes',
  (updatedRestaurant: string) => {
    cy.contains(updatedRestaurant).should('exist')
  },
)

// Scenario: Criação de um restaurante com nome já existente

Then(
  'o usuário deve receber uma mensagem de erro contendo {string}',
  (errorMessage: string) => {
    cy.on('window:alert', (text) => {
      expect(text).to.equal(errorMessage)
    })
  },
)

// Scenario: Deleção de um restaurante
When(
  'o usuário clica no símbolo de deletar restaurante com nome {string}',
  (restaurantName: string) => {
    cy.contains('div', restaurantName)
      .parent()
      .find('[aria-label="delete-restaurant"]')
      .click()
  },
)

When(
  'o usuário clica no botão {string} para deletar o restaurante',
  (buttonText: string) => {
    cy.contains('button', buttonText).click()
  },
)

Then(
  'o usuário não deve ver o restaurante de nome {string} na lista de restaurantes',
  (deletedRestaurant: string) => {
    cy.contains(deletedRestaurant).should('not.exist')
  },
)

// Scenario: Criação de um restaurante com nome não preenchido

When(
  'O usuário preenche o campo {string} com {string}, {string} com {string} e {string} com {string}',
  (
    label2: string,
    value2: string,
    label3: string,
    value3: string,
    label4: string,
    value4: string,
  ) => {
    cy.contains('label', label2).next().type(value2)
    cy.contains('label', label3).next().type(value3)
    cy.contains('label', label4).next().type(value4)
  },
)

Then(
  'o usuário deve receber uma indicação de erro contendo {string}',
  (message: string) => {
    cy.contains(message).should('exist')
  },
)
