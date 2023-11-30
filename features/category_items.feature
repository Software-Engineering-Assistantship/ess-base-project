Description: Como usuário restaurante deve ser possível criar uma categoria com um nome ainda não utilizado e ver a categoria no cardápio após a confirmação.

Scenario: Criar uma categoria de item no cardápio

    Given que eu estou logado no sistema como restaurante  
    When eu faço uma requisição POST para a rota “/item-category” com o nome da categoria que desejo criar que ainda não foi utilizado
    Then eu recebo uma resposta 201 com a mensagem “Category created”
    And a categoria é registrada no banco de dados

Scenario: Criar uma categoria de item no cardápio com um nome já utilizado

    Given que eu estou logado no sistema como restaurante  
    When eu faço uma requisição POST para a rota “/item-category” com o nome já utilizado de uma categoria
    Then eu recebo uma resposta 400 com a mensagem “Bad Request”
    And a categoria é não registrada no banco de dados

Scenario: Criar uma categoria de item no cardápio com um nome já utilizado:

    Given que eu estou logado no sistema como restaurante  
    When eu faço uma requisição POST para a rota “/item-category” com o nome já utilizado de uma categoria
    Then eu recebo uma resposta 400 com a mensagem “Bad Request”
    And a categoria é não registrada no banco de dados

Scenario (GUI): Adição um item a uma categoria existente
    Given que eu estou logado no sistema como restaurante  
    And existe uma categoria de item criada no cardápio
    And existe um item cadastrado no cardápio
    When eu acesso a funcionalidade de adição de item a uma categoria
    And eu escolho um item existente
    And eu clico em “Confirmar”
    Then eu vejo uma mensagem de sucesso e o cardápio atualizado com o item embaixo da categoria
