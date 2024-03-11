Feature: Restaurants
  Scenario: Criação de um restaurante
      Given que o usuário admin está na rota "restaurants/admin"
      When Insiro as informações de nome "Carlos Burguer", endereço "Rua 123", hora de fechamento "1970-01-01T00:00:00.000Z"
      e tipo "Hamburgueria"
      And Clico para salvar as informações inseridas
      Then Sou redirecionado para a tela de visualização de restaurante
      And Vejo as informações já inseridas do restaurante
  
  Scenario: Atualização de um restaurante
      Given Estou na tela de edição de um restaurante com nome “Carlos Burguer”
      When Modifico a informação de nome para “Carlos Burguer Updated” 
      And Seleciono para salvar as alterações
      Then Sou redirecionado de volta para a tela de visualização de restaurante
      And E vejo o restaurante com o nome "Carlos Burguer Updated" e uma mensagem de confirmação

  Scenario: Deleção de um restaurante
      Given Estou na tela de edição de um restaurante
      When Seleciono a opção de deletar um restaurante
      And E recebo um modal de confirmação de deleção do restaurante
      And E seleciono a opção de confirmar a deleção
      Then Sou redirecionado para a tela de criação de um restaurante com uma mensagem de confirmação

  Scenario: Listagem de todos os restaurantes
      Given Estou na home do aplicativo
      When Clico na opção "ver todos"
      Then Visualizo a lista atual de restaurantes com informações de nome e tipo

  Scenario: Atualização de um item do cardápio mal sucedida
      Given O usuário "Marcos" está na tela de editar um item com nome “Hamburguer 02”
      And O item com nome "Hamburguer 02" foi deletado
      When O usuário modifica a informação de nome para “Hamburguer 03” 
      And Seleciona para salvar as alterações
      Then Ele é redirecionado de volta para a tela de listagem de itens
      And E recebe uma mensagem de erro informando que o item "Hamburguer 02" não existe
