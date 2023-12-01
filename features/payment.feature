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

Scenario: Cadastrar um Novo Cupom
Given Eu estou no menu “Cupons de Desconto”
And O usuário de username “clara_abk” não tem o cupom com código “DESC10” cadastrado
When Eu clico em “Adicionar novo cupom”
And Eu cadastro o cupom com código “DESC10” e percentual de desconto “10%”
Then Eu vejo uma mensagem de confirmação
And Eu vejo o cupom com código “DESC10” na lista de cupons cadastrados

Scenario: Pagamento por PIX ao Fazer um Pedido
Given Eu estou no menu de “Pagamento”
And Eu adicionei itens ao meu carrinho de compras
And Eu selecionei a opção de pagamento por PIX
When Eu confirmo o pedido
Then Eu vejo um código copia-cola para pagamento de Pix
And Eu completo o pagamento usando meu aplicativo de banco
And Eu recebo uma confirmação do restaurante sobre o recebimento do pagamento por PIX
And O status do meu pedido é atualizado para "Em Preparo"
