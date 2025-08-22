Feature: Criar cadastro de Cliente
As a Usuário Cliente
I want to cadastrar-me na plataforma de reserva de hoteis “hotel trancinvânia”
So that realizar ações de acordo com o nível de autorização

  @deleteUser
  Scenario: Cadastro Bem-Sucedido de Usuário Cliente
    Given eu estou na página "/client/register"
    When eu preencho o campo "name" com "Bianca"
    And eu preencho o campo "email" com "bianca.duarte@ufpe.br"
    And eu preencho o campo "username-rc" com "bibi123"
    And eu preencho o campo "cpf" com "02195723512"
    And eu preencho o campo "phone" com "81993423514"
    And eu preencho o campo "birthDate" com "1984/04/12"
    And eu preencho o campo "password" com "fantasminhas"
    And eu preencho o campo "confirmPassword" com "fantasminhas"
    And eu seleciono "confirmar-cadastro"
    Then eu vejo um toast de sucesso com a mensagem "Cadastro bem-sucedido! Obrigado, bibi123!"
    And eu sou redirecionado para a página "/client/login"

  Scenario: Cadastro Mal-Sucedido de Usuário Cliente por email já cadastrado
    Given eu estou na página "/client/register"
    When eu preencho o campo "name" com "Bianca D."
    And eu preencho o campo "email" com "bianca.duarte@ufpe.br"
    And eu preencho o campo "username-rc" com "bibi0"
    And eu preencho o campo "cpf" com "02195723222"
    And eu preencho o campo "phone" com "81993423333"
    And eu preencho o campo "birthDate" com "1983/04/12"
    And eu preencho o campo "password" com "meuszumbis"
    And eu preencho o campo "confirmPassword" com "meuszumbis"
    And eu seleciono "confirmar-cadastro"
    Then eu vejo um toast de sucesso com a mensagem "E-mail ou nome de usuário já existe."
    And eu continuo na página "/client/register"
