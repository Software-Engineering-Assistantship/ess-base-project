Cenários de Serviço:

Scenario: Tentar adicionar uma promoção com todos os campos obrigatório preenchidos no banco de dados
    Given o banco de dados requisita os campos, categoria, data de início, data de término e desconto como obrigatórios
    When um usuário com id "2525" com perfil "ADMIN" envia uma requisição POST para a rota /promocoes com a categoria "BLUSAS", com data de início "01/01/2021", data de término "31/01/2021" e desconto "10%"
    Then o Status da resposta deve ser 201
    And a resposta deve conter o detalhe "Promotion successfully created"

Scenario: Tentar adicionar uma promoção sem informar todos os campos, categoria, obrigatórios no banco de dados
    Given o banco de dados requisita os campos, categoria, data de início, data de término e desconto como obrigatórios
    When um usuário com id "2525" com perfil "ADMIN" envia uma requisição POST para a rota /promocoes com a categoria "BLUSAS", com data de início "01/01/2021", data de término "31/01/2021" e desconto "10%"
    Then o Status da resposta deve ser 400

Scenario: Tentar adicionar uma promoção com campos inválidos preenchidos no banco de dados.
    Given o banco de dados requisita os campos, categoria, data de início, data de término e desconto como obrigatórios
    When um usuário com id "2525" com perfil "ADMIN" envia uma requisição POST para a rota /promocoes com a categoria "BLUSAS", com data de início "31/01/2021", data de término "01/01/2021" e desconto "10%"
    Then o Status da resposta deve ser 400

Scenario: Tentar adicionar uma promoção em uma categoria que já está em promoção
    Given o banco de dados requisita os campos, categoria, data de início, data de término e desconto como obrigatórios
    When um usuário com id "2525" com perfil "ADMIN" envia uma requisição POST para a rota /promocoes com a categoria "BLUSAS", com data de início "01/01/2021", data de término "31/01/2021" e desconto "10%"
    Then o Status da resposta deve ser 400

Scenario: Tentar adicionar uma cupom com todos os campos obrigatório preenchidos no banco de dados
    Given o banco de dados requisita os campos código, data de início, data de término e desconto como obrigatórios
    When um usuário com id "2525" com perfil "ADMIN" envia uma requisição POST para a rota /cupons com código "CUPOM10", data de início "01/01/2021", data de término "31/01/2021" e desconto "10%"
    Then o Status da resposta deve ser 201
    And a resposta deve conter o detalhe "Coupon successfully created"

Scenario: Tentar adicionar uma cupom sem informar todos os campos obrigatórios no banco de dados
    Given o banco de dados requisita os campos código, data de início, data de término e desconto como obrigatórios
    When um usuário com id "2525" com perfil "ADMIN" envia uma requisição POST para a rota /cupons com código "CUPOM10", data de início "01/01/2021", data de término "31/01/2021" e desconto "10%"
    Then o Status da resposta deve ser 400

Scenario: Tentar adicionar uma cupom com campos inválidos preenchidos no banco de dados.
    Given o banco de dados requisita os campos código, data de início, data de término e desconto como obrigatórios
    When um usuário com id "2525" com perfil "ADMIN" envia uma requisição POST para a rota /cupons com código "CUPOM10", data de início "31/01/2021", data de término "01/01/2021" e desconto "10%"
    Then o Status da resposta deve ser 400

Scenario: Tentar adicionar uma cupom com código já existente no banco de dados.
    Given o banco de dados requisita os campos código, data de início, data de término e desconto como obrigatórios
    When um usuário com id "2525" com perfil "ADMIN" envia uma requisição POST para a rota /cupons com código "CUPOM10", data de início "01/01/2021", data de término "31/01/2021" e desconto "10%"
    Then o Status da resposta deve ser 400

Scenario: Tentar utilizar um cupom já existente no banco de dados.
    Given o banco de dados requisita os campos código, nome do cupom, CUPOM10, como obrigatórios
    When um usuário com id "2525" com perfil "USER" envia uma requisição GET para a rota /cupons/:id com código "CUPOM10"
    Then o Status da resposta deve ser 200

Scenario: Tentar utilizar um cupom inexistente no banco de dados.
    Given o banco de dados requisita os campos código, nome do cupom, CUPOM10, como obrigatórios
    When um usuário com id "2525" com perfil "USER" envia uma requisição GET para a rota /cupons/:id com código "CUPOM10"
    Then o Status da resposta deve ser 404

Scenario: Tentar utilizar um cupom com data expirada.
    Given o banco de dados requisita os campos código, nome do cupom, CUPOM10, como obrigatórios
    When um usuário com id "2525" com perfil "USER" envia uma requisição GET para a rota /cupons/:id com código "CUPOM10"
    Then o Status da resposta deve ser 400

Scenario: Auto deleção de cupons após data de expiração.
    Given o banco de dados tem um cupom, CUPOM10, com data de expiração "01/01/2021"
    When o cupom com id "2525" sofre uma requisição DELETE automática/programada para a rota /cupons/:id com código "CUPOM10"
    Then o Status da resposta deve ser 200
