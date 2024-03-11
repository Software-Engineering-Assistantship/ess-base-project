// cypress/e2e/cart.ts

import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

// Scenario: Remover item do carrinho
Given('Eu estou na tela {string} como cliente', (page) => {
    cy.visit('/carrinho');
  });
  
  Given('Tenho o item {string} de ID {string} cadastrado no carrinho', (itemName, itemId) => {
    cy.get('button[data-test-id="add-to-cart-button"]').click();
  });
  
  When('Eu clico em “Excluir” para o item {string} de ID {string}', (itemName, itemId) => {
    cy.get('button[data-test-id="delete-item-button"]').click();
  });
  
  When('Eu vejo uma mensagem de confirmação para a exclusão do item', () => {
    cy.get('div[data-test-id="delete-confirmation-message"]').should('be.visible');
  });
  
  When('Eu clico em "Confirmar"', () => {
    // Implement clicking on the confirmation button
    cy.get('button[data-test-id="confirm-button"]').click();
  });
  
  Then('O item {string} de ID {string} não está mais no carrinho', (itemName, itemId) => {
    cy.get('div[data-test-id="cart-item"]').should('not.exist');
  });