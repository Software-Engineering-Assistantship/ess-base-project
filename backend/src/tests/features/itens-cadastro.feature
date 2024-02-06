Feature: Cadastro e manutenção de itens no menu

Scenario: Criar Item
    Given I don't have any item with name "Blue Jeans"
    When I insert a item with: name "Blue Jeans", price 100.00, category "Calça", description "Calça jeans azul", image "jeans.jpg", colors "Azul", sizes "P, M, G", amount 10
    Then I should have a item with name "Blue Jeans"
    And I should have this item with id "1"

Scenario: Tentar adicionar um item ao menu geral sem informar todos os campos obrigatórios no banco de dados
    Given um usuário com id "2525" com perfil "ADMIN" envia uma requisição POST para a rota /itens com nome "Blusa Florida", quantidade "13", descrição "Blusa em Algodão" e imagem "link.com"
    When a Requisição é enviada para a rota /itens com nome "Blusa Florida”, com quantidade "13" e descrição "Blusas"
    Then o Status da resposta deve ser 400
    And a resposta deve conter o detalhe "Missing required fields"

Scenario: Adicionar um item ao menu geral com todos os campos obrigatórios
    Given um usuário com id "2525" com perfil "ADMIN" envia uma requisição POST para a rota /itens com nome "Blusa Florida", quantidade "13", descrição "Blusa em Algodão", preço "10.80", imagem "link.com", cores: "rosa, azul, preto", tamanhos: "P, M, G" e "categoria "Blusas" 
    And não existe outro item com nome “Blusa Florida” previamente cadastrado no banco de dados
    When a Requisição é enviada para a rota /itens com nome "Blusa Florida", quantidade "13", descrição "Blusa em Algodão", preço "10.80", imagem "link.com", cores: "rosa, azul, preto", tamanhos: "P, M, G" e categoria "Blusas"
    Then o Status da resposta deve ser 201 
    And a resposta deve conter o detalhe "Item successfully created"

Scenario: Remover um item do banco de dados
    Given um usuário com id "2525" com perfil "ADMIN" envia uma requisição DELETE para a rota /itens com o id "1345"
    And o item com id "1345" está previamente cadastrado no banco de dados
    When a requisição DELETE é enviada para a rota /itens com o id "1345"
    Then o Status da resposta deve ser 200
    And a resposta deve conter a mensagem "Item successfully deleted"

Scenario: Atualizar um item do banco de dados
    Given um usuário com id "2525" com perfil "ADMIN" envia uma requisição PATCH para a rota /itens/1345 com quantidade "16"
    And o item com id 1345 está previamente cadastrado no banco de dados
    When a requisição PATCH é enviada para a rota /itens/1345 com nome quantidade "16"
    Then o Status da resposta deve ser 200
    And a quantidade do item com id 1345 é atualizada para "10"
    And a resposta deve conter a mensagem "Item successfully updated"

Scenario: Atualizar um item inexistente do banco de dados 
    Given um usuário com id "2525" com perfil "ADMIN" envia uma requisição PATCH para a rota /itens/1345 com quantidade "16"
    And o item com id 1345 não está previamente cadastrado no banco de dados
    When a requisição PATCH é enviada para a rota /itens/1345 com nome quantidade "10"
    Then o Status da resposta deve ser 404
    And a resposta deve conter a mensagem "Item not found"


