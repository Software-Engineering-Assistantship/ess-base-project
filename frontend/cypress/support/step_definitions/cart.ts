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

// Scenario: Aumentar quantidade de item

// Scenario: Fazer pedido
