Feature: Restaurant

    Scenario: Obter restaurante por ID
        Given existe um restaurante cadastrado com id "65d11e187f6b62a1b71494ef" e nome "Comida Boa"
        When uma requisição GET foi enviada para "/restaurants/65d11e187f6b62a1b71494ef"
        Then o status de resposta é "200"
        And a resposta contém id "65d11e187f6b62a1b71494ef" e nome "Comida Boa"
