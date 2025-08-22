Feature: Realizar Login
  As a Usuário "Hoteleiro" ou "Cliente"
  I want to realizar o login no sistema 
  So that eu possa realizar ações no sistema de acordo com meu tipo de usuário

Scenario: Login Bem-Sucedido
  Given Eu estou cadastrado no Sistema com o "username" "barbaralencar" e a "password" "@AmoBolo123"
  When eu envio uma solicitação de login com o "username" "barbaralencar" e a "password" "@AmoBolo123"
  Then eu devo receber uma mensagem de confirmação com o token:
  """
  {
	"token": "#is_placeholder"
  }
  """

Scenario: Login Mal-Sucedido por Senha Incorreta
  Given Eu estou cadastrado no Sistema com o "username" "barbaralencar" e a "password" "@AmoBolo123"
  When eu envio uma solicitação de login com o "username" "barbaralencar" e a "password" "@AmoTorta123"
  Then eu devo receber uma mensagem de erro:
  """
  {
    "message": "Senha Incorreta"
  }
  """

Scenario: Login Mal-Sucedido por Usuário não-cadastrado
  Given Não há “username” “barbaralencar” cadastrado no sistema
  When eu envio uma solicitação de login com o "username" "barbaralencar" e a "password" "@AmoBolo123"
  Then eu devo receber uma mensagem de erro:
  """
  {
	"message": "Usuário não Cadastrado"
  }
  """

Scenario: Login Mal-Sucedido por Senha em Branco
  Given Eu estou cadastrado no Sistema com o "username" "barbaralencar" e a "password" "@AmoBolo123"
  When eu envio uma solicitação de login com o "username" "barbaralencar" e a "password" ""
  Then eu devo receber uma mensagem de erro:
  """
  {
  "message": "Missing credentials"
  }
  """

Scenario: Login Mal-Sucedido por Nome de Usuário em Branco
  Given Eu estou cadastrado no Sistema com o "username" "barbaralencar" e a "password" "@AmoBolo123"
  When eu envio uma solicitação de login com o "username" "" e a "password" "@AmoBolo123"
  Then eu devo receber uma mensagem de erro:
  """
  {
	"message": "Missing credentials"
  }
  """