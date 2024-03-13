Feature: Login

    Scenario: Successful login

        Given estou na página de login
        When eu preencho o campo e-mail com "omena@gmail.com" e senha com "Aaaa123!"
        Then eu tenho um login de sucesso
    
    Scenario:Falha no login com credenciais inválidas
        Given usuário está na página "/login"
        When o usuário insere o email "jvrco@gmail.com" e a senha "senhaerrada"
        And seleciona "login"
        Then o aviso "Credenciais inválidas" é exibido