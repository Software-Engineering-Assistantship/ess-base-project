// cypress/e2e/orders.ts

import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

// Scenario: Criar categoria de um restaurante
Given('o usuário está na página inicial', () => {
  cy.visit('/restaurants')
})

When('o usuário seleciona a opção {string} no menu', (pageName: string) => {
  cy.contains(pageName).click()
})

Then('o sistema exibe uma lista cronológica dos pedidos anteriores', () => {
  cy.get('.order-card').should('exist')
})

// Scenario: Detalhes do Pedido Selecionado
Given('o usuário está na rota {string}', (routeName) => {
  cy.visit(`/${routeName}`)
})

When('o usuário clica para ver os detalhes do primeiro pedido na lista', () => {
  cy.contains('Ver detalhes').first().click()
})

Then('o sistema exibe detalhes completos desse pedido', () => {
  cy.get('.details-dialog').should('exist')
})

// Scenario: Repetir Pedido Anterior
Given('o usuário está na rota de {string}', (routeName: string) => {
  cy.visit(`/${routeName}`)
})

When(
  'o usuário seleciona a opção {string} do primeiro item da lista',
  (buttonName: string) => {
    cy.contains(buttonName).first().click()
  },
)

Then('o novo pedido aparece no histórico', () => {
  cy.get('.order-card').should('have.length.gt', 1)
})

// Scenario: Deletar um Pedido do Histórico
Given('o usuário na rota de {string}', (routeName: string) => {
  cy.visit(`/${routeName}`)
})

When('o usuário clica no botão para apagar o primeiro item da lista', () => {
  cy.get('.delete-order-button').first().click()
})

Then(
  'o pedido não está mais na lista cronológica de pedidos anteriores do usuário',
  () => {
    cy.get('.order-card').should('have.length.gt', 1)
  },
)

// Scenario: Avaliar Restaurante de Pedido Anterior
Given('o usuário navegou para a rota {string}', (routeName: string) => {
  cy.visit(`/${routeName}`)
})

When(
  'o usuário seleciona a opção {string} no primeiro item da lista',
  (buttonName: string) => {
    cy.contains(buttonName).first().click()
  },
)

When('o sistema exibe um modal para avaliar o pedido', () => {
  cy.get('.update-order-dialog').should('exist')
})

Then(
  'o usuário preenche com {string} entrelas e um comentário {string} e clica no botão de avaliar',
  (rate: string, comment: string) => {
    cy.get('.rating-order').type('5')

    cy.get('.comment-order').type(comment)

    cy.get('.submit-rating-button').first().click()
  },
)

Then('o pedido possui avaliação e comentário', () => {
  cy.contains('Muito bom').should('exist')
})
