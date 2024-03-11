Feature: Restaurants
  Scenario: Criação de um restaurante
      Given o usuário admin está na rota "restaurants/admin"
      And não existe o restaurante de nome "Jobson Burguer"
      When o usuário clica no botão de criar restaurante "Criar restaurante"
      And O usuário preenche o campo "Nome" com "Jobson Burguer", "Endereço" com "Rua 123", "Horário de fechamento" com "1970-01-01T00:00:00.000Z" e "Tipo" com "Hamburgueria"
      And clica no botão "Salvar"
      Then o usuário deve ver o restaurante "Jobson Burguer" na lista de restaurantes
  
  Scenario: Atualização de um restaurante
      Given o usuário admin está na rota "restaurants/admin"
      And existe o restaurante de nome "Jobson Burguer"
      When o usuário clica no símbolo de editar restaurante do restaurante "Jobson Burguer"
      And o usuário atualiza o campo "Nome" para "Jobson Burguer Updated" 
      And clica no botão "Salvar"
      Then o usuário deve ver o restaurante atualizado com nome "Jobson Burguer Updated" na lista de restaurantes

  Scenario: Criação de um restaurante com nome já existente
      Given o usuário admin está na rota "restaurants/admin"
      And existe o restaurante de nome "Jobson Burguer"
      When o usuário clica no botão de criar restaurante "Criar restaurante"
      And O usuário preenche o campo "Nome" com "Jobson Burguer", "Endereço" com "Rua 123", "Horário de fechamento" com "1970-01-01T00:00:00.000Z" e "Tipo" com "Hamburgueria"
      Then o usuário deve receber uma mensagem de erro contendo "Nome de restaurante já utilizado"

  Scenario: Deleção de um restaurante
      Given o usuário admin está na rota "restaurants/admin"
      And existe o restaurante de nome "Jobson Burguer"
      When o usuário clica no símbolo de deletar restaurante com nome "Jobson Burguer"
      And o usuário clica no botão "Deletar" para deletar o restaurante
      Then o usuário não deve ver o restaurante de nome "Jobson Burguer" na lista de restaurantes

  Scenario: Criação de um restaurante com nome não preenchido
    Given o usuário admin está na rota "restaurants/admin"
    When o usuário clica no botão de criar restaurante "Criar restaurante"
    And O usuário preenche o campo "Endereço" com "Rua 123", "Horário de fechamento" com "1970-01-01T00:00:00.000Z" e "Tipo" com "Hamburgueria"
    And clica no botão "Salvar"
    Then o usuário deve receber uma indicação de erro contendo "Esse campo não pode estar vazio"