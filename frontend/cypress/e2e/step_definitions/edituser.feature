Feature: User Edit

    Scenario: Troca de nome com sucesso

        Given estou na tela "users/edit" logado como "taylors@gmail.com" 
        And eu vejo meu nome "taylors"
        When eu preencho o campo Nome de Perfil com "taylorrrs" e confirmo minha mudança
        Then eu sou redirecionado minha para página de perfil
        And eu vejo meu nome alterado "taylorrrs"

    Scenario: Troca de senha com sucesso

        Given estou na tela "users/edit" logado com "taylors@gmail.com" e senha "Aaaa123!"
        When eu preencho o campo Senha atual com "Aaaa123!" e o campo Nova senha com "aaaA123!" e o campo Confirmar nova senha com "aaaA123!"
        Then eu sou redirecionado página de login
        When eu faço login com email "taylors@gmail.com" e senha "aaaA123!"
        Then eu sou redirecionado para minha página de perfil
    
    Scenario: Troca de senha com falha

        Given estou na tela "users/edit" e logado com "taylors@gmail.com" e senha "aaaA123!"
        When eu preencho os campos Senha atual com "aaaA123!" e o campo Nova senha com "123456" e o campo Confirmar nova senha com "123456"
        Then eu recebo uma mensagem de erro
        And permaneço na mesma página
        When eu faço login novamente com email "taylors@gmail.com" e senha "123456"
        Then não consigo entrar na minha página

    Scenario: Deletar conta com falha

        Given estou na tela de "users/edit" logado com "taylors@gmail.com" e meu nome é "taylorrrs"
        When eu preencho os campos Digite sua senha com "aaaA123!" e o campo Confirme sua senha com "123456" e confirmo
        Then eu recebo uma mensagem de erro
        And eu permaneço logado como "taylorrrs"

    Scenario: Deletar conta com sucesso

        Given estou na tela da "users/edit" logado com "taylors@gmail.com"
        When eu preencho o campo Digite sua senha com "aaaA123!" e o campo Confirme sua senha com "aaaA123!" e confirmo
        Then eu sou redirecionado para página de login
        When eu faço um login mais uma vez com email "taylors@gmail.com" e senha "aaaA123!"
        Then não consigo entrar na minha página