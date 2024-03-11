GUI:

Feature: Histórico de Pedidos

  Scenario: Visualizar Lista Cronológica de Pedidos
      Given o usuário está na página inicial
      When o usuário seleciona a opção "Order History" no menu
      Then o sistema exibe uma lista cronológica dos pedidos anteriores

  Scenario: Detalhes do Pedido Selecionado
      Given o usuário está na rota "order-history"
      When o usuário clica para ver os detalhes do primeiro pedido na lista
      Then o sistema exibe detalhes completos desse pedido

  Scenario: Repetir Pedido Anterior
      Given o usuário está na rota de "order-history"
      When o usuário seleciona a opção "Repetir" do primeiro item da lista
      Then o novo pedido aparece no histórico

  Scenario: Deletar um Pedido do Histórico
      Given o usuário na rota de "order-history"
      When o usuário clica no botão para apagar o primeiro item da lista
      Then o pedido não está mais na lista cronológica de pedidos anteriores do usuário

  Scenario: Avaliar Pedido Anterior
      Given o usuário navegou para a rota "order-history"
      When o usuário seleciona a opção "Avaliar" no primeiro item da lista
      When o sistema exibe um modal para avaliar o pedido
      Then o usuário preenche com "5" entrelas e um comentário "Muito bom" e clica no botão de avaliar
      Then o pedido possui avaliação e comentário

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


Scenario: Adicionar Avaliação ao Pedido

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
