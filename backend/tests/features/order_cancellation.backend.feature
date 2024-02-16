Feature: Cancelamento de Pedidos.
As um usuário. 
I want to acessar os Pedidos e ter a possibilidade de solicitar o cancelamento de um pedido.
So that quando eu tiver algum contratempo ou mudar de ideia, eu possa cancelar o meu pedido.

Scenario: Cancelamento de pedido bem sucedido
Given existe um usuário com id "3", com senha "senha_userId3", com nome "joao", email "joao@cin.ufpe.br", cpf "11122233344" e endereco "rua 1".
And um pedido com número "4", status "Confirmado", tempo "2.00" e preco "50.00" está registrado nos pedidos do usuario de id "3".
When uma requisição de PUT com id "3", motivo "outros" e senha "senha_userId3" é enviada para "/clients/3/orders/4/cancellation". 
Then o status da resposta deve ser "200". 
And uma mensagem de "Pedido Cancelado" é retornada com id de pedido "4".

Scenario: Cancelamento mal sucedido.
Given existe um usuário com id "1" com senha "senha_userId1".
And um pedido com número "001" está registrado em "/users/1/orders".
When uma requisição de "POST" com id "1" motivo "Pedi errado" e senha "###" é enviada para "/users/1/orders/001/cancellation".
Then o status da resposta deve ser "401".
And uma mensagem de "Pedido não cancelado" é retornada com id de pedido "001".

Scenario: Carregamento pedidos (serviço)
Given existe um usuário com id "2" com senha "senha_userId2".
When uma requisição de "GET" com id "2" é enviada para "/users/2/orders"
Then o status da resposta deve ser "200"
And uma mensagem de "Todos os Pedidos" é retornada.