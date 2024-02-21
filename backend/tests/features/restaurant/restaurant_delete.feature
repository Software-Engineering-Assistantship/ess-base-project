Feature: Restaurant
    
    Scenario: Deletar restaurante por ID
        Given existe um restaurante cadastrado com id "65c413e6c75a35528c1fff83" e nome "Sei lá Sushi"
        When uma requisição DELETE foi enviada para "/restaurants/delete/65c413e6c75a35528c1fff83"
        Then o status de resposta é "200"
        And não existe um restaurante cadastrado com id "65c413e6c75a35528c1fff83" e nome "Sei lá Sushi"
