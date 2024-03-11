Feature: Cart

Scenario: 1. Remover item do carrinho
    Given Eu estou na tela "Carrinho" como cliente
    And Tenho o item "Whopper" de ID "48372847" cadastrado no carrinho
    When Eu clico em “Excluir” para o item "Whopper" de ID "48372847" 
    Then O item "Whopper" de ID "48372847" não está mais no carrinho

Scenario: 2. Aumentar quantidade de item
    Given Eu estou na tela "Carrinho" como cliente
    And Tenho o item "Whopper" que custa "20,99" cadastrado no carrinho em quantidade "2"
    When Eu clico em “+1” para o item "Whopper" 
    Then A quantidade do item "Whopper" incrementa para "3"
    And A label que mostra a quantidade do item reflete a incrementação 
    And O total a ser pago aumenta em "20,99"

Scenario: 3. Limpar carrinho
    Given Eu estou na tela "Carrinho" como cliente
    And Tenho os itens "Whopper", "Batata", "Coca" no carrinho
    When Eu clico em “Limpar Carrinho" na tela 
    Then os itens "Whopper", "Batata" e "Coca" são removidos do carrinho

Scenario: 4. Fazer pedido
    Given Eu estou na tela "Carrinho" como cliente
    And Tenho os itens "Whopper" ,"Batata" e "Coca" 
    When Eu clico em "Fazer pedido" 
    Then Navego para a tela "Pagamento" 

Scenario: 5. Adicionar item ao carrinho
    Given Eu estou na tela "Restaurante X" como cliente
    And O item "Whopper" não está no carrinho
    And Eu clico em “Adicionar ao carrinho” para o item "Whopper" 
    When Eu vou para a tela "Carrinho"
    Then O item "Whopper" aparecerá no carrinho