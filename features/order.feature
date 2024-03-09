GUI:

Scenario: Visualizar Lista Cronológica de Pedidos

Given o usuário está na página inicial
When o usuário seleciona a opção "Histórico de Pedidos" no menu
Then o sistema exibe uma lista cronológica dos pedidos anteriores "P1", "P2" e "P3" do usuário.



Scenario: Sem Histórico de Pedidos

Given o usuário está na página inicial
When o usuário seleciona a opção "Histórico de Pedidos" no menu
Then o sistema exibe a mensagem "Você ainda não fez nenhum pedido" para o usuário.



Scenario: Detalhes do Pedido Selecionado

Given o usuário está na página de "Histórico de Pedidos"
When o usuário seleciona o pedido específico "P1" na lista
Then o sistema exibe detalhes completos desse pedido, incluindo “data”, “restaurante”, “valor” e uma lista dos itens pedidos "Hamburguer", "Batata" e "Coca".



Scenario: Deletar um Pedido do Histórico

Given o usuário está na página de "Histórico de Pedidos"
When o usuário seleciona a opção "Deletar Pedido" do pedido específico "P1" na lista
Then o usuário visualiza uma mensagem de confirmação na tela "Pedido deletado com sucesso!"
And o pedido "P1" não está mais na lista cronológica de pedidos anteriores do usuário.



Scenario: Repetir Pedido Anterior

Given o usuário está na página de "Histórico de Pedidos".
When o usuário seleciona a opção "Repetir Pedido" do pedido específico "P1" na lista
Then o sistema confirma a ação e adiciona os itens do pedido anterior ao carrinho de compras
And o sistema redireciona o usuário para a página do carrinho exibindo os itens "Hamburguer", "Batata" e "Coca" no carrinho.



Scenario: Avaliar Restaurante de Pedido Anterior

Given o usuário está na página de "Histórico de Pedidos"
When o usuário seleciona a opção "Avaliar Restaurante" associado ao pedido específico "P1" da lista
Then o sistema exibe uma opção para avaliação, permitindo ao usuário dar uma pontuação de "X estrelas (1 a 5)" e fornecer comentários opcionais "Muito gostoso!" sobre sua experiência com o restaurante
And o sistema confirma a avaliação e a associa ao histórico de pedidos.


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


Scenario: Deletar um Pedido do Histórico

Given o sistema possui registros no banco de pedidos
When Eu faço uma requisição DELETE para a rota “/order/:id”
Then Eu recebo uma resposta 200
And A resposta JSON deve conter “Item deletado com sucesso”
