Feature: Cadastro e manutenção de itens no menu

Scenario: Criar item
    Given a API solicita os argumentos nome, quantidade, descrição, preço, imagem, cores, tamanhos, categoria como obrigatórios para a criação do item 
    When envio uma requisição POST para a rota /itens com nome "Blusa Florida", quantidade "13", descrição "Blusa em Algodão", preço "50,00", imagem "link.com", cores "Azul, Rosa, Branco", tamanhos "P, M, G", categoria "Blusa"
    Then o status da resposta deve ser 201

Scenario: Remover Item
    Given Eu tenho um item com id "1" cadastrado
    When Eu envio uma requisição DELETE para a rota /itens/1
    Then o status da resposta deve ser 200
    And o item deve ter sido removido

Scenario: Atualizar item
    Given a API solicita os argumentos nome, quantidade, descrição, preço, imagem, cores, tamanhos, categoria como opcionais para a atualização do item 
    When  Eu envio uma requisição PATCH para a rota /itens/1 com quantidade "10"
    Then o status da resposta deve ser 200 
    And o item deve ter sido atualizado

Scenario: Listar Itens
    Given Eu tenho um item com id "1" cadastrado
    When Eu envio uma requisição GET para a rota /itens
    Then o status da resposta deve ser 200
    And o corpo da resposta deve conter o item com id "1"

Scenario: Tentar adicionar um item ao menu geral sem informar todos os campos obrigatórios no banco de dados
    Given a API solicita os argumentos nome, quantidade, descrição, preço, imagem, cores, tamanhos, categoria como obrigatórios para a criação do item 
    When envio uma requisição POST para a rota /itens com nome "Blusa Xadrez", quantidade "18", descrição "Blusa em Algodão" e imagem "link.com"
    Then o status da resposta deve ser 400
    And o corpo da resposta deve conter a mensagem "Missing required fields"