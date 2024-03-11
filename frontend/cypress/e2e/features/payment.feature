Feature: Payment
  Scenario: 1. Criar forma de pagamento
      Given que o usuário está na página "payment"
      And não existe um cartão com final "2475"
      When o usuário clica no botão de adicionar novo cartão "+ Adicionar novo cartão"
      And o usuário seleciona o campo "#teste" com "Crédito" e o campo "Número do Cartão" com "740236102475" e o campo "Data de Validade" com "12/26" e o campo "CVV" com "390" e o campo "Nome do Titular" com "Clara Kenderessy" 
      And o usuário clica no botão de salvar "Salvar"
      Then o usuário deve ver os últimos dígitos "2475" na lista de cartões 

  Scenario: 2. Criar forma de pagamento com mesmo número
      Given que o usuário está na página "payment"
      And existe um cartão com os 4 últimos dígitos "2475"
      When o usuário clica no botão de adicionar novo cartão "+ Adicionar novo cartão"
      And o usuário seleciona o campo "#teste" com "Crédito" e o campo "Número do Cartão" com "740236102475" e o campo "Data de Validade" com "12/26" e o campo "CVV" com "390" e o campo "Nome do Titular" com "Clara Kenderessy" 
      And o usuário clica no botão de salvar "Salvar"
      Then o usuário deve receber uma mensagem de erro com o texto "Número já em uso"

  Scenario: 3. Editar forma de pagamento
      Given que o usuário não admin está na página "payment"
      And existe um cartão com os 4 últimos dígitos "2475"
      When o usuário clica no símbolo de editar cartão do cartão "2475"
      And o usuário atualiza o campo "Novo número do cartão" com o número "379284639332" 
      And o usuário clica no botão para salvar "Salvar"
      Then o usuário deve ver o número "9332" na lista de cartões


    Scenario: 3. Apagar forma de pagamento
        Given que o usuário não admin está na página "payment"
        And existe um cartão com os 4 últimos dígitos "9332"
        When o usuário clica no símbolo de deletar cartão do cartão "9332"
        And o usuário clica no botão de confirmação "Confirmar"
        Then o usuário não deve ver o cartão de número "9332" na lista de cartões
