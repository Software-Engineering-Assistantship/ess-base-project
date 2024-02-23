Feature: Cadastro e manutenção de promoções

Scenario: Adicionar promoção
    Given o banco de dados requisita os campos, categoria, data de início, data de término e desconto como obrigatórios
    When um usuário envia uma requisição POST para a rota /promocoes com a categoria "BLUSAS", com data de início "01/01/2021", data de término "31/01/2021" e desconto "0,90"
    Then o Status da resposta deve ser 201

Scenario: Tentar adicionar uma promoção sem informar todos os campos obrigatórios
    Given o banco de dados requisita os campos, categoria, data de início, data de término e desconto como obrigatórios
    When um usuário envia uma requisição POST para a rota /promocoes com a categoria "BLUSAS", com data de início "31/01/2021" e desconto "0,90"
    Then o Status da resposta deve ser 400
    And o corpo da resposta deve conter a mensagem "Missing required fields"

Scenario: Listar promoções
    Given Eu tenho várias promoções cadastradas
    When Eu envio uma requisição GET para a rota /promocoes
    Then o status da resposta deve ser 200
    And o corpo da resposta deve conter as categorias em promoção

Scenario: Deletar promoção
    Given Eu tenho uma promoção cadastrada com id "1"
    When Eu envio uma requisição DELETE para a rota /promocoes/1
    Then o status da resposta deve ser 200
    And o item deve ter sido removido

