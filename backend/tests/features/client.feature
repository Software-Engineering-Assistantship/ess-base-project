Feature: Cadastro de Clientes
  Como um Usuário "Cliente"
  Eu quero me cadastrar na plataforma de reserva de hotéis "Hotel Trancinvânia"
  Para que eu possa realizar ações no sistema de acordo com meu tipo de usuário

  Scenario: Cadastro Bem-Sucedido de Usuário Cliente
    Given que eu sou um novo usuário
    When eu envio uma solicitação de cadastro com o nome "Bárbara Alencar", email "barbara.alencar@gmail.com", username "barbaralencar", cpf "021.957.235-12", phone "(81) 99342-3591", birthDate "1984/09/12" e password "@AmoBolo123"
    Then o cadastro deve ser realizado com sucesso
    And eu devo receber uma mensagem de confirmação:
    """
    {
      "message": "Cadastro realizado com sucesso",
      "user": {
        "name": "Bárbara Alencar",
        "email": "barbara.alencar@gmail.com",
        "username": "barbaralencar",
        "cpf": "021.957.235-12",
        "phone": "(81) 99342-3591",
        "birthDate": "1984/09/12",
        "id": "#is_placeholder"
      }
    }
    """

  Scenario: Cadastro Mal-Sucedido de Usuário Cliente por E-mail já Cadastrado
    Given que o e-mail "barbara.alencar@gmail.com" já está cadastrado
    When eu envio uma solicitação de cadastro com o nome "Bárbara Alencar", email "barbara.alencar@gmail.com", username "barbaralencar", cpf "021.957.235-12", phone "(81) 99342-3591", birthDate "1984/09/12" e password "@AmoBolo123"
    Then o cadastro não deve ser realizado
    And eu devo receber uma mensagem de erro indicando que o e-mail já está em uso:
    """
    {
      "error": "E-mail ou nome de usuário já existe."
    }
    """

  Scenario: Cadastro Mal-Sucedido de Usuário Cliente por Usuário já Cadastrado
    Given que o nome de usuário "barbaralencar" já está cadastrado
    When eu envio uma solicitação de cadastro com o nome "Bárbara Alencar", email "barbara.alencar@gmail.com", username "barbaralencar", cpf "021.957.235-12", phone "(81) 99342-3591", birthDate "1984/09/12" e password "@AmoBolo123"
    Then o cadastro não deve ser realizado
    And eu devo receber uma mensagem de erro indicando que o nome de usuário já está em uso:
    """
    {
      "error": "E-mail ou nome de usuário já existe."
    }
    """

  Scenario: Cadastro Mal-Sucedido de Usuário Cliente por Senha Inválida
    Given que eu sou um novo usuário
    When eu envio uma solicitação de cadastro com o nome "Bárbara Alencar", email "barbara.alencar@gmail.com", username "barbaralencar", cpf "021.957.235-12", phone "(81) 99342-3591", birthDate "1984/09/12" e password "@Amo"
    Then o cadastro não deve ser realizado
    And eu devo receber uma mensagem de erro indicando que a senha é inválida:
    """
    {
      "error": "A senha deve ter mais de 6 dígitos"
    }
    """
