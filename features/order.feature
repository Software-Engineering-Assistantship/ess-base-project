GUI:

Scenario: Visualizar Lista Cronológica de Pedidos:

Given o usuário está logado como cliente na página inicial
When o usuário seleciona a opção "Histórico de Pedidos" no menu
Then o sistema exibe uma lista cronológica de todos os pedidos anteriores do cliente.



Scenario: Detalhes do Pedido Selecionado:

Given o usuário está logado como cliente na página de "Histórico de Pedidos"
When o usuário seleciona um pedido específico na lista
Then o sistema exibe detalhes completos do pedido, incluindo “data”, “restaurante”, “valor” e uma lista dos itens pedidos.



Scenario: Repetir Pedido Anterior:

Given o usuário está logado como cliente na página de "Histórico de Pedidos".
When o usuário escolhe “repetir um pedido” específico na lista
Then o sistema confirma a ação e adiciona os itens do pedido anterior ao carrinho de compras
And o sistema redireciona o usuário para a página do carrinho.



Scenario: Avaliar Restaurante de Pedido Anterior:

Given o usuário está logado como cliente na página de "Histórico de Pedidos"
When o usuário escolhe “avaliar um restaurante” específico associado a um pedido na lista
Then o sistema exibe uma opção para avaliação, permitindo ao usuário dar uma pontuação de “X estrelas (1 a 5)” e fornecer comentários opcionais sobre sua experiência com o restaurante
And o sistema confirma a avaliação e a associa ao histórico de pedidos, proporcionando feedback ao restaurante.


SERVICE:

Scenario: Recuperar Histórico de Pedidos

Given o sistema possui registros no banco de pedidos
When Eu faço uma requisição GET para a rota “/order”
Then Eu recebo uma resposta 200
And o JSON da resposta deve ser uma lista de pedidos em ordem cronológica
And a data "2024-02-18" está nos detalhes do pedido
And o valor "R$30,00" está nos detalhes do pedido


Scenario: Sem Histórico de Pedidos

Given o sistema não possui registros de pedidos
When Eu faço uma requisição GET para a rota “/orders”
Then Eu recebo uma resposta 200
And o JSON da resposta deve ser uma lista vazia []


Scenario: Adicionar Avaliação ao Restaurante

Given o sistema possui registros no banco de pedidos
When Eu faço uma requisição POST para a rota “/order”
And no corpo da requisição eu incluo o comentário opcional "Ótimo serviço, comida deliciosa!" e classificação "5" estrelas
Then Eu recebo uma resposta 200


Scenario: Falha ao Adicionar Avaliação ao Restaurante

Given o sistema possui registros no banco de pedidos
When Eu faço uma requisição POST para a rota “/order”
And no corpo da requisição eu incluo os itens do pedido e avaliação opcional "Ótimo serviço, comida deliciosa!" e classificação "5"
And o sistema encontra um erro durante o processamento da requisição
Then a resposta JSON deve conter "Falha ao adicionar avaliação ao restaurante 'Restaurante 1'"


Scenario: Visualizar Detalhes de um Pedido do Histórico

Given o sistema possui registros no banco de pedidos
And o sistema possui um pedido com a data "2024-02-18" e as informações específicas de cada produto do pedido
When Eu faço uma requisição GET para a rota “/order/:id”
Then Eu recebo uma resposta 200
And o JSON da resposta deve ser uma lista de itens e detalhes do pedido


Scenario: Falha ao Visualizar Detalhes de um Pedido do Histórico

Given o sistema possui registros no banco de pedidos
And o sistema possui um pedido com a data "2024-02-18"
When Eu faço uma requisição GET para a rota “/order/:id”
Then Eu recebo uma resposta 404
And a resposta JSON deve conter "Pedido não encontrado"
