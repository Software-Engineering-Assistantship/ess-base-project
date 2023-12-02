Scenario: Visualizar Lista Cronológica de Pedidos:

Given o usuário está logado como cliente na página inicial
When o cliente seleciona a opção "Histórico de Pedidos" no menu
Then o sistema exibe uma lista cronológica de todos os pedidos anteriores do cliente.
Then teste para branch



Scenario: Detalhes do Pedido Selecionado:

Given o usuário está logado como cliente na página de "Histórico de Pedidos"
When o usuário seleciona um pedido específico na lista
Then o sistema exibe detalhes completos do pedido, incluindo “data”, “restaurante”, “valor” e uma lista dos itens pedidos.



Scenario: Repetir Pedido Anterior:

Given o usuário está logado como cliente na página de "Histórico de Pedidos".
When o usuário escolhe “repetir um pedido” específico na lista
Then o sistema confirma a ação e adiciona os itens do pedido anterior ao carrinho de compras
And o sistema redireciona o usuário para a página do carrinho, pronto para revisar e confirmar a repetição do pedido.
Ajuste simulado questão 8
Teste questão 13