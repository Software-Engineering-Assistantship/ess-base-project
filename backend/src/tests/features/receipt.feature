Feature: Emissão de comprovante do pedido

Scenario: Criar comprovante
    Given a API solicita os argumentos nome, produto, quantidade, preço como obrigatórios para a criação do item 
    When envio uma requisição POST para a rota /receipt com nome "João Motta", produto "Blusa Azul" quantidade "3", preço "50,00"
    Then o status da resposta deve ser "201"

Scenario: Remover comprovante
    Given Eu tenho um comprovante com id "1" cadastrado
    When Eu envio uma requisição DELETE para a rota /receipt/1
    Then o status da resposta deve ser "200"
    And o comprovante deve ter sido removido

Scenario: Listar comprovantes
    Given Eu tenho um comprovante com id "1" cadastrado
    When Eu envio uma requisição GET para a rota /receipt/1
    Then o status da resposta deve ser "200"
    And o corpo da resposta deve conter o comprovante com id "1"

Scenario: Tentar adicionar um comprovante ao menu geral sem informar todos os campos obrigatórios no banco de dados
    Given a API solicita os argumentos nome, produto, quantidade, preço como obrigatórios para a criação do item 
    When envio uma requisição POST para a rota /receipt com nome "João Motta" e produto "Blusa Azul"
    Then o status da resposta deve ser "400"
    And o corpo da resposta deve conter a mensagem "Missing required fields"