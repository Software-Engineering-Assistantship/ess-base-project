Feature: Cadastro e Manutenção de usuários
    As a usuário do Ecommerce
    I want to me cadastrar no sistema
    So that possa atualizar minhas informações

Scenario: Cadastro de Usuário com Sucesso
    Given estou na página "Cadastro de Usuário"
    When preencho os campos:
    | Nome          | CPF            | Data de Nascimento | E-mail                    | Login        | Senha          |
    | Pedro Correia | 123.456.789-09 | 01/01/1990         | pedrocorreia@meuemail.com | pedrocorreia | SenhaSegura123 |
    And clico em "Cadastrar"
    Then uma mensagem de confirmação é exibida indicando que "O cadastro foi realizado com sucesso"

Scenario: Falha no Cadastro de Usuário por Login já Cadastrado
    Given estou na página "Cadastro de Usuário"
    And o usuário de login "jorgelemos" está cadastrado no sistema
    When preencho os campos:
    | Nome        | CPF            | Data de Nascimento | E-mail                  | Login      | Senha          |
    | Jorge Lemos | 143.416.189-06 | 08/08/1975         | jorgelemos@meuemail.com | jorgelemos | SenhaSegura903 |
    And clico em "Cadastrar"
    Then uma mensagem de erro é exibida indicando que "O Login já está sendo utilizado"

Scenario: Falha no Cadastro de Usuário por Email já Cadastrado
    Given estou na página "Cadastro de Usuário"
    And o usuário de email "clarafonseca@meuemail.com" está cadastrado no sistema
    When preencho os campos:
    | Nome          | CPF            | Data de Nascimento | E-mail                    | Login        | Senha          |
    | Clara Fonseca | 113.415.989-36 | 12/03/1998         | clarafonseca@meuemail.com | clarafonseca | SenhaSegura923 |
    And clico em "Cadastrar"
    Then uma mensagem de erro é exibida indicando que "O Email já está sendo utilizado"

Scenario: Falha no Cadastro de Usuário por CPF já Cadastrado
    Given estou na página "Cadastro de Usuário"
    And o usuário de cpf "173.515.289-96" está cadastrado no sistema
    When preencho os campos:
    | Nome           | CPF            | Data de Nascimento | E-mail                     | Login         | Senha          |
    | Letícia Santos | 173.515.289-96 | 22/03/2005         | leticiasantos@meuemail.com | leticiasantos | SenhaSegura229 |
    And clico em "Cadastrar"
    Then uma mensagem de erro é exibida indicando que "O CPF já está sendo utilizado"

Scenario: Falha no Cadastro de Usuário por Campo em Branco
    Given estou na página "Cadastro de Usuário"
    When preencho os campos:
    | Nome          | Data de Nascimento | E-mail                    | Login        | Senha          |
    | Alice Almeida | 02/02/1992         | alicealmeida@meuemail.com | alicealmeida | SenhaSegura456 |
    And clico em "Cadastrar"
    Then uma mensagem de erro é exibida indicando que "O cadastro não pode ser concluído devido à falta de preenchimento de campo obrigatório"

Scenario: Falha no Cadastro de Usuário por Senha Inválida com Nome
    Given estou na página "Cadastro de Usuário"
    When preencho os campos:
    | Nome           | CPF            | Data de Nascimento | E-mail                     | Login         | Senha            |
    | Samuel Barbosa | 123.456.789-10 | 03/03/1993         | samuelbarbosa@meuemail.com | samuelbarbosa | SamuelBarbosa123 | 
    And clico em "Cadastrar"
    Then uma mensagem de erro é exibida indicando que "O cadastro não pode ser concluído devido à senha inválida devido nome de usuário na senha"

Scenario: Falha no Cadastro de Usuário por Senha Inválida com Data de Nascimento
    Given estou na página "Cadastro de Usuário"
    When preencho os campos:
    | Nome            | CPF            | Data de Nascimento | E-mail                      | Login          | Senha         |
    | Marcos Vinícuis | 123.456.789-08 | 04/04/1994         | marcosvinicius@meuemail.com | marcosvinicius | Senha04041994 |
    And clico em "Cadastrar" 
    Then uma mensagem de erro é exibida indicando que "O cadastro não pode ser concluído devido à senha inválida devido data de nascimento na senha"

