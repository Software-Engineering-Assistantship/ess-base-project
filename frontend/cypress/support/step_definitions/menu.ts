// cypress/e2e/menu.ts

import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

// Scenario: Criar categoria de um restaurante
Given('que o usuário admin está na rota {string}', (url: string) => {
  const urlWithoutId = url.split(':restaurantId')[0]

  cy.visit(urlWithoutId)
  cy.get('p').first().click()
})

When('seleciono a opção de {string}', (buttonName: string) => {
  cy.contains(buttonName).click()
})

Then(
  'insiro um item com nome {string}, descrição {string}, preço {string}, quantidade {string} e a primeira categoria da lista no cardápio',
  (name: string, description: string, price: string, quantity: string) => {
    cy.get('#menu-item-name').type(name)
    cy.get('#menu-item-description').type(description)
    cy.get('#menu-item-price').type(price)
    cy.get('#menu-item-quantity').type(quantity)
    cy.get('input[id="category"]').click()
    cy.get('li[data-option-index="0"]').click()
  },
)

When('clico para salvar as informações inseridas', () => {
  cy.get('form').submit()
})

Then(
  'vejo o novo item do cardápio na lista com o nome {string}',
  (itemName: string) => {
    cy.contains(itemName).should('exist')
  },
)

// Scenario: Atualização de um item do cardápio bem sucedida
When('o usuário clica no botão para editar o primeiro item da lista', () => {
  cy.get('svg[data-testid="edit-icon"]').first().click()
})

Then(
  'modifico o nome do item para {string}, descrição {string}, preço {string}, quantitade {string} e a primeira categoria',
  (itemName: string, description: string, price: string, quantity: string) => {
    cy.get('#menu-item-name').clear().type(itemName)
    cy.get('#menu-item-description').clear().type(description)
    cy.get('#menu-item-price').clear().type(price)
    cy.get('#menu-item-quantity').clear().type(quantity)
    cy.get('input[id="category"]').click()
    cy.get('li[data-option-index="0"]').click()
  },
)

Then('o item é atualizado para o novo nome {string}', (itemName: string) => {
  cy.contains(itemName).should('exist')
})

// Scenario: Deleção de um item do cardápio bem sucedida
When('seleciono a opção de deletar o item {string}', (itemTitle: string) => {
  // Click on the delete icon of the item with the specified title
  cy.contains('div', itemTitle)
    .parent()
    .find('svg[data-testid="delete-icon"]')
    .click()
})

Then('recebo um modal de confirmação da deleção do item', () => {
  cy.get('.delete-item-dialog').should('exist')
})

When('seleciono a opção de confirmar a deleção', () => {
  cy.get('.delete-item-button').click()
})

Then(
  'não vejo mais o item com o nome {string} na listagem',
  (itemName: string) => {
    cy.contains(itemName).should('not.exist')
  },
)

// Scenario: Leitura de todos os itens do cardápio de um restaurante
Then(
  'visualizo os itens {string} e {string}',
  (firstItemName: string, secondItemName: string) => {
    cy.contains(firstItemName).should('exist')
    cy.contains(secondItemName).should('exist')
  },
)
