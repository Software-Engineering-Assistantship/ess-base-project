Feature: Cadastro e Manutenção de usuários
    As a usuário do Ecommerce
    I want to me cadastrar no sistema
    So that possa atualizar minhas informações

Scenario: Cadastro de Usuário com Sucesso
    Given que o usuário "Pedro Correia" acessa a página de "Cadastro de Usuário"
    When preenche todos os campos obrigatórios corretamente, incluindo:
    | Nome           | CPF             | Data de Nascimento | E-mail                     | Login        | Senha           |
    | Pedro Correia  | 123.456.789-09  | 01/01/1990         | pedrocorreia@meuemail.com  | pedrocorreia | SenhaSegura123  |
    And clica em "Cadastrar"
    Then uma mensagem de confirmação é exibida indicando que "O Cadastro foi Concluído com Sucesso"

Scenario: Falha no Cadastro de Usuário por Campo em Branco
    Given que o usuário "Alice Almeida" acessa a página de "Cadastro de Usuário"
    When preenche somente os campos obrigatórios:
    | Nome           | CPF             | Data de Nascimento | E-mail                     | Login        | Senha           |
    | Alice Almeida  |                 | 02/02/1992         | alicealmeida@meuemail.com  | alicealmeida | SenhaSegura456  |
    And clica em "Cadastrar"
    Then uma mensagem de erro é exibida indicando que o cadastro não pode ser concluído devido à "Falta de Preenchimento do Campo CPF"

Scenario: Falha no Cadastro de Usuário por Senha Inválida com Nome
    Given que o usuário "Samuel Barbosa" acessa a página de "Cadastro de Usuário"
    When preenche todos os campos obrigatórios, incluindo:
    | Nome           | CPF             | Data de Nascimento | E-mail                      | Login         | Senha            |
    | Samuel Barbosa | 123.456.789-10  | 03/03/1993         | samuelbarbosa@meuemail.com  | samuelbarbosa | SamuelBarbosa123 | 
    Then uma mensagem de erro é exibida indicando que o cadastro não pode ser concluído devido à "Uma Senha Inválida Devido Nome na Senha"

Scenario: Falha no Cadastro de Usuário por Senha Inválida com Data de Nascimento
    Given que o usuário "Marcos Vinícuis" acessa a página de "Cadastro de Usuário"
    When preenche todos os campos obrigatórios, incluindo:
    | Nome            | CPF             | Data de Nascimento | E-mail                       | Login          | Senha           |
    | Marcos Vinícuis | 123.456.789-08  | 04/04/1994         | marcosvinicius@meuemail.com  | marcosvinicius | Senha04041994   | 
    Then uma mensagem de erro é exibida indicando que o cadastro não pode ser concluído devido à "Uma Senha Inválida Devido Data de Nascimento na Senha"

Scenario: Atualização de Informações do Usuário com Sucesso
    Given que o usuário "Carlos Tavares" esta logado no sistema
    And que o usuário "Carlos Tavares" acessa a página de "Atualização do Cadastro"
    When preenche todos os campos obrigatórios corretamente, incluindo:
    | Novo Nome    | Novo Login  | Nova Senha    |
    | Carlos Silva | carlossilva | NovaSenha2234 | 
    Then uma mensagem de confirmação é exibida informando que "As Informações Foram Atualizadas com Sucesso"

Scenario: Falha na Atualização de Informações do Usuário por Login Vazio
    Given que o usuário "Alcides Campos" esta logado no sistema
    And que o usuário "Alcides Campos" acessa a página de "Atualização do Cadastro"
    When preenche somente os campos obrigatórios:
    | Novo Nome     | Novo Login  | Nova Senha    |
    | Alcides Silva |             | SenhaSegura23 |
    Then uma mensagem de erro é exibida indicando que a atualização não pode ser concluída devido à "Falta de Preenchimento no Login"


"Git teste branch main"