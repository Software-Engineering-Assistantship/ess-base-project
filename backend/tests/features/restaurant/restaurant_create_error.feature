 Feature: Restaurant
 
 Scenario: erro ao cadastrar restaurante existente
        
        Given existe um restaurante cadastrado com nome "Rango da Dona Maria" e endereço "Avenida Paulista, 1223 - Bela Vista, São Paulo"
        When uma requisição POST foi enviada para "/restaurants/create" com nome "Rango da Dona Maria", endereço "Avenida Paulista, 1223 - Bela Vista, São Paulo" e tipo de comida "Regional"
        Then o status de resposta é "400"
        And a resposta é "Restaurante já cadastrado"
