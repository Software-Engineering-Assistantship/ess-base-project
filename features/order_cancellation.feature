Feature: Cancelamento de Pedidos.
As um usuário. 
I want to acessar os pedidos em andamento e ter a possibilidade. 
de solicitar o cancelamento de um pedido.
So that quando eu tiver algum contratempo ou mudar de ideia, eu possa 
cancelar o meu pedido.

Scenario: Cancelar pedido nos 5 minutos iniciais e com status confirmado.
Given eu estou logado como "Hugo" com senha "123".
And eu estou na página "Pedidos em Andamento". 
And o pedido "#01" foi realizado há "3" minutos.
And o status do pedido "#01" é "Confirmado".
When seleciona a opção "Cancelar Pedido" do pedido "#01". 
Then aparece a "Janela  de Confirmação".

Scenario: Falha ao cancelar pedido após os 5 minutos iniciais.
Given eu estou logado como "Hugo" com senha "123".
And eu estou na página "Pedidos em Andamento". 
And um usuário finalizou o pedido "#01" há "6" minutos.
And o status do pedido "#01" é "Confirmado".
When seleciona a opção "Cancelar Pedido". 
Then há uma "notificação" informando "Tempo limite excedido!!".

Scenario: Falha ao cancelar pedido após o pedido estar com status "em Preparo".
Given eu estou logado como "Hugo" com senha "123".
And eu estou na página "Pedidos em Andamento". 
And um usuário finalizou o pedido "#01" há "3" minutos.
And o status do pedido "#01" é "em Preparo".
When seleciona a opção "Cancelar Pedido". 
Then há uma "notificação" informando "Pedido já em preparo :(". 

Scenario: Falha na confirmação de cancelamento sem seleção de motivo.
Given eu estou logado como "Hugo" com senha "123".
And eu estou na página "Pedidos em Andamento.
And eu estou com a "Janela de confirmação" aberta.
When insiro a senha "123".
And seleciona a opção "Confirmar Cancelamento".
Then há uma "notificação" informando "É necessário inserir um motivo para o cancelamento".

Scenario: Confirmação de cancelamento de pedido.
Given eu estou logado como "Hugo" com senha "123".
And eu estou na página "Pedidos em Andamento".
And eu estou com a "Janela de confrimação" aberta.
When seleciona a opção "Outros".
And insiro a senha "123".
And seleciona a opção "Confirmar Cancelamento".
Then há uma "notificação" informando "Pedido Cancelado com sucesso!"
