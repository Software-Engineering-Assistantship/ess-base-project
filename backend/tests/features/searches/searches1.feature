Feature: Searches

    Scenario: Busca por restaurante
        Given existe um restaurante cadastrado com nome "Casa dos Doces" e outro com nome "Pizza Hut"
        When é feita uma requisição GET para "/searches/search_restaurant" com nome "Doces"
        Then o status da resposta deve ser "200"
        And a resposta é "Casa dos Doces"
