Feature: Confirmação de compra
    As a usuário do Ecommerce
    I want to receber confirmação de compra ao realizar um pedido
    So that posso receber informações do meu pedido

#service scenarios
Scenario: confirmação de pedido bem sucedido
    Given o item "Utilitarismo" está presente na lista do carrinho de compras com os campos
        | nome                | id    | valor | Local de venda | Cupom |
        | Utilitarismo        | 13347 | 25,00 | Salvador       | NA    |
    And está presente no sistema com o campo "<Quantidade>" com valor "342"
    When eu tento finalizar compra
    Then eu recebo por email a mensagem "A compra do livro Utilitarismo por R$25,00 foi confirmada!"
    And o atributo "<quantidade>" do item é atualizado para "341"
    And o item está presente no histórico de compras 
    And o item é removido do meu carrinho de compras

#caso o item seja adicionado ao carrinho antes de ser esgotado por outro comprador
Scenario: tentativa de compra de item presente no carrinho mas não presente no estoque
    Given o item "Harry Potter e a pedra filosofal" está presente na lista do carrinho de compras com os campos
        | nome                                    | id    | valor | Local de venda  | Cupom |
        | Harry Potter e a pedra filosofal        | 39827 | 25,00 | São Paulo       | NA    |
    And está presente no sistema com o campo "<Quantidade>" com valor "0"
    When eu tento finalizar compra
    Then eu vejo a mensagem "Item fora de estoque"
    And o item é removido do meu carrinho de compras