Feature: Cadastro e manutenção de itens no menu

Scenario: Tentar adicionar um item ao menu geral sem informar todos os campos obrigatórios no banco de dados
    Given um usuário com id "2525" com perfil "ADMIN" envia uma requisição POST para a rota /itens com nome "aaa", quantidade "13", descrição "Blusa florida" e imagem "link.com"
    And o banco de dados requisita os campos nome, quantidade, descrição, preço, imagem, cores, tamanhos, categoria e subcategoria como obrigatórios
    When a Requisição é enviada para a rota /itens com nome "aaa”, com quantidade "13" e descrição "Alimentação"
    And os campos preço, categoria e subcategoria não foram especificado
    Then o Status da resposta deve ser 400
    And a resposta deve conter o detalhe "Missing required fields"

Scenario: Adicionar um item ao menu geral com todos os campos obrigatórios
    Given um usuário com id "2525" com perfil "ADMIN" envia uma requisição POST para a rota /itens com nome "aaa", quantidade "13", descrição "aaaa", preço "10.80", imagem "link.com", cores: "rosa, azul, preto", tamanhos: "P, M, G", "categoria "Alimentação" e subcategoria "Bebidas"
    And não existe outro item com nome “aaa” previamente cadastrado no banco de dados
    And o banco de dados requisita os campos nome, quantidade, descrição, preço, imagem, cores, tamanhos, categoria e subcategoria como obrigatórios
    When a Requisição é enviada para a rota /itens com nome"aaa", quantidade "13", descrição "aaaa", preço "10.80", imagem "link.com", cores: "rosa, azul, preto", tamanhos: "P, M, G", categoria "Alimentação" e subcategoria "Bebidas"
    Then o Status da resposta deve ser 201 
    And o item recebe o id gerado pelo banco de dados
    And a resposta deve conter o detalhe "Item successfully created"

Scenario: Remover um item do banco de dados
    Given um usuário com id "2525" com perfil "ADMIN" envia uma requisição DELETE para a rota /itens com nome "aaa" e categoria "Blusa Feminina"
    And o banco de dados requisita os campos nome e categoria como obrigatórios
    And o item com nome “aaa” está previamente cadastrado no banco de dados
    When a requisição DELETE é enviada para a rota /itens com nome "aaa" e categoria "Blusa Feminina"
    Then o Status da resposta deve ser 200
    And a resposta deve conter a mensagem "Item successfully deleted"

Scenario: Remover um item do banco de dados sem informar todos os campos obrigatorios no banco de dados
    Given um usuário com id "2525" com perfil "ADMIN" envia uma requisição DELETE para a rota /itens com nome "aaa"
    And o banco de dados requisita os campos nome e categoria como obrigatórios
    And o item com nome “aaa” está previamente cadastrado no banco de dados
    When a requisição DELETE é enviada para a rota /itens com nome "aaa"
    Then o Status da resposta deve ser 400
    And a resposta deve conter a mensagem "Missing required fields"

Scenario: Atualizar um item do banco de dados
    Given um usuário com id "2525" com perfil "ADMIN" envia uma requisição PATCH para a rota /itens/1345 com quantidade "16"
    And o banco de dados possui os campos nome, quantidade, descrição, preço, imagem, cores, tamanhos, categoria e subcategoria como opcionais para a requisição PATCH
    And o item com id 1345 está previamente cadastrado no banco de dados
    When a requisição PATCH é enviada para a rota /itens/1345 com nome quantidade "16"
    Then o Status da resposta deve ser 200
    And a quantidade do item com id 1345 é atualizada para "16"
    And a resposta deve conter a mensagem "Item successfully updated"

Scenario: Atualizar um item inexistente do banco de dados 
    Given um usuário com id "2525" com perfil "ADMIN" envia uma requisição PATCH para a rota /itens/1345 com quantidade "16"
    And o banco de dados possui os campos nome, quantidade, descrição, preço, imagem, cores, tamanhos, categoria e subcategoria como opcionais para a requisição PATCH
    And o item com id 1345 não está previamente cadastrado no banco de dados
    When a requisição PATCH é enviada para a rota /itens/1345 com nome quantidade "16"
    Then o Status da resposta deve ser 404
    And a resposta deve conter a mensagem "Item not found"

Scenario: Remover um Item do Menu
    Given que um usuário com permissões de administrador está na página “administração” do menu
    And o item "ccc" está presente no menu
    When o usuário seleciona a opção "Remover"
    Then o usuário preenche os campos obrigatórios da remoção, que incluem nome ("ccc") e categoria ("Calça Jeans Feminina")
    And o usuário confirma a exclusão ao clicar no botão "Remover"
    Then o sistema exibe uma mensagem indicando que o item "ccc" foi removido com sucesso do menu
    And o item não está mais visível na lista de itens disponíveis
    Then o item "ccc" não faz mais parte do menu

Scenario: Exibição de Todos os Itens do Menu
    Given um usuário com permissões de administrador está na sessão de visualização da página “administração” do menu
    And existem vários itens cadastrados no menu, incluindo "aaa", "bbb", "ccc", entre outros
    When o usuário acessa a seção de visualização “itens”
    Then o sistema exibe uma lista completa e detalhada de todos os itens disponíveis, divididos por categoria, incluindo nome, imagem, quantidade e preço de cada item

Scenario: Atualizar Detalhes de um Item Existente no Menu
    Given que um usuário com permissões de administrador está na página “administração” do menu
    And o item "bbb" está presente no menu com o preço atual de "$1.50"
    When o usuário busca e seleciona a opção "editar" do item "bbb" na lista de itens
    And uma nova tela de edição é aberta para o item "bbb"
    And o usuário seleciona a opção "Editar informações"
    And o usuário edita o campo preço para "$2.00"
    And o usuário seleciona a opção "Salvar alterações"
    Then o sistema exibe uma mensagem de confirmação "Item alterado" indicando que as alterações foram salvas com sucesso
    And o preço do item "bbb" é atualizado para "$2.00" na lista de itens do menu.

