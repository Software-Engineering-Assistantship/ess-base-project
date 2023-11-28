Feature: Cadastro e Manutenção de usuários
    As a usuário do Ecommerce
    I want to me cadastrar no sistema
    So that possa atualizar minhas informações

Scenario: Cadastro de Usuário com Sucesso
    Given que o usuário "Pedro Correia" acessa a página "Cadastro de Usuário"
    When preenche todos os campos obrigatórios corretamente, incluindo:
    | Nome           | CPF             | Data de Nascimento | E-mail                     | Login        | Senha           |
    | Pedro Correia  | 123.456.789-09  | 01/01/1990         | pedrocorreia@meuemail.com  | pedrocorreia | SenhaSegura123  |
    And clica em "Cadastrar"
    Then uma mensagem de confirmação é exibida indicando que o cadastro foi concluído com sucesso

Scenario: Falha no Cadastro de Usuário por Campo em Branco
    Given que o usuário "Alice Almeida" acessa a página de "Cadastro de Usuário"
    When preenche todos os campos obrigatórios corretamente, incluindo:
    | Nome           | CPF             | Data de Nascimento | E-mail                     | Login        | Senha           |
    | Alice Almeida  |                 | 02/02/1992         | alicealmeida@meuemail.com  | alicealmeida | SenhaSegura456  |
    And clica em "Cadastrar"
    Then uma mensagem de erro é exibida indicando que o cadastro não pode ser concluído devido à falta de preenchimento do campo "CPF"
