Feature: Categories

  Scenario: 1. Criar categoria de um restaurante
      Given que o usuário admin está na página "restaurants/admin/:restaurantId"
      And não existe a categoria de nome "Entradas"
      When o usuário clica no botão de criar categoria "Criar categoria"
      And o usuário preenche o campo "Nome" com "Entradas" e o campo "Descrição" com "Para iniciar"
      And o usuário clica no botão "Salvar"
      Then o usuário deve ver a categoria "Entradas" na lista de categorias do restaurante

  Scenario: 2. Editar categoria de um restaurante
      Given que o usuário admin está na página "restaurants/admin/:restaurantId"
      And existe a categoria de nome "Entradas"
      When o usuário clica no símbolo de editar categoria do item "Entradas"
      And o usuário atualiza o campo "Nome" com o valor "Almoço" 
      And o usuário clica no botão "Editar"
      Then o usuário deve ver a categoria atualizada com o nome "Almoço" na lista de categorias do restaurante

  Scenario: 3. Criar categoria de um restaurante com nome já existente
      Given que o usuário admin está na página "restaurants/admin/:restaurantId"
      And já existe a categoria de nome "Almoço"
      When o usuário clica no botão de criar categoria "Criar categoria"
      And o usuário preenche o campo da nova categoria "Nome" com "Almoço" e o campo "Descrição" com "Para comer bem"
      And o usuário clica no botão "Salvar"
      Then o usuário deve receber uma mensagem de erro com "Nome já utilizado"

  Scenario: 4. Deletar categoria de um restaurante
      Given que o usuário admin está na página "restaurants/admin/:restaurantId"
      And existe a categoria de nome "Almoço"
      When o usuário clica no símbolo de deletar categoria do item "Almoço"
      And o usuário clica no botão "Confirmar"
      Then o usuário não deve ver a categoria de nome "Almoço" na lista de categorias do restaurante