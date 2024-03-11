import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

// Scenario: 5. Adicionar item ao carrinho
Given('O usuário está na página {string}', (url: string) => {
  cy.visit(url)
})

// Given('não existe um item de id {string} no carrinho', (itemId: string) => {
//   cy.visit("http://localhost:5173/cart")
//   cy.get('[data-test="cart-list"]').should("not-contain", itemId)
// })

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


// Scenario: 1. Remover item do carrinho
When(
  'o usuário clica em excluir o item de ID {string}',
  (itemId: string) => {
    cy.contains('div', itemId)
      .parent()
      .find('[className="RemoverItem"]')
      .click()
  },
)


Then(
  'o usuário não deve ver o item de id {string} no carrinho',
  (itemId: string) => {
    cy.contains(itemId).should('not.exist')
  },
)


// Scenario: 3. Limpar carrinho
When(
  'Eu clico em limpar carrinho',
  (itemId: string) => {
    cy.contains('div', itemId)
      .parent()
      .find('[className="Limpar"]')
      .click()
  },
)

// Then(
//   'o usuário não deve ver nenhum irem no carrinho',
//   (itemId: string) => {
//     cy.count.should('not.exist')
//   },
// )