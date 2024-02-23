Cenários de Serviço:

Scenario: Tentar adicionar uma promoção com todos os campos obrigatório preenchidos no banco de dados
    Given o banco de dados requisita os campos data de início, data de término e desconto como obrigatórios
    When um usuário com id "2525" com perfil "ADMIN" envia uma requisição POST para a rota /promocoes com data de início "01/01/2021", data de término "31/01/2021" e desconto "10%"
    Then o Status da resposta deve ser 201
    And a resposta deve conter o detalhe "Promotion successfully created"

Scenario: Tentar adicionar uma promoção sem informar todos os campos obrigatórios no banco de dados
    Given o banco de dados requisita os campos data de início, data de término e desconto como obrigatórios
    When um usuário com id "2525" com perfil "ADMIN" envia uma requisição POST para a rota /promocoes com data de início "01/01/2021", data de término "31/01/2021" e desconto "10%"
    Then o Status da resposta deve ser 400

Scenario: Tentar adicionar uma promoção com campos inválidos preenchidos no banco de dados.
    Given o banco de dados requisita os campos data de início, data de término e desconto como obrigatórios
    When um usuário com id "2525" com perfil "ADMIN" envia uma requisição POST para a rota /promocoes com data de início "31/01/2021", data de término "01/01/2021" e desconto "10%"
    Then o Status da resposta deve ser 400

Scenario: Tentar adicionar uma promoção em uma categoria que já está em promoção
    Given o banco de dados requisita os campos data de início, data de término e desconto como obrigatórios
    When um usuário com id "2525" com perfil "ADMIN" envia uma requisição POST para a rota /promocoes com data de início "01/01/2021", data de término "31/01/2021" e desconto "10%"
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

Cenários de Interface:

Scenario: Notificação de Entrega Realizada para Empresa de Logística
	Given que a empresa de logística "CIntrega" está logada no sistema
	And existe uma entrega de título “Livro” com o campo status “Em deslocamento”
	When a entrega é marcada com status “Realizada”
	And é digitado, no campo de data de entrega, “24/11/2023”
	Then a empresa de logística recebe uma notificação informando a mudança de status
	And a empresa de logística pode acessar as informações de título “Livro”, endereço “Avenida José Aníbal Fernandes, S/N, Recife-PE”, prazo “27/11/2023”, data de entrega “24/11/2023”, pessoa que recebeu “Maria Clara”, entregador “Ricardo” e status “Realizada”

Scenario: Atualizar Detalhes de um Item Existente no Menu
    Given que um usuário com permissões de administrador está na página “administração” do menu
    And o item "bbb" está presente no menu com o preço atual de $1.50
    When o usuário busca e seleciona o item "bbb" na lista de itens
    And uma nova tela de edição é aberta para o item "bbb"
    And o usuário seleciona a opção "Editar informações"
    And o usuário edita o preço para $2.00
    And o usuário seleciona a opção "Salvar alterações"
    Then o sistema exibe uma mensagem de confirmação indicando que as alterações foram salvas com sucesso
    And o preço do item "bbb" é atualizado para $2.00 na lista de itens do menu.

Scenario: Cadastro de uma promoção em uma categoria de produto sem promoção prévia
    Given que um usuário com permissões de administrador está na página “administração” do menu
    And a categoria "Bebidas" está presente na lista de categorias
    And a categoria "Bebidas" não possui nenhuma promoção cadastrada
    When o usuário seleciona a opção "Adicionar promoção" para a categoria "Bebidas"
    And o usuário preenche o campo "Data de início" com "01/01/2021"
    And o usuário preenche o campo "Data de término" com "31/01/2021"
    And o usuário preenche o campo "Desconto" com "10%"
    And o usuário seleciona a opção "Salvar"
    Then o sistema exibe uma mensagem de confirmação indicando que a promoção foi cadastrada com sucesso
    And a promoção "Promoção de bebidas" é exibida na lista de promoções da categoria "Bebidas"

Scenario: Cadastro de uma promoção em uma categoria de produto com promoção prévia
    Given que um usuário com permissões de administrador está na página “administração” do menu
    And a categoria "Bebidas" está presente na lista de categorias
    And a categoria "Bebidas" possui uma promoção cadastrada
    When o usuário seleciona a opção "Adicionar promoção" para a categoria "Bebidas"
    And o usuário preenche o campo "Data de início" com "01/01/2021"
    And o usuário preenche o campo "Data de término" com "31/01/2021"
    And o usuário preenche o campo "Desconto" com "10%"
    And o usuário seleciona a opção "Salvar"
    Then o sistema exibe uma mensagem de erro indicando que a categoria "Bebidas" já possui uma promoção cadastrada

Scenario: Cadastro de uma promoção em uma categoria de produto com data de início posterior à data de término
    Given que um usuário com permissões de administrador está na página “administração” do menu
    And a categoria "Bebidas" está presente na lista de categorias
    And a categoria "Bebidas" não possui nenhuma promoção cadastrada
    When o usuário seleciona a opção "Adicionar promoção" para a categoria "Bebidas"
    And o usuário preenche o campo "Data de início" com "31/01/2021"
    And o usuário preenche o campo "Data de término" com "01/01/2021"
    And o usuário preenche o campo "Desconto" com "10%"
    And o usuário seleciona a opção "Salvar"
    Then o sistema exibe uma mensagem de erro indicando que a data de início deve ser anterior à data de término

