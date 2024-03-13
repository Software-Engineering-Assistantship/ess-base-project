Feature:Signin

    Scenario: Signin with valid credentials
        Given o usuário está na página de cadastro
        When o usuário insere o nome "joao", o email "mergulhao@gmail.com" e a senha "#Senha123"
        Then eu tenho um cadastro
    
    Scenario: Signin with invalid credentials
        Given o usuário está na página de cadastro
        When o usuário insere o nome "joao", o email "mergulhao@gmail.com" e a senha "senha123"
        Then eu tenho um cadastro falho

