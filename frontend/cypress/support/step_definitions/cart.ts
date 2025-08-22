import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

// Scenario: Adicionar item ao carrinho
Given('O usuário está na página {string}', (url: string) => {
  cy.visit(url)
})


When(
  'o usuário clica no botão {string} do item de nome {string}',
  (buttonText: string, itemName: string) => {
    cy.contains(itemName)
      .parent()
      .parent()
      .contains('button', buttonText).click()
  },
)

When(
  'o usuário vai pra página {string}', (url: string) => {
    cy.visit(url)
  })

Then(
  'o usuário deve ver o item de id {string} no carrinho',
  (itemId: string) => {
    cy.contains(itemId).should('exist')
  },
)


// Scenario: Remover item do carrinho
Given('tenho o item de nome {string} cadastrado no carrinho', (itemName: string) => {
  cy.visit("restaurants/1")
  cy.contains(itemName)
    .parent()
    .parent()
    .contains('button', 'Add to cart').click()
})

Then(
  'o usuário não deve ver o item de nome {string} no carrinho',
  (itemName: string) => {
    cy.visit("cart")
    cy.contains(itemName).should('not.exist')
  },
)


// Scenario: Limpar carrinho
Given('tenho os itens de nome {string} e {string} no carrinho', (itemName1: string, itemName2: string) => {
  cy.visit("restaurants/1")
  cy.contains(itemName1)
    .parent()
    .parent()
    .contains('button', 'Add to cart').click()
  cy.contains(itemName2)
    .parent()
    .parent()
    .contains('button', 'Add to cart').click()

  cy.visit("cart")
  cy.contains(itemName1).should('exist')
  cy.contains(itemName2).should('exist')

})

When(
  'o usuário clica no botão {string} na tela', (buttonText: string) => {
    cy.contains('button', buttonText).click()
  }
)

Then(
  'o usuário não deve ver nenhum item no carrinho',
  () => {
    cy.get('[data-test="cart-list"]').contains('p', 'Seu carrinho está vazio.').should('exist')
  },
)

// Scenario: Aumentar quantidade de item

Then(
  'a quantidade do item {string} incrementa em 1',
  (itemName: string) => {
    cy.contains(itemName)
    .parent()
    .parent()
    .get('[data-test="quantityWrapper"]').contains('span', '2').should('exist')
  },
)

// Scenario: Fazer pedido

Then(
  'o usuário recebe a confirmação {string}',
  (notification: string) => {
    cy.contains(notification).should('exist')
  },
)