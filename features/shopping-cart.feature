Feature: Shopping Cart

Scenario: Remover item do carrinho
Given Eu estou na tela "Carrinho" como cliente
And Tenho o item "Whopper" de ID "48372847" cadastrado no carrinho
When Eu clico em “Excluir” para o item "Whopper" de ID "48372847" 
And Eu vejo uma mensagem de confirmação para a exclusão do item
And Eu clico em "Confirmar"
Then O item "Whopper" de ID "48372847" não está mais no carrinho

Scenario: Mudança teste
Given Eu estou na tela "Carrinho" como cliente
And Tenho o item "Whopper" que custa "20,99" cadastrado no carrinho em quantidade "2"
When Eu clico em “+1” para o item "Whopper" 
Then A quantidade do item "Whopper" incrementa para "3"
And A label que mostra a quantidade do item reflete a incrementação 
And O total a ser pago aumenta em "20,99"
And blabla bla