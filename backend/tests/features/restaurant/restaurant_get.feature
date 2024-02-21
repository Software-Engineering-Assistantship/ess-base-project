Feature: Restaurant
    
    Scenario: Obter restaurante por ID
        Given existe um restaurante cadastrado com id "65c41aa2453ca1b7700a197c" e nome "Marco Zero Pizza"
        When uma requisição GET foi enviada para "/restaurants/65c41aa2453ca1b7700a197c"
        Then o status de resposta é "200"
        And a resposta contém id "65c41aa2453ca1b7700a197c" e nome "Marco Zero Pizza"
