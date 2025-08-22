Feature: Criar cadastro de Hoteleiro
As a Usuário Hoteleiro
I want to cadastrar-me na plataforma de reserva de hoteis “hotel trancinvânia”
So that realizar ações de acordo com o nível de autorização

  @deleteUserHotelier
  Scenario: Cadastro Bem-Sucedido de Usuário Hoteleiro
    Given eu estou na página "/hotelier/register"
    When eu preencho o campo "name-rh" com "Mateus Galdino"
    And eu preencho o campo "email-rh" com "mglg@cin.ufpe.br"
    And eu preencho o campo "username-rh" com "mateusgaldino"
    And eu preencho o campo "password-rh" com "pesquisarehbom"
    And eu preencho o campo "confirmPassword-rh" com "pesquisarehbom"
    And eu seleciono "continuar-rh"
    And eu preencho o campo "nome-hotel" com "Hotel Gélido"
    And eu preencho o campo "cnpj" com "23452490018384"
    And eu preencho o campo "cep" com "53605035"
    And eu preencho o campo "numero-hotel" com "1223"
    And eu seleciono "confirmar-cadastro-h"
    Then eu vejo um toast de sucesso com a mensagem "Cadastro bem-sucedido! Obrigado, mateusgaldino!"
    And eu sou redirecionado para a página "/hotelier/login"

  Scenario: Cadastro Mal-Sucedido de Usuário Hoteleiro por email já cadastrado
    Given eu estou na página "/hotelier/register"
    When eu preencho o campo "name-rh" com "Mateus G."
    And eu preencho o campo "email-rh" com "mglg@cin.ufpe.br"
    And eu preencho o campo "username-rh" com "mateusg"
    And eu preencho o campo "password-rh" com "pesquisarehbom"
    And eu preencho o campo "confirmPassword-rh" com "pesquisarehbom"
    And eu seleciono "continuar-rh"
    And eu preencho o campo "nome-hotel" com "Hotel G"
    And eu preencho o campo "cnpj" com "23452444018384"
    And eu preencho o campo "cep" com "51160220"
    And eu preencho o campo "numero-hotel" com "13"
    And eu seleciono "confirmar-cadastro-h"
    Then eu vejo um toast de erro com a mensagem "E-mail ou nome de usuário já existe."
    And eu continuo na página "/hotelier/register"
