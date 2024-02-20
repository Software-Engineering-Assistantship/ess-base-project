Feature: User

Scenario: Editar nome de perfil por ID
    Given existe um usuário cadastrado com ID "65d51e36c3b06ec45cdd2ac8" e nome "Guilhme"
    When uma requisição PUT foi enviada para "/users/edit/65d51e36c3b06ec45cdd2ac8" alterando o nome para "Guilherme"
    Then o status da resposta é "200"
    And existe um usuário cadastrado com ID "65d51e36c3b06ec45cdd2ac8" e nome "Guilherme" no banco de dados