Feature: Cadastro e manutenção de cupons

Scenario: Adicionar cupom
    Given o banco de dados requisita os campos código, data de início, data de término e desconto como obrigatórios
    When um usuário envia uma requisição POST para a rota /cupons com código "CUPOM10", data de início "01/01/2021", data de término "31/01/2021" e desconto "0,90"
    Then o Status da resposta deve ser 201

Scenario: Tentar adicionar uma cupom sem informar todos os campos obrigatórios no banco de dados
    Given o banco de dados requisita os campos código, data de início, data de término e desconto como obrigatórios
    When um usuário envia uma requisição POST para a rota /cupons com código "CUPOM10", data de início "01/01/2021"
    Then o Status da resposta deve ser 400

Scenario: Listar cupons
    Given eu tenho vários cupons cadastrados no banco de dados
    When um usuário envia uma requisição GET para a rota /cupons
    Then o Status da resposta deve ser 200
    And a resposta deve conter a lista de cupons





