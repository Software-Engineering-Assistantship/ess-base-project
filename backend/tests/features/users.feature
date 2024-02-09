Feature: Cadastro e Manutenção de usuários
    As a usuário do Ecommerce
    I want to me cadastrar no sistema
    So that possa atualizar minhas informações

Scenario: Cadastro de Usuário com Sucesso
    Given estou na página "Cadastro de Usuário"
    When preencho o campo "nome" com "Pedro Correia"
    And preencho o campo "cpf" com "123.456.789-09"
    And preencho o campo "data de nascimento" com "01/01/1990"
    And preencho o campo "e-mail" com "pedrocorreia@meuemail.com"
    And preencho o campo "login" com "pedrocorreia"
    And preencho o campo "senha" com "SenhaSegura123"
    And realizo o cadastro do usuário
    Then uma mensagem de confirmação é exibida indicando que "O cadastro foi realizado com sucesso"

Scenario: Falha no Cadastro de Usuário por Login já Cadastrado
    Given estou na página "Cadastro de Usuário"
    And o usuário de login "jorgelemos" está cadastrado no sistema
    When preencho o campo "nome" com "Jorge Lemos"
    And preencho o campo "cpf" com "143.416.189-06"
    And preencho o campo "data de nascimento" com "08/08/1975"
    And preencho o campo "e-mail" com "jorgelemos@meuemail.com"
    And preencho o campo "login" com "jorgelemos"
    And preencho o campo "senha" com "SenhaSegura903"
    And realizo o cadastro do usuário
    Then uma mensagem de erro é exibida indicando que "O Login já está sendo utilizado"

Scenario: Falha no Cadastro de Usuário por Email já Cadastrado
    Given estou na página "Cadastro de Usuário"
    And o usuário de email "clarafonseca@meuemail.com" está cadastrado no sistema
    When preencho o campo "nome" com "Clara Fonseca"
    And preencho o campo "cpf" com "113.415.989-36"
    And preencho o campo "data de nascimento" com "12/03/1998"
    And preencho o campo "e-mail" com "clarafonseca@meuemail.com"
    And preencho o campo "login" com "clarafonseca"
    And preencho o campo "senha" com "SenhaSegura923"
    And realizo o cadastro do usuário
    Then uma mensagem de erro é exibida indicando que "O Email já está sendo utilizado"

Scenario: Falha no Cadastro de Usuário por CPF já Cadastrado
    Given estou na página "Cadastro de Usuário"
    And o usuário de cpf "173.515.289-96" está cadastrado no sistema
    When preencho o campo "nome" com "Letícia Santos"
    And preencho o campo "cpf" com "173.515.289-96"
    And preencho o campo "data de nascimento" com "22/03/2005"
    And preencho o campo "e-mail" com "leticiasantos@meuemail.com"
    And preencho o campo "login" com "leticiasantos"
    And preencho o campo "senha" com "SenhaSegura229"
    And realizo o cadastro do usuário
    Then uma mensagem de erro é exibida indicando que "O CPF já está sendo utilizado"

Scenario: Falha no Cadastro de Usuário por Campo em Branco
    Given estou na página "Cadastro de Usuário"
    When preencho o campo "nome" com "Alice Almeida"
    And preencho o campo "cpf" com ""
    And preencho o campo "data de nascimento" com "02/02/1992 "
    And preencho o campo "e-mail" com "alicealmeida@meuemail.com"
    And preencho o campo "login" com "alicealmeida"
    And preencho o campo "senha" com "SenhaSegura456"
    And realizo o cadastro do usuário
    Then uma mensagem de erro é exibida indicando que "O cadastro não pode ser concluído devido à falta de preenchimento de campo obrigatório"
