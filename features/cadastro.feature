Feature: Cadastro e manutenção de itens no menu

Scenario: Tentar adicionar um item ao menu geral sem informar todos os campos obrigatórios no banco de dados
    Given um usuário com id "2525" envia uma requisição POST para a rota /itens com nome "aaa", quantidade "13", descrição "Alimentação" e imagem "link.com"
    And o banco de dados requisita os campos nome, quantidade, descrição, preço, e imagem como obrigatórios
    When a Requisição é enviada para a rota /itens com nome "aaa”, com quantidade "13" e descrição "Alimentação"
    And o campo preço não foi especificado
    Then o Status da resposta deve ser 400
    And a resposta deve conter o detalhe "Missing required fields"

Scenario: Adicionar um item ao menu geral com todos os campos obrigatórios
    Given um usuário com id "2525" envia uma requisição POST para a rota /itens com nome "aaa", quantidade "13", descrição "Alimentação", preço "10.80" e imagem "link.com"
    And não existe outro item com nome “aaa” previamente cadastrado no banco de dados
    And o banco de dados requisita os campos nome, quantidade, descrição, preço, e imagem como obrigatórios
    When a Requisição é enviada para a rota /itens com nome"aaa", quantidade "13", descrição "Alimentação", preço "10.80" e imagem "link.com"
    Then o Status da resposta deve ser 201 
    And o item recebe o id gerado pelo banco de dados
    And a resposta deve conter o detalhe "Item successfully created"

Scenario: Remover um Item do Menu
    Given que um usuário com permissões de administrador está na página “administração” do menu
    And o item "ccc" está presente no menu
    When o usuário seleciona a opção "Remover"
    Then o usuário preenche os campos obrigatórios da remoção, que incluem nome ("ccc") e quantidade ("1")
    And o usuário confirma a exclusão ao clicar no botão "Remover"
    Then o sistema exibe uma mensagem indicando que o item "ccc" foi removido com sucesso do menu
    And o item não está mais visível na lista de itens disponíveis.

