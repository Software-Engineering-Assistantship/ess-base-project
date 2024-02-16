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

Scenario: Cancelamento mal sucedido (senha incorreta).
Given existe um usuário com id "1", com senha "senha_userId1", com nome "paulo", email "paulo@cin.ufpe.br", cpf "12345678910" e endereco "rua 10".
And um pedido com número "1", status "Confirmado", tempo "3.00" e preco "24.90" está registrado nos pedidos do usuario de id "1".
When uma requisição de PUT com id "1", motivo "Pedi errado" e senha "###" é enviada para "/clients/1/orders/1/cancellation".
Then o status da resposta deve ser "401".
And uma mensagem de "Pedido não cancelado: senha incorreta!" é retornada com id de pedido "1".

Scenario: Cancelamento mal sucedido (pedido já cancelado).
Given existe um usuário com id "2", com senha "senha_userId2", com nome "luan", email "luan@cin.ufpe.br", cpf "00011133345" e endereco "CIn UFPE".
And um pedido com número "110320", status "cancelled", tempo "4.00" e preco "190.00" está registrado nos pedidos do usuario de id "2".
When uma requisição de PUT com id "2", motivo "Surgiu um imprevisto" e senha "senha_userId3" é enviada para "/clients/2/orders/110320/cancellation".
Then o status da resposta deve ser "400".
And uma mensagem de "Pedido não cancelado: pedido já cancelado!" é retornada com id de pedido "110320".

Scenario: Carregamento pedidos (serviço)
Given existe um usuário com id "2" com senha "senha_userId2".
When uma requisição de "GET" com id "2" é enviada para "/users/2/orders"
Then o status da resposta deve ser "200"
And uma mensagem de "Todos os Pedidos" é retornada.