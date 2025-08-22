Feature: Login de Usuário

  Scenario: Login bem-sucedido
    Given o usuário acessa a página de login
    When o usuário preenche o campo "Usuário/Email" com "usuario_teste"
    And o usuário preenche o campo "Senha" com "senha_teste"
    And o usuário clica no botão "Login"
    Then o usuário é redirecionado para a página "/homepage"
    And uma mensagem de boas-vindas é exibida
