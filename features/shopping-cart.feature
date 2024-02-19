Feature: Shopping Cart

GUI

Scenario: Remover item do carrinho
Given Eu estou na tela "Carrinho" como cliente
And Tenho o item "Whopper" de ID "48372847" cadastrado no carrinho
When Eu clico em “Excluir” para o item "Whopper" de ID "48372847" 
And Eu vejo uma mensagem de confirmação para a exclusão do item
And Eu clico em "Confirmar"
Then O item "Whopper" de ID "48372847" não está mais no carrinho

Scenario: Aumentar quantidade de item
Given Eu estou na tela "Carrinho" como cliente
And Tenho o item "Whopper" que custa "20,99" cadastrado no carrinho em quantidade "2"
When Eu clico em “+1” para o item "Whopper" 
Then A quantidade do item "Whopper" incrementa para "3"
And A label que mostra a quantidade do item reflete a incrementação 
And O total a ser pago aumenta em "20,99"

Scenario: Limpar carrinho
Given Eu estou na tela "Carrinho" como cliente
And Tenho os itens "Whopper", "Batata", "Coca" no carrinho
When Eu clico em “Limpar Carrinho" na tela 
And Eu vejo uma mensagem de confirmação para a limpeza do carrinho
And Eu clico em "Confirmar"
Then os itens "Whopper", "Batata" e "Coca" são removidos do carrinho

Scenario: Fazer pedido
Given Eu estou na tela "Carrinho" como cliente
And Tenho os itens "Whopper" ,"Batata" e "Coca" 
When Eu clico em "Fazer pedido" 
Then Navego para a tela "Pagamento" 


Scenario: Mudança teste
Given Eu estou na tela "Carrinho" como cliente
And Tenho o item "Whopper" que custa "20,99" cadastrado no carrinho em quantidade "2"
When Eu clico em “+1” para o item "Whopper" 
Then A quantidade do item "Whopper" incrementa para "3"
And A label que mostra a quantidade do item reflete a incrementação 
And O total a ser pago aumenta em "20,99"

Scenario: Limpar carrinho
Given Eu estou na tela "Carrinho" como cliente
And Tenho os itens "Whopper", "Batata", "Coca" no carrinho
When Eu clico em “Limpar Carrinho" na tela 
And Eu vejo uma mensagem de confirmação para a limpeza do carrinho
And Eu clico em "Confirmar"
Then os itens "Whopper", "Batata" e "Coca" são removidos do carrinho

SERVICE

Scenario: Remover item do carrinho
Given Eu estou na tela "Carrinho" como cliente
And Tenho o item "Whopper" de ID "48372847" cadastrado no carrinho
When Eu clico em “Excluir” para o item "Whopper" de ID "48372847" 
And Eu vejo uma mensagem de confirmação para a exclusão do item
And Eu clico em "Confirmar"
Then O item "Whopper" de ID "48372847" não está mais no carrinho

Scenario: Revisar a compra
Given Um cliente tem o item de ID "75839201" no carrinho
When O serviço de carrinho recebe uma solicitação para realizar um GET do conteúdo do carrinho para revisão
Then O item de ID "75839201" aparece corretamente na revisão

Scenario: Revisar a compra com seleção de itens
Given Um cliente tem o item de ID "75839201" e o item de ID "75839202" no carrinho
And Apenas o item de ID "75839201" está selecionado
When O serviço de carrinho recebe uma solicitação para realizar um GET do conteúdo do carrinho para revisão
Then Apenas o item de ID "75839201" aparece na revisão, com suas propriedades corretas

Scenario: Editar item
Given Um cliente tem o item de ID "75839201" no carrinho
When O serviço de carrinho recebe uma solicitação para realizar um UPDATE do item de ID "75839201"
Then O item de ID "75839201" é corretamente atualizado

Scenario: Adicionar item ao carrinho
Given Um cliente não tem o item de ID "75839201" no carrinho
When O serviço de carrinho recebe uma solicitação para realizar um POST do item de ID "75839201" ao carrinho
Then O item de ID "75839201" está agora no carrinho

Scenario: Remover item do carrinho
Given Um cliente tem o item de ID "48372847" no carrinho
When O serviço de carrinho recebe uma solicitação para DELETE do item de ID "48372847"
And O serviço envia uma mensagem de confirmação para a exclusão do item ID "48372847"
And O cliente confirma a exclusão do item de ID "48372847"
Then O item de ID "48372847" não está mais no carrinho

Scenario: Incrementar quantidade de item no carrinho
Given Um cliente tem o item de ID "75839201" no carrinho
When O serviço de carrinho recebe uma solicitação para realizar um UPDATE ao item de ID "75839201" ao carrinho em sua propriedade "quantidade"
Then O item de ID "75839201" está atualizado

Scenario: Carregar itens do carrinho
Given Um cliente tem o item de ID "75839201" no carrinho
When O sistema requisita um GET do conteúdo do carrinho
Then O item de ID "75839201" aparece no carrinho