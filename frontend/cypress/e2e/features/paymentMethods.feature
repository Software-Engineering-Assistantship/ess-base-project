Feature: Gestão de Método de Pagamento

  As a Usuário Cliente
  I want to cadastrar, atualizar e remover os cartões da minha Carteira
  So that eu possa gerenciar eficientemente os cartões

  Scenario: Cadastrar Método de Pagamento com informações insuficientes
    Given estou logado como cliente com o username "math123" e a senha "math123"
    And eu vou para a página "/client/paymentMethods"
    And não há nenhum método de pagamento cadastrado
    When eu clico em adicionar um novo método de pagamento
    And eu preencho o campo "name" com "Matheus A M Silva"
    And eu preencho o campo "cvv" com "123"
    And eu preencho o campo "expiryDate" com "07/2050"
    And eu seleciono o tipo de cartão "DEBITO"
    And eu preencho o campo "cpf" com "12345678990"
    And eu clico em salvar
    Then eu vejo um toast de Erro com a mensagem "Erro ao salvar o cartão"

  Scenario: Cadastrar Método de Pagamento com Sucesso
    Given estou logado como cliente com o username "math123" e a senha "math123"
    And eu vou para a página "/client/paymentMethods"
    And não há nenhum método de pagamento cadastrado
    When eu clico em adicionar um novo método de pagamento
    And eu preencho o campo "name" com "Matheus A M Silva"
    And eu preencho o campo "numCard" com "4242424242424242"
    And eu preencho o campo "cvv" com "123"
    And eu preencho o campo "expiryDate" com "07/2050"
    And eu seleciono o tipo de cartão "DEBITO"
    And eu preencho o campo "cpf" com "12345678990"
    And eu clico em salvar
    Then eu vejo um toast de sucesso com a mensagem "Cartão adicionado com sucesso."
    And eu vejo o método de pagamento com text "Cartão de débito com final **** 4242" cadastrado
    
  Scenario: Cadastrar Método de Pagamento já cadastrado
    Given estou logado como cliente com o username "math123" e a senha "math123"
    And eu vou para a página "/client/paymentMethods"
    And o método de pagamento com o número final 4242 está cadastrado com text "Cartão de débito com final **** 4242"    
    When eu clico em adicionar um novo método de pagamento
    And eu preencho o campo "name" com "Matheus A M Silva"
    And eu preencho o campo "numCard" com "4242424242424242"
    And eu preencho o campo "cvv" com "123"
    And eu preencho o campo "expiryDate" com "07/2050"
    And eu seleciono o tipo de cartão "DEBITO"
    And eu preencho o campo "cpf" com "12345678990"
    And eu clico em salvar
    Then eu vejo um toast de Erro com a mensagem "Erro ao salvar o cartão"

  Scenario: Alterar Método de Pagamento com informações insuficientes
    Given estou logado como cliente com o username "math123" e a senha "math123"
    And eu vou para a página "/client/paymentMethods"
    And o método de pagamento com o número final 4242 está cadastrado com text "Cartão de débito com final **** 4242"
    When eu clico em editar o método de pagamento com o número final "4242"
    And eu apago o campo cpf
    And eu seleciono o tipo de cartão "CREDITO"
    And eu clico em salvar
    Then eu vejo um toast de Erro com a mensagem "Erro ao salvar o cartão"

  Scenario: Alterar Método de Pagamento com Sucesso
    Given estou logado como cliente com o username "math123" e a senha "math123"
    And eu vou para a página "/client/paymentMethods"
    And o método de pagamento com o número final 4242 está cadastrado com text "Cartão de débito com final **** 4242"
    When eu clico em editar o método de pagamento com o número final "4242"
    And eu seleciono o tipo de cartão "CREDITO"
    And eu clico em salvar
    Then eu vejo um toast de sucesso com a mensagem "Cartão atualizado com sucesso."
    And eu vejo o método de pagamento com text "Cartão de crédito com final **** 4242" cadastrado

  Scenario: Deletar Método de Pagamento com Sucesso
    Given estou logado como cliente com o username "math123" e a senha "math123"
    And eu vou para a página "/client/paymentMethods"
    And o método de pagamento com o número final 4242 está cadastrado com text "Cartão de crédito com final **** 4242"
    When eu clico em deletar o método de pagamento com o número final "4242"
    Then eu vejo um toast de sucesso com a mensagem "Cartão excluído com sucesso."
    And o método de pagamento com o text "Cartão de crédito com final **** 4242" não está mais cadastrado



