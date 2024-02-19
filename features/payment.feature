Scenario: Adicionar um novo cartão como forma de pagamento 
Given Eu estou no menu “Formas de pagamento”
And O usuário de username “clara_abk” não tem o cartão com número “************4729” cadastrado
When Eu clico em “Adicionar novo cartão”
And Eu cadastro o cartão de número “4820472947204729” com CVV “X”, data de 
validade “Y” e nome do titular “Maria Kenderessy”
Then Eu vejo uma mensagem de confirmação
And Eu vejo os últimos 4 números “4729” na lista de cartões cadastrados

Scenario: Excluir um Cartão
Given Eu estou no menu “Formas de pagamento”
And O usuário de username “clara_abk” tem o cartão com número “************4823” cadastrado
When Eu clico em “Excluir” para o cartão com número “************4823”
Then Eu vejo uma mensagem de confirmação para a exclusão do cartão
And O cartão com número “************4823” não está mais na lista de cartões cadastrados

Scenario: Pagamento por PIX ao Fazer um Pedido
Given Eu estou no menu de “Pagamento”
And Eu adicionei itens ao meu carrinho de compras
And Eu selecionei a opção de pagamento por PIX
When Eu confirmo o pedido
Then Eu vejo um código copia-cola para pagamento de Pix
And Eu completo o pagamento usando meu aplicativo de banco
And Eu recebo uma confirmação do restaurante sobre o recebimento do pagamento por PIX
And O status do meu pedido é atualizado para "Em Preparo"

SERVICE:

Scenario: Adicionar um novo cartão como forma de pagamento 
Given Eu não tenho nenhum cartão cadastrado com número "942039473732"
When Eu faço uma requisição POST para a rota “/payment” com Numero “942039473732”, com o CVV “390”,  Data de Validade “11/10”, nome do titular “Maria Kenderessy” a type "credit"
Then Eu recebo uma resposta 204
And A resposta JSON deve conter um JSON com as informações do cartão

Scenario: Listar todos os cartões de um usuário
Given Eu tenho o cartão de número “2023932384729” cadastrado 
And Eu tenho o cartão de número “2384023947322”
When Eu faço uma requisição GET para a rota “/payment” 
Then Eu recebo uma resposta 204
And A resposta JSON deve conter um array com as informações de todos os cartões

Scenario: Listar as informações de um cartão
Given Eu tenho o cartão de número “2023932384729” cadastrado 
When Eu faço uma requisição GET para a rota “/payment/2023932384729” 
Then Eu recebo uma resposta 204
And A resposta JSON deve conter um o número, CVV, data de validade do cartão, nome e tipo

Scenario: Atualizar o número do cartão cadastrado
Given Eu tenho o cartão de número “2023932384729” cadastrado
When Eu faço uma requisição PATCH para a rota “/payment/2023932384729” com o body {"number": 2023932384728”}
Then Eu recebo uma resposta 204
And A resposta JSON deve conter os novos dados do cartão.


