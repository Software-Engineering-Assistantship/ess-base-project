Feature: Login do usuário
  As a usuário do sistema
  I want to entrar no sistema com meu e-mail e senha cadastrados
  So that eu tenha acesso às funcionalidades do sistema que são acessíveis somente depois do login

  Scenario: Login com sucesso
    Given o usuário está na página de "login"
    And existe um usuário cadastrado no sistema com email "user@example.com"
    When o usuário preenche o email "user@example.com" e senha "correctpassword"
    Then o usuário está na página "tela inicial"
    And o usuário tem acesso às funcionalidades do sistema que são acessíveis depois do login

  Scenario: Login com senha incorreta
    Given o usuário está na página de "login"
    And existe um usuário cadastrado no sistema com email "user@example.com"
    When o usuário preenche o email "user@example.com" e senha "wrongpassword"
    Then o usuário recebe uma mensagem "Usuário ou senha incorretos"
    And o usuário está na página de "login"

  Scenario: Login com campo de email vazio
    Given o usuário está na página de "login"
    And existe um usuário cadastrado no sistema com email "user@example.com"
    When o usuário deixa o campo de email vazio e preenche a senha "correctpassword"
    Then o usuário recebe uma mensagem "Preencha todos os campos"
    And o usuário está na página de "login"

  Scenario: Login com campo de senha vazio
    Given o usuário está na página de "login"
    And existe um usuário cadastrado no sistema com email "user@example.com"
    When o usuário preenche o email "user@example.com" e deixa o campo de senha vazio
    Then o usuário recebe uma mensagem "Preencha todos os campos"
    And o usuário está na página de "login"

  Scenario: Login com campos de email e senha vazios
    Given o usuário está na página de "login"
    When o usuário deixa ambos os campos de email e senha vazios
    Then o usuário recebe uma mensagem "Preencha todos os campos"
    And o usuário está na página de "login"

  Scenario: Tentativa de login com email não cadastrado
    Given o usuário está na página de "login"
    And não existe um usuário cadastrado com o email "user@example.com"
    When o usuário preenche o email "user@example.com" e senha "correctpassword"
    Then o usuário recebe uma mensagem "Usuário não cadastrado"
    And o usuário está na página de "login"
