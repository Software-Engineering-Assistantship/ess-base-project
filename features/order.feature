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

Given o sistema possui registros no banco de histórico de pedidos para o cliente "UserID123"
When o cliente solicita seu histórico de pedidos
Then o sistema requisita e recebe a lista cronológica de todos os pedidos anteriores do cliente, incluindo detalhes como “data”, “restaurante”, “valor” e itens pedidos.



Scenario: Adicionar Avaliação ao Restaurante

Given o cliente "UserID123" já possui um histórico de pedidos avaliados
When o cliente escolhe avaliar o “restaurante associado” a um pedido específico
And fornece uma pontuação de "4 estrelas" e comentários opcionais sobre a experiência
Then o sistema registra e posta no banco a avaliação associada ao histórico de pedidos do cliente, proporcionando feedback ao restaurante
And permite que o “restaurante" acesse essas avaliações para melhorar a qualidade do serviço.