Feature: Cancelamento de Pedidos
As um usuário 
I want to acessar os pedidos em andamento e ter a possibilidade 
de solicitar o cancelamento de um pedido
So that quando eu tiver algum contratempo ou mudar de ideia, eu possa 
cancelar o meu pedido.

Scenario: Cancelar pedido nos 5 minutos iniciais e com status confirmado.
Given eu estou logado como "Hugo" com senha "123"
And eu estou na página "Pedidos em Andamento" 
And o pedido "#01" foi realizado há "3" minutos.
And o status do pedido "#01" é "Confirmado"
When seleciona a opção "Cancelar Pedido" do pedido "#01". 
Then aparece a "Janela  de Confirmação".
