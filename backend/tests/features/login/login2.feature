Feature:Login  
  
    Scenario:logar o usuário
        Given existe um usuário com nome "Joao", email "joao@gmail.com" e senha "Joao1245&"
        When uma requisição POST foi enviada para "/users/signin " com o email "joao@gmail.com" e senha "Joao1245&"
        Then o status de resposta é "200"
        And um usuário é logado com nome "Joao" e email "joao@gmail.com"