Scenario: Atualização de Informações do Usuário com Sucesso
    Given estou logado com o usuário de login "carlossilva" e senha "senha12345"
    And estou na página "Perfil"
    When clico em "Atualização do Cadastro"
    And preencho os campos:
    | Novo Nome    | Novo Login  | Nova Senha    |
    | Carlos Silva | carlossilva | NovaSenha2234 |
    And clico em "Atualizar" 
    Then uma mensagem de confirmação é exibida indicando que "As Informações foram atualizadas com sucesso"

Scenario: Falha na Atualização de Informações do Usuário por Campo em Branco
    Given estou logado com o usuário de login "carlossilva" e senha "senha12345"
    And estou na página "Perfil"
    When clico em "Atualização do Cadastro"
    And preencho os campos:
    | Novo Nome    | Nova Senha    |
    | Carlos Silva | NovaSenha2234 |
    And clico em "Atualizar"
    Then uma mensagem de erro é exibida indicando que "A atualização não pode ser concluída devido à falta de preenchimento de campo obrigatório"

Scenario: Falha na Atualização de Informações do Usuário por Senha Inválida com Nome
    Given estou logado com o usuário de login "teresasantos" e senha "senha12345"
    And estou na página "Perfil"
    When clico em "Atualização do Cadastro"
    And preencho os campos:
    | Novo Nome     | Novo Login   | Nova Senha     |
    | Teresa Santos | teresasantos | TeresaSantos23 |
    And clico em "Atualizar"
    Then uma mensagem de erro é exibida indicando que "A atualização não pode ser concluída devido à senha inválida por nome de usuário na senha"

Scenario: Falha na Atualização de Informações do Usuário por Senha Inválida com Data de Nascimento
    Given estou logado com o usuário de login "beatrizoliveira" e senha "senha12345"
    And estou na página "Perfil"
    When clicaoem "Atualização do Cadastro"
    And preencho os campos:
    | Novo Nome        | Novo Login      | Nova Senha    |
    | Beatriz Oliveira | beatrizoliveira | Senha09092003 |
    And clico em "Atualizar"
    Then uma mensagem de erro é exibida indicando que "A atualização não pode ser concluída devido à senha inválida por data de nascimento na senha"

Scenario: Cadastro de Cartão de Crédito
    Given estou logado com o usuário de login "carloseduardo" e senha "senha12345"
    And estou na página "Perfil"
    When clico em "Cadastrar Cartão de Crédito"
    And preenche os campos:
    | Número do Cartão    | Data de Expiração | Código de Segurança |              
    | 5555 1234 5678 9876 | 08/27             | 789                 |
    And clico em "Adicionar Cartão de Crédito"
    Then uma mensagem de confirmação é exibida indicando que "O cartão de crédito foi adicionado com sucesso ao perfil"

Scenario: Falha no Cadastro do Cartão de Crédito por Campo em Branco
    Given estou logado com o usuário de login "josealdair" e senha "senha12345"
    And estou na página "Perfil"
    When clica em "Cadastrar Cartão de Crédito"
    And preenche os campos:
    | Número do Cartão    | Data de Expiração |              
    | 2294 5178 9713 3359 | 05/21             |
    And clica em "Adicionar Cartão de Crédito"
    Then uma mensagem de erro é exibida indicando que "O cartão de crédito não pode ser adicionado à devido falta de preenchimento de campo obrigatório"

Scenario: Falha no Cadastro do Cartão de Crédito por Data Inválida
    Given estou logado com o usuário de login "joaosilva" e senha "senha12345"
    And estou na página "Perfil"
    When clica em "Cadastrar Cartão de Crédito"
    And preenche os campos:
    | Número do Cartão    | Data de Expiração | Código de Segurança |              
    | 1234 5678 9012 3456 | 05/21             | 023                 |
    And clica em "Adicionar Cartão de Crédito"
    Then uma mensagem de erro é exibida indicando que "O cartão de crédito não pode ser adicionado à devido a informações inválidas"
