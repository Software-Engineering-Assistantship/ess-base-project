Feature: mainmenu
  As a usuário não logado
  I want to escolher entre as opções de fazer login ou cadastro
  And de cliente ou restaurante
  So that eu posso ir para a tela da opção desejada

Scenario: Acessando login do cliente
  Given eu estou na aba "Menu Principal"
  When eu aperto no botão "Login de Cliente"
  Then eu devo ser redirecionado para a página de login para clientes

Scenario: Acessando cadastro do cliente
  Given eu estou na aba "Menu Principal"
  When eu aperto no botão "Cadastro de Cliente"
  Then eu devo ser redirecionado para a página de cadastro para clientes

Scenario: Acessando login do restaurante
  Given eu estou na aba "Menu Principal"
  When eu aperto no botão "Login de Restaurante"
  Then eu devo ser redirecionado para a página de login para restaurantes

Scenario: Acessando cadastro do restaurante
  Given
  When
  Then

Scenario: Acessando login do cliente
  Given há um usuário no menu principal do aplicativo
  When uma requisição "GET" é enviada para "/loginclient"
  Then é retornado status "200"
  And o usuário é redirecionado para a aba especificada

Scenario: Acessando cadastro do cliente
  Given há um usuário no menu principal do aplicativo
  When uma requisição "GET" é enviada para "/registerclient"
  Then é retornado status "200"
  And o usuário é redirecionado para a aba especificada

Scenario: Acessando login do restaurante
  Given há um usuário no menu principal do aplicativo
  When uma requisição "GET" é enviada para "/loginrestaurant"
  Then é retornado status "200"
  And o usuário é redirecionado para a aba especificada

Scenario: Acessando cadastro do restaurante
  Given
  When
  Then