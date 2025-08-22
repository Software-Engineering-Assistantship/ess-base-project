Feature: Realizar Login
  As a Usuário "Cliente"
  I want to realizar o login no sistema 
  So that eu possa realizar ações no sistema de acordo com meu tipo de usuário

  Scenario: Login Mal-Sucedido de Usuário Cliente
    Given eu estou na página "/client/login"
    When eu preencho o campo "username-c" com "julyafig"
    And eu preencho o campo "password-c" com "juju1234"
    And eu seleciono "login-button-c"
    Then eu vejo um toast de erro com a mensagem "Usuário ou senha incorretos. Tente novamente."
    And eu continuo na página "/client/login"

  Scenario: Login Bem-Sucedido de Usuário Cliente
    Given eu estou na página "/client/login"
    When eu preencho o campo "username-c" com "julyafig"
    And eu preencho o campo "password-c" com "juju123"
    And eu seleciono "login-button-c"
    Then eu vejo um toast de sucesso com a mensagem "Login bem-sucedido! Bem-vindo, julyafig!"
    And eu sou redirecionado para a página "/reservations"
