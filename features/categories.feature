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

Scenario: Criar um nova categoria
    Given Que não existe uma categoria com o nome "Entradas" já criado para o restaurante de id "1"
    When Eu faço uma requisição POST para a rota “/categories” com nome “Entradas”, descrição “Aperitivos” e restaurante "1"
    Then Eu recebo uma resposta 201
    And A resposta JSON deve conter os dados da nova categoria

Scenario: Tentar criar uma categoria com um nome já existente
    Given que já existe uma categoria com o nome "Entradas" criado para o restaurante de id "1"
    When Eu faço uma requisição POST para a rota “/categories” com nome “Entradas”, descrição “Aperitivos novos” e restaurante "1"
    Then Eu recebo uma resposta 400
    And A resposta JSON deve conter a mensagem “Category name already taken”

Scenario: Buscar uma categoria existente
    Given Uma categoria existente com id “1”
    When Eu faço uma requisição GET para a rota “/categories/1”
    Then Eu recebo uma resposta 200
    And A resposta JSON deve conter os dados da categoria de id "1"

Scenario: Buscar todas categorias de um restaurante
    Given Um restaurante existente de id "1"
    When Eu faço uma requisição GET para a rota “/categories/restaurante/1”
    Then Eu recebo uma resposta 200
    And A resposta JSON deve conter todas as categories daquele restaurante e seus dados
    
Scenario: Atualizar uma categoria
    Given Uma categoria existente com id “1”
    When Eu faço uma requisição PATCH para a rota “/categories/1” com a posição "3"
    Then Eu recebo uma resposta 200
    And A resposta JSON deve conter os dados doa categoria atualizados com a nova posição

Scenario: Deletar uma categoria existente
    Given Uma categoria existente com id “1”
    When Eu faço uma requisição DELETE para a rota “/categories/1”
    Then Eu recebo uma resposta 200
    And A resposta JSON deve conter “Deleted item successfully”
