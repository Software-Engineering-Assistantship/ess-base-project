Feature: Criar e visualizar tests
  As a usuário
  I want criar e visualizar meus tests criados.
  so that eu possa ter um histórico de tests.

Scenario: Criar um test
  Given o usuário está na página "create-test"
  When o usuário preenche o campo "input-name" com "Teste 1" e clica no botão "create"
  Then o usuário deve ver a mensagem "Teste criado com sucesso!"

Scenario: Criar um test com nome vazio
  Given o usuário está na página "create-test"
  When o usuário não preenche o campo "input-name" e clica no botão "create"
  Then o usuário deve ver a mensagem "O campo nome deve ter no mínimo 5 caracteres" do campo "input-name"

Scenario: Visualizar tests
  Given o usuário está na página "create-test" com o test "Test Seed" criado
  When o usuário clica no botão "view-tests"
  Then o usuário deve ir para a página "tests" e ver o test "Test Seed"
