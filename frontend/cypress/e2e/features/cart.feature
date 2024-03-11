Feature: Cart

Scenario: Adicionar item ao carrinho
    Given O usuário está na página "restaurants/1"
    When o usuário clica no botão "Add to cart" do item de nome "Hamburguer"
    When o usuário vai pra página "cart"
    Then o usuário deve ver o item de id "1" no carrinho

Scenario: Remover item do carrinho
    Given O usuário está na página "restaurants/1"
    And tenho o item de nome "Pizza" cadastrado no carrinho
    When o usuário clica no botão "Remove from cart" do item de nome "Pizza"
    Then o usuário não deve ver o item de nome "Pizza" no carrinho

Scenario: Aumentar quantidade de item
    Given O usuário está na página "cart"
    And Tenho o item "Hamburguer" cadastrado no carrinho em quantidade "2"
    When Eu clico em “+1” para o item "Whopper" 
    Then A quantidade do item "Whopper" incrementa para "3"
    And A label que mostra a quantidade do item reflete a incrementação 
    And O total a ser pago aumenta em "20,99"

Scenario: Limpar carrinho
    Given O usuário está na página "cart"
    And Tenho os itens "Whopper", "Batata", "Coca" no carrinho
    When Eu clico em “Limpar Carrinho" na tela 
    Then os itens "Whopper", "Batata" e "Coca" são removidos do carrinho

Scenario: Fazer pedido
    Given Eu estou na tela "Carrinho" como cliente
    And Tenho os itens "Whopper" ,"Batata" e "Coca" 
    When Eu clico em "Fazer pedido" 
    Then Vejo a confirmação "Pedido efetuado"