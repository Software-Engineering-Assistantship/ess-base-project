Feature: User

    Scenario: Editar senha de perfil com sucesso
        Given existe um usuário cadastrado com ID "65d51fdec3b06ec45cdd2ace" e senha "adk##44e2ASx$"
        When uma requisição PUT foi enviada para "/users/editPass/65d51fdec3b06ec45cdd2ace" com a senha atual "adk##44e2ASx$" e nova senha "avcd!44e2ASx$"
        Then o status da resposta é "200"
        And o ID "65d51fdec3b06ec45cdd2ace" estará associado com a senha "avcd!44e2ASx$" no banco de dados
