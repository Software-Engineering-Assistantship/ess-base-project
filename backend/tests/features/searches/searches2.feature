Feature: Searches

    Scenario: Busca por restaurante quando não há restaurantes cadastrados
        Given não existem restaurantes cadastrados no banco de dados
        When é feita uma requisição GET para "/searches/search_restaurant" com nome "Casa dos Doces"
        Then o status da resposta deve ser "404"
        And a resposta é "Nenhum restaurante foi encontrado porque ainda não há restaurantes cadastrados"
