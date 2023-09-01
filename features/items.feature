Feature: Items API

  Scenario: Obter item por ID
    Given o ItemService retorna um item com id "123" e nome "Exemplo de Item"
    When uma requisição "GET" for enviada para "/items/123"
    Then o status da resposta deve ser "200"
    And o JSON da resposta deve conter id "123" e nome "Exemplo de Item"

  Scenario: Obter todos os itens
    Given o ItemService retorna uma lista de itens
    When uma requisição "GET" for enviada para "/items"
    Then o status da resposta deve ser "200"
    And o JSON da resposta deve ser uma lista de itens 
    And o item com id "123" e nome "Exemplo de Item" está na lista
    And o item com id "456" e nome "Outro Item" está na lista