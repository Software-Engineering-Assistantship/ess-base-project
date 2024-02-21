Feature:Login

    Scenario:A senha para login está errada
        Given existe um usuário cadastrado com nome "Joao", email "joao@gmail.com" e senha "Joao1245&"
        When uma requisição POST foi enviada para "/user/signin" com o email "joao@gmail.com" e senha "Joao456&"
        Then o status da resposta é "404 Not Found"
        And é retornado o aviso "Invalid password"
