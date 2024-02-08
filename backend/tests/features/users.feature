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