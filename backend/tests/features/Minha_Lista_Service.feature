Feature: Serviço de gerenciamento de listas

  As um serviço de gerenciamento de listas
  Eu quero permitir a criação, edição e remoção de listas e itens

  Scenario: Criar lista
    Given o serviço recebe uma requisição para criar a lista "Favoritos" do usuário "José"
    When o serviço processa a requisição
    Then o serviço retorna um status 201
    And a lista "Favoritos" é criada com sucesso

  Scenario: Falha ao criar lista duplicada
    Given o serviço recebe uma requisição para criar a lista "Favoritos" do usuário "José"
    And a lista "Favoritos" já existe
    When o serviço processa a requisição
    Then o serviço retorna um status 409
    And uma mensagem de erro "Lista já existente" é retornada

  Scenario: Deletar lista
    Given o serviço recebe uma requisição para deletar a lista "Favoritos" do usuário "José"
    And a lista "Favoritos" existe
    When o serviço processa a requisição
    Then o serviço retorna um status 200
    And a lista "Favoritos" é removida com sucesso

  Scenario: Adicionar item na lista
    Given o serviço recebe uma requisição para adicionar o item "The Batman" na lista "Favoritos" do usuário "José"
    And o item "The Batman" não está na lista
    When o serviço processa a requisição
    Then o serviço retorna um status 201
    And o item "The Batman" é adicionado com sucesso

  Scenario: Falha ao adicionar item duplicado na lista
    Given o serviço recebe uma requisição para adicionar o item "The Batman" na lista "Favoritos" do usuário "José"
    And o item "The Batman" já está na lista
    When o serviço processa a requisição
    Then o serviço retorna um status 409
    And uma mensagem de erro "Item já existente na lista" é retornada

  Scenario: Remover item da lista
    Given o serviço recebe uma requisição para remover o item "The Batman" da lista "Favoritos" do usuário "José"
    And o item "The Batman" existe na lista
    When o serviço processa a requisição
    Then o serviço retorna um status 200
    And o item "The Batman" é removido com sucesso