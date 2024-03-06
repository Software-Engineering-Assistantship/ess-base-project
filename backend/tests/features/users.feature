Feature: Cadastro e Manutenção de usuários
    As a usuário do Ecommerce
    I want to me cadastrar no sistema
    So that possa atualizar minhas informações

Scenario: Cadastro de Usuário com Sucesso
    Given estou na página "/api/users/cadastro"
    When preencho o campo "nome" com "Pedro Correia"
    And preencho o campo "cpf" com "123.456.789-09"
    And preencho o campo "data de nascimento" com "01/01/1990"
    And preencho o campo "e-mail" com "pedrocorreia@meuemail.com"
    And preencho o campo "login" com "pedrocorreia"
    And preencho o campo "senha" com "SenhaSegura123"
    And realizo o cadastro do usuário
    Then uma mensagem de confirmação é exibida indicando que "O cadastro foi realizado com sucesso"

Scenario: Falha no Cadastro de Usuário por Login já Cadastrado
    Given estou na página "/api/users/cadastro"
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
    Given estou na página "/api/users/cadastro"
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
    Given estou na página "/api/users/cadastro"
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
    Given estou na página "/api/users/cadastro"
    When preencho o campo "nome" com "Alice Almeida"
    And preencho o campo "cpf" com ""
    And preencho o campo "data de nascimento" com "02/02/1992"
    And preencho o campo "e-mail" com "alicealmeida@meuemail.com"
    And preencho o campo "login" com "alicealmeida"
    And preencho o campo "senha" com "SenhaSegura456"
    And realizo o cadastro do usuário
    Then uma mensagem de erro é exibida indicando que "A operação não pode ser concluída devido à falta de preenchimento de campo obrigatório"

Scenario: Falha no Cadastro de Usuário por Senha Inválida com Nome
    Given estou na página "/api/users/cadastro"
    When preencho o campo "nome" com "Samuel Barbosa"
    And preencho o campo "cpf" com "123.456.789-10"
    And preencho o campo "data de nascimento" com "03/03/1993"
    And preencho o campo "e-mail" com "samuelbarbosa@meuemail.com"
    And preencho o campo "login" com "samuelbarbosa"
    And preencho o campo "senha" com "SamuelBarbosa"
    And realizo o cadastro do usuário
    Then uma mensagem de erro é exibida indicando que "A operação não pode ser concluída devido à senha inválida"

Scenario: Falha no Cadastro de Usuário por Senha Inválida com Data de Nascimento
    Given estou na página "/api/users/cadastro"
    When preencho o campo "nome" com "Marcos Vinícuis"
    And preencho o campo "cpf" com "123.456.789-08"
    And preencho o campo "data de nascimento" com "04/04/1994"
    And preencho o campo "e-mail" com "marcosvinicius@meuemail.com"
    And preencho o campo "login" com "marcosvinicius"
    And preencho o campo "senha" com "04041994"
    And realizo o cadastro do usuário
    Then uma mensagem de erro é exibida indicando que "A operação não pode ser concluída devido à senha inválida"

Scenario: Atualização de Informações do Usuário com Sucesso
    Given o usuário de login "carlosoliveira" e senha "senha12345" está cadastrado no sistema
    And o usuário de login "carlosoliveira" e senha "senha12345" está logado no sistema
    And estou na página do usuário de login "carlosoliveira"
    When preencho o campo "nome" com "Carlos Silva"
    And preencho o campo "login" com "carlossilva"
    And preencho o campo "senha" com "NovaSenha2234"
    And realizo a atualização das informações do usuário
    Then uma mensagem de confirmação é exibida indicando que "As Informações foram atualizadas com sucesso"

Scenario: Falha na Atualização de Informações do Usuário por Campo em Branco
    Given o usuário de login "heitorbatista" e senha "senha12345" está cadastrado no sistema
    And o usuário de login "heitorbatista" e senha "senha12345" está logado no sistema
    And estou na página do usuário de login "heitorbatista"
    When preencho o campo "nome" com "Heitor Carvalho"
    And preencho o campo "login" com ""
    And preencho o campo "senha" com "NovaSenha2234"
    And realizo a atualização das informações do usuário
    Then uma mensagem de erro é exibida indicando que "A operação não pode ser concluída devido à falta de preenchimento de campo obrigatório"

Scenario: Falha na Atualização de Informações do Usuário por Senha Inválida com Nome
    Given o usuário de login "teresasantos" e senha "senha12345" está cadastrado no sistema
    And o usuário de login "teresasantos" e senha "senha12345" está logado no sistema
    And estou na página do usuário de login "teresasantos"
    When preencho o campo "nome" com "Teresa Santos"
    And preencho o campo "login" com "teresasantos"
    And preencho o campo "senha" com "TeresaSantos"
    And realizo a atualização das informações do usuário
    Then uma mensagem de erro é exibida indicando que "A operação não pode ser concluída devido à senha inválida"

Scenario: Falha na Atualização de Informações do Usuário por Senha Inválida com Data de Nascimento
    Given o usuário de login "beatrizoliveira" e senha "senha12345" está cadastrado no sistema
    And o usuário de login "beatrizoliveira" e senha "senha12345" está logado no sistema
    And estou na página do usuário de login "beatrizoliveira"
    When preencho o campo "nome" com "Beatriz Oliveira"
    And preencho o campo "login" com "beatrizoliveira"
    And preencho o campo "senha" com "09092003"
    And realizo a atualização das informações do usuário
    Then uma mensagem de erro é exibida indicando que "A operação não pode ser concluída devido à senha inválida"