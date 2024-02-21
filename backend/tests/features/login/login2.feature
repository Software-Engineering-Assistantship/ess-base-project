Feature:Login  
  
    Scenario:logar o usuário
        Given existe um usuário com nome "Roberto", email "Roberto@gmail.com" e senha "SenhaComplicada#"
        When uma requisição POST foi enviada para "/users/signin " com o email "Roberto@gmail.com" e senha "SenhaComplicada#"
        Then o status de resposta é "200"
        And um usuário é logado com nome "Roberto" e email "Roberto@gmail.com"
