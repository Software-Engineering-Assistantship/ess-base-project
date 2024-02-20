Feature: User

    Scenario: Deletar usuário por ID
        Given existe um usuário cadastrado com ID "65d51f9ac3b06ec45cdd2acb"
        When uma requisição DELETE foi enviada para "/users/delete/65d51f9ac3b06ec45cdd2acb"
        Then o status da resposta é "200"
        And o ID "65d51f9ac3b06ec45cdd2acb" não existirá no banco de dados