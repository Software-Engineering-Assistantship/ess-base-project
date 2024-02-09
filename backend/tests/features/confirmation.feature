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
    When eu clico em "Finalizar compra"
    Then eu recebo por email a mensagem "A compra do livro Utilitarismo por R$25,00 foi confirmada!"
    And o atributo "<quantidade>" do item é atualizado para "341"
    And o item está presente no histórico de compras 