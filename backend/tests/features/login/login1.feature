Feature:Login

    Scenario:criar usuário
        Given não existe um usuário cadastrado com o nome "jose", email "jose@gmail.com" e senha "Joao1245&"
        When uma requisição POST foi enviada para "/users/signup" com o nome "jose", email "jose@gmail.com" e senha "Joao1245&"
        Then o status de resposta é "200"
        And um usuário é cadastrado com nome "jose", email "jose@gmail.com" e senha "Joao1245&"



