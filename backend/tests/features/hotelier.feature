Feature: Cadastro de Hoteleiros
  Como um Usuário "Hoteleiro"
  Eu quero me cadastrar na plataforma de reserva de hotéis "Hotel Trancinvânia"
  Para que eu possa realizar ações no sistema de acordo com meu tipo de usuário

  Scenario: Cadastro Bem-Sucedido de Usuário Hoteleiro
    Given que eu sou um novo hoteleiro
    When eu envio uma solicitação de cadastro com o hotel "Hotel Transilvânia", email "mavis.dracula@gmail.com", username "mavis", password "@Vampiresca1", name "Maria Letícia", cidade "Transilvânia", cep "12345678", endereço "Rua das Sextas", número do endereço "13", UF "TR" e CNPJ "12.215.333/0001-33"
    Then o cadastro deve ser realizado com sucesso
    And eu devo receber uma mensagem de confirmação:
      """
      {
        "message": "Cadastro realizado com sucesso",
        "hotelier": {
          "id": "#is_placeholder",
          "name": "Maria Letícia",
          "email": "mavis.dracula@gmail.com",
          "username": "mavis",
          "password": "@$2b$10$B9j68DzP1ruNn5qyPCqXVO.TOFNGKvldEDasLhfLOAt169ytexgxK",
          "hotel": "Hotel Transilvânia",
          "city": "Transilvânia",
          "cep": "12345678",
          "address": "Rua das Sextas",
          "n_address": "13",
          "UF": "TR",
          "cnpj": "12.215.333/0001-33"
        }
      }
      """

  Scenario: Cadastro Mal-Sucedido de Usuário Hoteleiro por E-mail já Cadastrado
    Given que o e-mail "mavis.dracula@gmail.com" já está cadastrado
    When eu envio uma solicitação de cadastro com o hotel "Hotel Transilvânia", email "mavis.dracula@gmail.com", username "mavis", password "@Vampiresca1", name "Maria Letícia", cidade "Transilvânia", cep "12345678", endereço "Rua das Sextas", número do endereço "13", UF "TR" e CNPJ "12.215.333/0001-33"
    Then o cadastro não deve ser realizado
    And eu devo receber uma mensagem de erro indicando que o e-mail já está em uso:
      """
      {
        "error": "E-mail ou nome de usuário já existe."
      }
      """

  Scenario: Cadastro Mal-Sucedido de Usuário Hoteleiro por Usuário já Cadastrado
    Given que o nome de usuário "mavis" já está cadastrado
    When eu envio uma solicitação de cadastro com o hotel "Hotel Transilvânia", email "mavis.dracula@gmail.com", username "mavis", password "@Vampiresca1", name "Maria Letícia", cidade "Transilvânia", cep "12345678", endereço "Rua das Sextas", número do endereço "13", UF "TR" e CNPJ "12.215.333/0001-33"
    Then o cadastro não deve ser realizado
    And eu devo receber uma mensagem de erro indicando que o nome de usuário já está em uso:
      """
      {
        "error": "E-mail ou nome de usuário já existe."
      }
      """

  Scenario: Cadastro Mal-Sucedido de Usuário Hoteleiro por Senha Inválida
    Given que eu sou um novo hoteleiro
    When eu envio uma solicitação de cadastro com o hotel "Hotel Transilvânia", email "mavis.dracula@gmail.com", username "mavis", password "@Vamp", name "Maria Letícia"
    Then o cadastro não deve ser realizado
    And eu devo receber uma mensagem de erro indicando que a senha é inválida:
      """
      {
        "error": "A senha deve ter mais de 6 dígitos"
      }
      """
