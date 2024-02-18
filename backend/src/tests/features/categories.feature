Feature: Cadastro e manutenção das Categorias de Itens

Scenario: Criar Categoria
    Given   a API solicita os argumentos Nome como obrigatório e Descrição como opcional para a criação da categoria
    When    envio uma requisição POST para a rota /categories com nome "Blusa" e a descrição "blabla"
    Then    o status da resposta deve ser 201

Scenario: Criar categoria que ja existe
    Given   a API solicita os argumentos Nome como obrigatório e Descrição como opcional para a criação da categoria
    When    envio uma requisição POST para a rota /categories com nome "Vestido" 
    Then    o status da resposta deve ser 400
    And     o corpo da resposta deve conter a mensagem "Categorie already exists"

Scenario: Remover Categoria
    Given   Eu tenho uma categoria com id "1" cadastrado
    When    Eu envio uma requisição DELETE para a rota /categories/1
    Then    o status da resposta deve ser 200
    And     o corpo da resposta deve conter a mensagem "Categorie deleted"

Scenario: Atualizar Categoria
    Given   a API solicita os argumentos Nome e Descrição como opcionais para a atualização da Categoria 
    When    Eu envio uma requisição PATCH para a rota /itens/1 com a Descrição "bla"
    Then    o status da resposta deve ser 200 
    And     a Categoria deve ter sido "Categorie updated"

Scenario: Listar Itens
    Given Eu tenho uma Categoria com id "1" cadastrado
    When Eu envio uma requisição GET para a rota /categories
    Then o status da resposta deve ser 200
    And o corpo da resposta deve conter a categoria com o id "1"