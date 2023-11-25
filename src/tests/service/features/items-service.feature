Feature: Items Service

# Service
Scenario: Obter todos os itens
    Given o método getItems do ItemService retorna um array com o item de nome "item" e id "123"
    When o método getItems do ItemService for chamado
    Then o array retornado deve conter o item de nome "item" e id "123"

Scenario: Obter item por ID
    Given o método getItem do ItemService retorna um item de nome "item" e id "123"
    When o método getItem do ItemService for chamado com o id "123"
    Then o item retornado deve ter o nome "item" e id "123"