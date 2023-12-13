Feature: Gerenciamento de Cadeiras
  As a administrador do sistema
  I want to gerenciar as cadeiras no sistema
  So that eu possa manter as informacoes das cadeiras atualizadas

  Scenario: Entrar na pagina de cadastro/edicao de cadeiras
    Given o administrador esta logado com login "breno" e senha "correctpassword"
    And esta na pagina inicial
    When o administrador entra em "edicao"
    Then o administrador esta na pagina "cadastro / edicao de cadeiras"

  Scenario: Entrar na pagina de adicionar cadeira
    Given o administrador esta logado com login "breno" e senha "correctpassword"
    And esta na pagina "cadastro / edicao de cadeiras"
    When o administrador entra em "adicionar" da cadeira "Calculo 1"
    Then entra na pagina "adicionar cadeira"

  Scenario: Adicionar cadeira com sucesso
    Given o administrador esta logado com login "breno" e senha "correctpassword"
    And esta na pagina "adicionar cadeira"
    When o administrador preenche todos os campos obrigatórios e adiciona uma nova cadeira
    Then a cadeira é adicionada ao sistema com sucesso
    And o administrador esta na pagina "cadastro / edicao de cadeiras"
    And o administrador recebe a mensagem "Cadeira adicionada com sucesso!"

  Scenario: Tentativa de adicionar cadeira com campo obrigatório nao preenchido
    Given o administrador esta logado com login "breno" e senha "correctpassword"
    And esta na pagina "adicionar cadeira"
    When o administrador deixa um campo obrigatório sem preencher ao tentar adicionar uma nova cadeira
    Then o administrador recebe a mensagem "Preencha todos os campos obrigatórios!"
    And continua na pagina "adicionar cadeira"

  Scenario: Adicionar cadeira com código invalido
    Given o administrador esta logado com login "breno" e senha "correctpassword"
    And esta na pagina "adicionar cadeira"
    When o administrador adiciona uma cadeira com um código invalido
    Then o administrador recebe a mensagem "Código da cadeira invalido! Precisa constar no banco de dados"
    And continua na pagina "adicionar cadeira"

  Scenario: Entrar na pagina de edicao de uma cadeira específica
    Given o administrador esta logado com login "breno" e senha "correctpassword"
    And esta na pagina "cadastro / edicao de cadeiras"
    When o administrador entra em "editar" de uma cadeira
    Then entra na pagina "edicao de cadeira" da cadeira escolhida

  Scenario: Editar cadeira com sucesso
    Given o administrador esta logado com login "breno" e senha "correctpassword"
    And esta na pagina "edicao de cadeira"
    When o administrador edita um campo e salva a cadeira
    Then recebe a mensagem "Cadeira editada com sucesso!"
    And esta na pagina "cadastro / edicao de cadeiras"

  Scenario: Tentativa de edicao de cadeira com campo vazio
    Given o administrador esta logado com login "breno" e senha "correctpassword"
    And esta na pagina "edicao de cadeira"
    When o administrador deixa um campo obrigatorio vazio e tenta salvar a cadeira
    Then o administrador recebe a mensagem "Preencha todos os campos obrigatórios!"
    And continua na pagina "edicao de cadeira"

  Scenario: Tentativa de edicao de cadeira com código invalido
    Given o administrador esta logado com login "breno" e senha "correctpassword"
    And esta na pagina "edicao de cadeira"
    When o administrador muda o código da cadeira para um código invalido e tenta salvar
    Then o administrador recebe a mensagem "Código da cadeira invalido! Precisa constar no banco de dados"
    And continua na pagina "edicao de cadeira"
