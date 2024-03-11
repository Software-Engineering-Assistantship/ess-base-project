Feature: Payment
  Scenario: Criar forma de pagamento
      Given que o usuário está na página "payment"
      And não existe um cartão com final "2475"
      When o usuário clica no botão de adicionar novo cartão "+ Adicionar novo cartão"
      And o usuário seleciona o campo "#teste" com "Crédito" e o campo "Número do Cartão" com "740236102175" e o campo "Data de Validade" com "12/26" e o campo "CVV" com "390" e o campo "Nome do Titular" com "Clara Kenderessy" 
      And o usuário clica no botão de salvar "Salvar"
      Then o usuário deve ver os últimos dígitos "2475" na lista de cartões 
