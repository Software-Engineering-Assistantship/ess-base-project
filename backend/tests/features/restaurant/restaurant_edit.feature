Feature: Restaurant
    
    Scenario: Editar restaurante por ID
        Given existe um restaurante cadastrado com id "65cfeacc31d3a13d8be463c5" e nome "Best Pizza"
        When uma requisição PUT foi enviada para "/restaurants/edit/65cfeacc31d3a13d8be463c5" com nome "Worst Pizza"
        Then o status de resposta é "200"
        And existe um restaurante cadastrado com id "65cfeacc31d3a13d8be463c5" e nome "Worst Pizza"