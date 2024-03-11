Feature: Cart

Scenario: Adicionar item ao carrinho
    Given O usuário está na página "restaurants/1"
    When o usuário clica no botão "Add to cart" do item de nome "Hamburguer"
    When o usuário vai pra página "cart"
    Then o usuário deve ver o item de id "1" no carrinho

Scenario: Remover item do carrinho
    Given O usuário está na página "restaurants/1"
    And tenho o item de nome "Salad" cadastrado no carrinho
    When o usuário clica no botão "Remove from cart" do item de nome "Salad"
    Then o usuário não deve ver o item de nome "Salad" no carrinho

Scenario: Limpar carrinho
    Given O usuário está na página "cart"
    And tenho os itens de nome "Salad" e "Hamburguer" no carrinho
    When o usuário clica no botão "Limpar carrinho" na tela
    Then o usuário não deve ver nenhum item no carrinho

Scenario: Aumentar quantidade de item
    Given tenho o item de nome "Salad" cadastrado no carrinho
    And O usuário está na página "cart"
    When o usuário clica no botão "+" do item de nome "Salad"
    Then a quantidade do item "Salad" incrementa em 1

Scenario: Fazer pedido
    Given tenho o item de nome "Salad" cadastrado no carrinho
    And O usuário está na página "cart"
    When o usuário clica no botão "Fazer pedido" na tela
    Then o usuário recebe a confirmação "Pedido efetuado"