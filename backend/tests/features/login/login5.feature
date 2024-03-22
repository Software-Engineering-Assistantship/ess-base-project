Feature:Login

    Scenario:O email não está no formato adequado
        Given não existe um usuário cadastrado com o nome "Pedro", email "Pedro" e senha "Pedro1245&"
        When uma requisição POST foi enviada para "/user/signup" com o nome "Pedro", email "Pedro" e senha "Pedro456&"
        Then o status de resposta é "200"
        And é retornado o aviso "Invalid email"
