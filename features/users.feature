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
    Then uma mensagem de erro é exibida indicando que o cadastro não pode ser concluído devido à "Senha Inválida Devido Nome na Senha"

Scenario: Falha no Cadastro de Usuário por Senha Inválida com Data de Nascimento
    Given que o usuário "Marcos Vinícuis" acessa a página de "Cadastro de Usuário"
    When preenche todos os campos obrigatórios, incluindo:
    | Nome            | CPF             | Data de Nascimento | E-mail                       | Login          | Senha           |
    | Marcos Vinícuis | 123.456.789-08  | 04/04/1994         | marcosvinicius@meuemail.com  | marcosvinicius | Senha04041994   | 
    Then uma mensagem de erro é exibida indicando que o cadastro não pode ser concluído devido à "Senha Inválida Devido Data de Nascimento na Senha"

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
    | Novo Nome    | Novo Login  | Nova Senha    |
    | Carlos Silva |             | NovaSenha2234 |
    Then uma mensagem de erro é exibida indicando que a atualização não pode ser concluída devido à "Falta de Preenchimento no Login"

Scenario: Falha na Atualização de Informações do Usuário por Senha Inválida
    Given que o usuário "Teresa Martins" esta logado no sistema
    And que o usuário "Teresa Martins" acessa a página de "Atualização do Cadastro"
    When preenche todos os campos obrigatórios, incluindo:
    | Novo Nome     | Novo Login   | Nova Senha     |
    | Teresa Santos | teresasantos | TeresaSantos23 |
    Then uma mensagem de erro é exibida indicando que a atualização não pode ser concluída devido à "Senha Inválida Devido Nome na Senha"

Scenario: Cadastro de Cartão de Crédito
    Given que o usuário "Alice Rodrigues" esta logado no sistema
    And que o usuário "Alice Rodrigues" acessa a página de "Atualização do Cadastro"
    When clica em "Cadastrar Cartão de Crédito"
    And adiciona as seguintes informações do cartão de crédito:
    | Número do Cartão      | 5555 1234 5678 9876             |
    | Data de Expiração     | 08/24                           |
    | Código de Segurança   | 789                             |
    Quando clica em "Adicionar Cartão de Crédito"
    Então uma mensagem de confirmação é exibida, indicando que o cartão de crédito foi adicionado com sucesso ao seu perfil.

Scenario: Falha no Cadastro do Cartão de Crédito por Data Inválida
    Given que o usuário "João Silva" esta logado no sistema
    And que o usuário "João Silva" acessa a página de "Atualização do Cadastro"
    When clica em "Cadastrar Cartão de Crédito"
    And adiciona as seguintes informações do cartão de crédito:
    | Número do Cartão      | 1234 5678 9012 3456             |
    | Data de Expiração     | 05/21                           |
    | Código de Segurança   | 000                             |
    Quando clica em "Adicionar Cartão de Crédito"
    Então uma mensagem de erro é exibida, indicando que as informações do cartão de crédito são inválidas e não puderam ser adicionadas ao perfil.
