Feature: User

    Scenario: Editar senha de perfil com falha
        Given existe um usuário cadastrado com ID "65d5218ac3b06ec45cdd2ad1" e senha "abbddef!@S"
        When uma requisição PUT foi enviada para "/users/editPass/65d5218ac3b06ec45cdd2ad1" com a senha atual "abbddef!@S" e nova senha "12345"
        Then o status da resposta é "400"
        And o ID "65d5218ac3b06ec45cdd2ad1" estará associado com a senha "abbddef!@S" no banco de dados