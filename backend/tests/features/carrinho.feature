Feature: Carrinho de compras
    As a usuário de Ecommerce
    I want to adicionar no carrinho os produtos que desejo comprar
    So that eu possa comprar todos os produtos que escolhi

#service scenarios
Scenario: Adicionar um produto no carrinho
    Given que estou na página do produto
    And o produto está disponível com os seguintes dados:
        | Nome do produto | id    | quantidade | valor   | Local de venda |
        | Piada mortal    | 123456| 7          | R$20,00 | São Paulo      |
    When eu clico no botão "Adicionar ao carrinho"
    Then o produto é adicionado no carrinho
