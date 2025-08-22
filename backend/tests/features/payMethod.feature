Feature: Gestão de metodo de Pagamento

  Scenario: Cadastrar Metodo de Pagamento com Sucesso
    Given nenhum metodo de pagamento esta cadastrado
    When cadastro um novo metodo de pagamento com nome "Visa", numCard "4111111111111111", cvv "123", validade "07/2023", tipo "CREDITO", cpf "12345678990"
    Then vejo a mensagem "Cartao Cadastrado com Sucesso"
    And vejo "Visa" na lista de metodos de pagamento

  Scenario: Alterar Metodo de Pagamento com Sucesso
    Given o metodo de pagamento "Visa" esta cadastrado com o tipo "CREDITO"
    When altero o metodo de pagamento "Visa" para o tipo "DEBITO"
    Then vejo a mensagem "Metodo de Pagamento Alterado com Sucesso"
    And vejo "Visa" com o tipo "DEBITO" na lista de metodos de pagamento

  Scenario: Deletar Metodo de Pagamento com Sucesso
    Given o metodo de pagamento "Visa" esta cadastrado
    When deleto o metodo de pagamento "Visa"
    Then vejo a mensagem "Metodo de pagamento Deletado com Sucesso"
    And nao vejo "Visa" na lista de metodos de pagamento

  Scenario: Tentativa de Cadastro de metodo de pagamento ja cadastrado
    Given o metodo de pagamento "cartao itau" esta cadastrado com numCard "1234567891234567", cvv "234", validade "08/2023", tipo "DEBITO", cpf "12345678990"
    When cadastro um novo metodo de pagamento com nome "cartao itau", numCard "1234567891234567", cvv "234", validade "08/2023", tipo "DEBITO", cpf "12345678990"
    Then vejo a mensagem "Erro no Cadastro de Metodo de Pagamento"
    And vejo "cartao itau" na lista de metodos de pagamento

