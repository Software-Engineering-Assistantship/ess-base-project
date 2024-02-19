Feature: Restaurant
        
    Scenario: cadastrar restaurante novo
        Given não existe um restaurante cadastrado com nome "Marcelinho Doces" e endereço "Rua dos Reitores, 220 - Várzea, Recife"
        When uma requisição POST foi enviada para "/restaurants/create" com nome "Marcelinho Doces", endereço "Rua dos Reitores, 220 - Várzea, Recife" e tipo de comida "Doces"
        Then o status de resposta é "200"
        And existe um restaurante cadastrado com nome "Marcelinho Doces", endereço "Rua dos Reitores, 220 - Várzea, Recife" e tipo de comida "Doces"

