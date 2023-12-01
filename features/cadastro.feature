Feature: Cadastro e manutenção de itens no menu

Scenario: Tentar adicionar um item ao menu geral sem informar todos os campos obrigatórios no banco de dados
    Given um usuário com id "2525" envia uma requisição POST para a rota /itens com nome "aaa", quantidade "13", descrição "Alimentação" e imagem "link.com"
    And o banco de dados requisita os campos nome, quantidade, descrição, preço, e imagem como obrigatórios
    When a Requisição é enviada para a rota /itens com nome "aaa”, com quantidade "13" e descrição "Alimentação"
    And o campo preço não foi especificado
    Then o Status da resposta deve ser 400
    And a resposta deve conter o detalhe "Missing required fields"