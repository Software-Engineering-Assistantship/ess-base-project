Feature: Categories
  Scenario: Criar categoria de um restaurante
      Given que o usuário admin está na página "restaurants/admin/e318dd08-543f-488f-9983-7689f5009d14"
      And não existe a categoria de nome "Entradas"
      When o usuário clica no botão de criar categoria "Criar categoria"
      And o usuário preenche o campo "Nome" com "Entradas" e o campo "Descrição" com "Para iniciar"
      And o usuário clica no botão "Salvar"
      Then o usuário deve ver a categoria "Entradas" na lista de categorias do restaurante
