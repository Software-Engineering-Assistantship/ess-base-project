Feature: Cadastro de métodos de pagamento

Scenario: Visualização dos métodos de pagamento quando existem
	Given há usuário cadastrado com CPF "11111111111"
  	And há cartão cadastrado com o card_number "9999 9999 9999 9999" e type "credit"
	When uma nova requisição GET é feita para o endpoint "/payment_methods" 
	Then o usuário com CPF "11111111111" vê o cartão de card_number "9999 9999 9999 9999" e type "credit"

Scenario: Visualização dos métodos de pagamento quando não existem
	Given há usuário cadastrado com CPF "11111111111"
	And não há cartão cadastrado no banco de dados
	When uma nova requisição GET é feita para o endpoint "/payment_methods" 
	Then o usuário com CPF "11111111111" vê o status "404" e a mensagem "Card not found" 

Scenario: Cadastro de novo cartão no banco de dados
	Given há usuário cadastrado com CPF "11111111111"
	And não há cartão cadastrado com o card_number "9999 9999 9999 9999" e type "credit"
	When uma nova requisição POST é feita para o endpoint "/payment_methods" com o body: card_number: "9999 9999 9999 9999", name: "José", expire_date: "12/2028", password: "111111", type "credit" e CVV "123"
	Then o cadastro do cartão com o card_number "9999 9999 9999 9999" e type "credit" no banco de dados é realizado com sucesso
	And o código de resposta é "201" Created e a mensagem "Card registered with success" é exibida

Scenario: Cadastro de novo cartão de mesmo card_number, mas types diferentes
	Given há usuário cadastrado com CPF "11111111111"
	And não há cartão cadastrado com o card_number "9999 9999 9999 9999" e type "debit"
	And há cartão cadastrado com o card_number "9999 9999 9999 9999" e type "credit"
	When uma nova requisição POST é feita para o endpoint "/payment_methods" com o body: card_number: "9999 9999 9999 9999", name: "José", expire_date: "12/2028", password: "111111", type "debit" e CVV "123"
	Then o cadastro do cartão com o card_number "9999 9999 9999 9999" e type "debit" no banco de dados é realizado com sucesso
	And o código de resposta é "201" Created e a mensagem "Card registered with success" é exibida

Scenario: Cadastro de cartão de crédito repetido no banco de dados
	Given há usuário cadastrado com CPF "11111111111"
	And há cartão cadastrado com o card_number "9999 9999 9999 9999" e type "credit"
	When uma nova requisição POST é feita para o endpoint "/payment_methods" com o body: card_number: "9999 9999 9999 9999", name: "José", expire_date: "12/2028", password: "111111", type "credit" e CVV "123"
	Then o cadastro do cartão não é realizado com sucesso
	And o código de resposta é "400" Bad Request e a mensagem "This card is already registered" são exibidos

Scenario: Remoção de cartão de crédito no banco de dados com sucesso
    Given há usuário cadastrado com CPF "11111111111"
	And há cartão cadastrado com o card_number "9999 9999 9999 9999" e type "crédito"
    When uma nova requisição DELETE é feita para o endpoint "/payment_methods"
	Then o banco de dados deleta o cartão com sucesso 
	And o código de resposta "200" OK e a mensagem "Card removed with success" são exibidos

Scenario: Cadastro de cartão de crédito com dados incompletos
  	Given há usuário cadastrado com CPF "11111111111"
	When uma nova requisição POST é feita para o endpoint "/payment_methods" com o body: card_number: "a", name: "José", expire_date: "12/2028", password: "111111", type "debit" e CVV "123"
	Then o cadastro do cartão não é realizado com sucesso 
 	And o código de resposta é "400" Bad Request e a mensagem "Fields invalid" é exibida