Cenários de Serviço:

Scenario: Tentar adicionar uma promoção com todos os campos obrigatórios preenchidos no banco de dados
    Given o banco de dados requisita os campos, categoria, data de início, data de término e desconto como obrigatórios
    And não há promoções ativas para a categoria "BLUSAS"
    When um usuário com id "2525" com perfil "ADMIN" envia uma requisição POST para a rota /promocoes com a categoria "BLUSAS", com data de início "01/01/2021", data de término "31/01/2021" e desconto "10%"
    Then o Status da resposta deve ser 201
    And a resposta deve conter o detalhe "Promotion successfully created"

Scenario: Tentar adicionar uma promoção sem informar todos os campos, categoria, obrigatórios no banco de dados
    Given o banco de dados requisita os campos, categoria, data de início, data de término e desconto como obrigatórios
    And não há promoções ativas para a categoria "BLUSAS"
    When um usuário com id "2525" com perfil "ADMIN" envia uma requisição POST para a rota /promocoes com a categoria "BLUSAS", com data de início "NULL", data de término "31/01/2021" e desconto "10%"
    Then o Status da resposta deve ser 400

Scenario: Tentar adicionar uma promoção com campos inválidos preenchidos no banco de dados.
    Given o banco de dados requisita os campos, categoria, data de início, data de término e desconto como obrigatórios
    And não há promoções ativas para a categoria "BLUSAS"
    When um usuário com id "2525" com perfil "ADMIN" envia uma requisição POST para a rota /promocoes com a categoria "BLUSAS", com data de início "31/01/2021", data de término "01/01/2021" e desconto "10%"
    Then o Status da resposta deve ser 400

Scenario: Tentar adicionar uma promoção em uma categoria que já está em promoção
    Given o banco de dados requisita os campos, categoria, data de início, data de término e desconto como obrigatórios
    And há uma promoção ativa para a categoria "BLUSAS"
    When um usuário com id "2525" com perfil "ADMIN" envia uma requisição POST para a rota /promocoes com a categoria "BLUSAS", com data de início "01/01/2021", data de término "31/01/2021" e desconto "10%"
    Then o Status da resposta deve ser 400
    And a resposta deve conter o detalhe "Category already in promotion"

