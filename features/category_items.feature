Description: Como usuário restaurante deve ser possível criar uma categoria com um nome ainda não utilizado e ver a categoria no cardápio após a confirmação.

Scenario (GUI): Adição um item a uma categoria existente
    Given que eu estou logado no sistema como restaurante  
    And existe uma categoria de item criada no cardápio
    And existe um item cadastrado no cardápio
    When eu acesso a funcionalidade de adição de item a uma categoria
    And eu escolho um item existente
    And eu clico em “Confirmar”
    Then eu vejo uma mensagem de sucesso e o cardápio atualizado com o item embaixo da categoria
    And eu posso acessar o item novo

Scenario (GUI): Visualizar as categorias de um restaurante
    Given que eu estou logado no sistema
    When eu acesso a funcionalidade de visualizar cardápio de um restaurante 
    Then eu vejo as categorias já criadas neste restaurante
    And os itens associados a aquela categoria


Scenario: Criar um novo item de categoria
    Given Que não existe um item de categoria com o nome "Entradas" já criado
    When Eu faço uma requisição POST para a rota “/categories” com nome “Entradas” e descrição “Aperitivos”
    Then Eu recebo uma resposta 201
    And A resposta JSON deve conter os dados do novo item de categoria

Scenario: Tentar criar um item de categoria com um nome já existente
    Given que já existe um item de categoria com o nome "Entradas" criado
    When Eu faço uma requisição POST para a rota “/categories” com nome “Entradas” e descrição “Aperitivos novos”
    Then Eu recebo uma resposta 400
    And A resposta JSON deve conter a mensagem “Category name already taken”

Scenario: Atualizar um item de categoria
    Given Um item de categoria existente com id “1”
    When Eu faço uma requisição PATCH para a rota “/categories/1” com a posição "3"
    Then Eu recebo uma resposta 200
    And A resposta JSON deve conter os dados do item de categoria atualizados com a nova posição

Scenario: Deletar um item de categoria existente
    Given Um item de categoria existente com id “1”
    When Eu faço uma requisição DELETE para a rota “/categories/1”
    Then Eu recebo uma resposta 200
    And A resposta JSON deve conter “Deleted item successfully”
