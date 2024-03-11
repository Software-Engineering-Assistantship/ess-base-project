Feature: Cardapio

  Scenario: 1. Criação de um item do cardápio
      Given que o usuário admin está na página "restaurants/admin/:restaurantId"
      When seleciono a opção de "Criar item"
      Then insiro um item com nome "Hamburguer", descrição "Bom", preço "30.00", quantidade "1" e a primeira categoria da lista no cardápio
      When clico para salvar as informações inseridas
      Then vejo o novo item do cardápio na lista com o nome "Hamburguer"

  Scenario: 2. Atualização de um item do cardápio bem sucedida
      Given que o usuário admin está na página "restaurants/admin/:restaurantId"
      When o usuário clica no botão para editar o primeiro item da lista
      Then modifico o nome do item para "Hamburguer editado", descrição "editada", preço "25.00", quantitade "2" e a primeira categoria
      When clico para salvar as informações inseridas
      Then o item é atualizado para o novo nome "Hamburguer editado"

  Scenario: 3. Deleção de um item do cardápio bem sucedida
      Given que o usuário admin está na página "restaurants/admin/:restaurantId"
      When seleciono a opção de "Criar item"
      Then insiro um item com nome "Hamburguer deletado", descrição "Bom", preço "30.00", quantidade "1" e a primeira categoria da lista no cardápio
      When clico para salvar as informações inseridas
      When seleciono a opção de deletar o item "Hamburguer deletado"
      Then recebo um modal de confirmação da deleção do item
      When seleciono a opção de confirmar a deleção
      Then não vejo mais o item com o nome "Hamburguer deletado" na listagem

  Scenario: 4. Leitura de todos os itens do cardápio de um restaurante
      Given que o usuário admin está na página "restaurants/admin/:restaurantId"
      Then visualizo os itens "Hamburguer" e "Hamburguer editado"