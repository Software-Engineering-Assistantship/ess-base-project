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
