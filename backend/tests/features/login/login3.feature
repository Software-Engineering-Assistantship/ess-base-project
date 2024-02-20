Feature:Login

    Scenario:A senha não contém caracteres especiais e letras maiusculas
        Given não existe um usuário cadastrado com o nome "tiago", email "tiago@gmail.com" e senha "senhasimples"
        When uma requisição POST foi enviada para "/users/signup" com nome "tiago", email "tiago@gmail.com" e senha "senhasimples"
        Then o status de resposta é "404 Not Found"
        And é retornado o aviso "A senha deve conter no mínimo 1 caracter maiúsculo, 1 caracter minúsculo, 1 simbolo especial e tamanho de pelo menos 8."
