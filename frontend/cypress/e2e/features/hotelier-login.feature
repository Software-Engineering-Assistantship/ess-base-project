Feature: Realizar Login
  As a Usuário "Hoteleiro"
  I want to realizar o login no sistema 
  So that eu possa realizar ações no sistema de acordo com meu tipo de usuário

  Scenario: Login Bem-Sucedido de Usuário Hoteleiro
    Given eu estou na página "/hotelier/login"
    When eu preencho o campo "username" com "viccesar"
    And eu preencho o campo "password" com "vic1234"
    And eu seleciono "login-button"
    Then eu vejo um toast de sucesso com a mensagem "Login bem-sucedido! Bem-vindo, viccesar!"
    And eu sou redirecionado para a página "/hotelier-reservations"

  Scenario: Login Mal-Sucedido de Usuário Hoteleiro
    Given eu estou na página "/hotelier/login"
    When eu preencho o campo "username" com "viccesar"
    And eu preencho o campo "password" com "vic12345"
    And eu seleciono "login-button"
    Then eu vejo um toast de erro com a mensagem "Usuário ou senha incorretos. Tente novamente."
    And eu continuo na página "/hotelier/login"