Scenario: Cadastro de uma promoção em uma categoria de produto com data de início anterior à data atual
    Given que um usuário com permissões de administrador está na página “administração” do menu
    And a categoria "Bebidas" está presente na lista de categorias
    And a categoria "Bebidas" não possui nenhuma promoção cadastrada
    When o usuário seleciona a opção "Adicionar promoção" para a categoria "Bebidas"
    And o usuário preenche o campo "Data de início" com "01/01/2020"
    And o usuário preenche o campo "Data de término" com "31/01/2020"
    And o usuário preenche o campo "Desconto" com "10%"
    And o usuário seleciona a opção "Salvar"
    Then o sistema exibe uma mensagem de erro indicando que a data de início deve ser posterior à data atual

Scenario: Cadastro de uma promoção em uma categoria de produto com data de término anterior à data atual
    Given que um usuário com permissões de administrador está na página “administração” do menu
    And a categoria "Bebidas" está presente na lista de categorias
    And a categoria "Bebidas" não possui nenhuma promoção cadastrada
    When o usuário seleciona a opção "Adicionar promoção" para a categoria "Bebidas"
    And o usuário preenche o campo "Data de início" com "01/01/2021"
    And o usuário preenche o campo "Data de término" com "31/01/2021"
    And o usuário preenche o campo "Desconto" com "10%"
    And o usuário seleciona a opção "Salvar"
    Then o sistema exibe uma mensagem de erro indicando que a data de término deve ser posterior à data atual

Scenario: Cadastro de uma promoção em uma categoria de produto com desconto inválido
    Given que um usuário com permissões de administrador está na página “administração” do menu
    And a categoria "Bebidas" está presente na lista de categorias
    And a categoria "Bebidas" não possui nenhuma promoção cadastrada
    When o usuário seleciona a opção "Adicionar promoção" para a categoria "Bebidas"
    And o usuário preenche o campo "Data de início" com "01/01/2021"
    And o usuário preenche o campo "Data de término" com "31/01/2021"
    And o usuário preenche o campo "Desconto" com "101%"
    And o usuário seleciona a opção "Salvar"
    Then o sistema exibe uma mensagem de erro indicando que o desconto deve ser um valor entre 0% e 100%

Scenario: Remoção de uma promoção em uma categoria de produto
    Given que um usuário com permissões de administrador está na página “administração” do menu
    And a categoria "Bebidas" está presente na lista de categorias
    And a categoria "Bebidas" possui uma promoção cadastrada
    When o usuário seleciona a opção "Remover promoção" para a categoria "Bebidas"
    Then o sistema exibe uma mensagem de confirmação indicando que a promoção foi removida com sucesso
    And a categoria "Bebidas" não possui nenhuma promoção cadastrada

Scenario: Usuário aplica cupom no final da compra
    Given que um usuário está na página de finalização de compra
    And o usuário possui um cupom de desconto
    When o usuário seleciona a opção "Aplicar cupom"
    And o usuário preenche o campo "Cupom" com "CUPOM10"
    And o usuário seleciona a opção "Aplicar"
    Then o sistema exibe uma mensagem de confirmação indicando que o cupom foi aplicado com sucesso
    And o sistema exibe o valor total da compra com o desconto aplicado

Scenario: Usuário aplica cupom inválido no final da compra
    Given que um usuário está na página de finalização de compra
    And o usuário possui um cupom de desconto
    When o usuário seleciona a opção "Aplicar cupom"
    And o usuário preenche o campo "Cupom" com "CUPOM10"
    And o usuário seleciona a opção "Aplicar"
    Then o sistema exibe uma mensagem de erro indicando que o cupom é inválido

Scenario: Usuário aplica cupom expirado no final da compra
    Given que um usuário está na página de finalização de compra
    And o usuário possui um cupom de desconto
    When o usuário seleciona a opção "Aplicar cupom"
    And o usuário preenche o campo "Cupom" com "CUPOM10"
    And o usuário seleciona a opção "Aplicar"
    Then o sistema exibe uma mensagem de erro indicando que o cupom está expirado

Scenario: Cadastro de um cupom de desconto
    Given que um usuário com permissões de administrador está na página “administração” do menu
    And o cupom "CUPOM10" não está presente na lista de cupons
    When o usuário seleciona a opção "Adicionar cupom"
    And o usuário preenche o campo "Código" com "CUPOM10"
    And o usuário preenche o campo "Data de início" com "01/01/2021"
    And o usuário preenche o campo "Data de término" com "31/01/2021"
    And o usuário preenche o campo "Desconto" com "10%"
    And o usuário seleciona a opção "Salvar"
    Then o sistema exibe a mensagem de confirmação "cupom cadastrado com sucesso"
    And o cupom "CUPOM10" é exibido na lista de cupons

Scenario: Cadastro de um cupom de desconto com código já existente
    Given que um usuário com permissões de administrador está na página “administração” do menu
    And o cupom "CUPOM10" está presente na lista de cupons
    When o usuário seleciona a opção "Adicionar cupom"
    And o usuário preenche o campo "Código" com "CUPOM10"
    And o usuário preenche o campo "Data de início" com "01/01/2021"
    And o usuário preenche o campo "Data de término" com "31/01/2021"
    And o usuário preenche o campo "Desconto" com "10%"
    And o usuário seleciona a opção "Salvar"
    Then o sistema exibe uma mensagem de erro indicando que o código do cupom já existe

Scenario: Cadastro de um cupom de desconto com campos inválidos
    Given que um usuário com permissões de administrador está na página “administração” do menu
    And o cupom "CUPOM10" não está presente na lista de cupons
    When o usuário seleciona a opção "Adicionar cupom"
    And o usuário preenche o campo "Código" com "CUPOM10"
    And o usuário preenche o campo "Data de início" com "31/01/2021"
    And o usuário preenche o campo "Data de término" com "01/01/2021"
    And o usuário preenche o campo "Desconto" com "10%"
    And o usuário seleciona a opção "Salvar"
    Then o sistema exibe uma mensagem de erro indicando que a data de início deve ser anterior à data de término
