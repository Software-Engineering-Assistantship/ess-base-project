Feature: Cadastro e Manutenção de usuários
    As a usuário do Ecommerce
    I want to me cadastrar no sistema
    So that possa atualizar minhas informações

Scenario: Cadastro de Usuário com Sucesso
    Given que o usuário "Pedro Correia" está na página de "Cadastro de Usuário"
    When preenche os campos:
    | Nome          | CPF            | Data de Nascimento | E-mail                    | Login        | Senha          |
    | Pedro Correia | 123.456.789-09 | 01/01/1990         | pedrocorreia@meuemail.com | pedrocorreia | SenhaSegura123 |
    And clica em "Cadastrar"
    Then uma mensagem de confirmação é exibida indicando que o cadastro foi realizado com sucesso

Scenario: Falha no Cadastro de Usuário por Login já Cadastrado
    Given que o usuário "Jorge Lemos" está na página de "Cadastro de Usuário"
    And o usuário de "Login" "jorgelemos" está cadastrado no sistema
    When preenche os campos:
    | Nome        | CPF            | Data de Nascimento | E-mail                  | Login      | Senha          |
    | Jorge Lemos | 143.416.189-06 | 08/08/1975         | jorgelemos@meuemail.com | jorgelemos | SenhaSegura903 |
    And clica em "Cadastrar"
    Then uma mensagem de erro é exibida indicando que o "Login" já está sendo utilizado

Scenario: Falha no Cadastro de Usuário por Email já Cadastrado
    Given que o usuário "Clara Fonseca" está na página de "Cadastro de Usuário"
    And o usuário de "Email" "clarafonseca@meuemail.com" está cadastrado no sistema
    When preenche os campos:
    | Nome          | CPF            | Data de Nascimento | E-mail                    | Login        | Senha          |
    | Clara Fonseca | 113.415.989-36 | 12/03/1998         | clarafonseca@meuemail.com | clarafonseca | SenhaSegura923 |
    And clica em "Cadastrar"
    Then uma mensagem de erro é exibida indicando que o "Email" já está sendo utilizado

Scenario: Falha no Cadastro de Usuário por CPF já Cadastrado
    Given que o usuário "Letícia Santos" está na página de "Cadastro de Usuário"
    And o usuário de "CPF" "173.515.289-96" está cadastrado no sistema
    When preenche os campos:
    | Nome           | CPF            | Data de Nascimento | E-mail                     | Login         | Senha          |
    | Letícia Santos | 173.515.289-96 | 22/03/2005         | leticiasantos@meuemail.com | leticiasantos | SenhaSegura229 |
    And clica em "Cadastrar"
    Then uma mensagem de erro é exibida indicando que o "CPF" já está sendo utilizado

Scenario: Falha no Cadastro de Usuário por Campo em Branco
    Given que o usuário "Alice Almeida" está na página de "Cadastro de Usuário"
    When preenche os campos:
    | Nome          | Data de Nascimento | E-mail                    | Login        | Senha          |
    | Alice Almeida | 02/02/1992         | alicealmeida@meuemail.com | alicealmeida | SenhaSegura456 |
    And clica em "Cadastrar"
    Then uma mensagem de erro é exibida indicando que o cadastro não pode ser concluído devido à falta de preenchimento de campo obrigatório

Scenario: Falha no Cadastro de Usuário por Senha Inválida com Nome
    Given que o usuário "Samuel Barbosa" está na página de "Cadastro de Usuário"
    When preenche os campos:
    | Nome           | CPF            | Data de Nascimento | E-mail                     | Login         | Senha            |
    | Samuel Barbosa | 123.456.789-10 | 03/03/1993         | samuelbarbosa@meuemail.com | samuelbarbosa | SamuelBarbosa123 | 
    And clica em "Cadastrar"
    Then uma mensagem de erro é exibida indicando que o cadastro não pode ser concluído devido à senha inválida devido nome de usuário na senha

Scenario: Falha no Cadastro de Usuário por Senha Inválida com Data de Nascimento
    Given que o usuário "Marcos Vinícuis" está na página de "Cadastro de Usuário"
    When preenche os campos:
    | Nome            | CPF            | Data de Nascimento | E-mail                      | Login          | Senha         |
    | Marcos Vinícuis | 123.456.789-08 | 04/04/1994         | marcosvinicius@meuemail.com | marcosvinicius | Senha04041994 |
    And clica em "Cadastrar" 
    Then uma mensagem de erro é exibida indicando que o cadastro não pode ser concluído devido à senha inválida devido data de nascimento na senha

Scenario: Atualização de Informações do Usuário com Sucesso
    Given que o usuário "Carlos Tavares" está na página de "Perfil"
    When clica em "Atualização do Cadastro"
    And preenche os campos:
    | Novo Nome    | Novo Login  | Nova Senha    |
    | Carlos Silva | carlossilva | NovaSenha2234 |
    And clica em "Atualizar" 
    Then uma mensagem de confirmação é exibida informando que as Informações foram atualizadas com sucesso

Scenario: Falha na Atualização de Informações do Usuário por Campo em Branco
    Given que o usuário "Alcides Campos" está na página de "Perfil"
    When clica em "Atualização do Cadastro"
    And preenche os campos:
    | Novo Nome    | Nova Senha    |
    | Carlos Silva | NovaSenha2234 |
    And clica em "Atualizar"
    Then uma mensagem de erro é exibida indicando que a atualização não pode ser concluída devido à falta de preenchimento de campo obrigatório

Scenario: Falha na Atualização de Informações do Usuário por Senha Inválida com Nome
    Given que o usuário "Teresa Martins" está na página de "Perfil"
    When clica em "Atualização do Cadastro"
    And preenche os campos:
    | Novo Nome     | Novo Login   | Nova Senha     |
    | Teresa Santos | teresasantos | TeresaSantos23 |
    And clica em "Atualizar"
    Then uma mensagem de erro é exibida indicando que a atualização não pode ser concluída devido à senha inválida por nome de usuário na senha

Scenario: Falha na Atualização de Informações do Usuário por Senha Inválida com Data de Nascimento
    Given que o usuário "Beatriz Oliveira" está na página de "Perfil"
    When clica em "Atualização do Cadastro"
    And preenche os campos:
    | Novo Nome        | Novo Login      | Nova Senha    |
    | Beatriz Oliveira | beatrizoliveira | Senha09092003 |
    And clica em "Atualizar"
    Then uma mensagem de erro é exibida indicando que a atualização não pode ser concluída devido à senha inválida por data de nascimento na senha

Scenario: Cadastro de Cartão de Crédito
    Given que o usuário "Alice Rodrigues" está na página de "Perfil" 
    When clica em "Cadastrar Cartão de Crédito"
    And preenche os campos:
    | Número do Cartão    | Data de Expiração | Código de Segurança |              
    | 5555 1234 5678 9876 | 08/27             | 789                 |
    And clica em "Adicionar Cartão de Crédito"
    Then uma mensagem de confirmação é exibida indicando que o cartão de crédito foi adicionado com sucesso ao seu perfil

Scenario: Falha no Cadastro do Cartão de Crédito por Data Inválida
    Given que o usuário "João Silva" está na página de "Perfil" 
    When clica em "Cadastrar Cartão de Crédito"
    And preenche os campos:
    | Número do Cartão    | Data de Expiração | Código de Segurança |              
    | 1234 5678 9012 3456 | 05/21             | 023                 |
    And clica em "Adicionar Cartão de Crédito"
    Then uma mensagem de erro é exibida indicando que as informações do cartão de crédito são inválidas e não puderam ser adicionadas ao perfil
