#Cenários de GUI

Scenario: Adicionar nova promoção
    Given Eu estou logado como administrador do estabelecimento "Bodega do Matheus" de ID "414250"
    And Eu estou na página de promoções
    When Eu clico em "Adicionar Nova Promoção"
    And Eu seleciono o produto "Hambúrguer" de ID "0237802178590347"
    And Eu seleciono o produto "Coca-Cola 350 mL" de ID "9239423230094129"
    And Eu defino o valor do desconto como "10%"
    And Eu cadastro a promoção
    Then Eu recebo um mensagem de confirmação
    And Eu vejo que a promoção foi cadastrada com ID "9181244520"
    
Scenario: Remover uma promoção
    Given Eu estou logado como administrador do estabelecimento "Bodega do Matheus" de ID "414250"
    And Eu estou na página de promoções
    And Eu quero remover a promoção de ID "9181244520"
    When Eu clico em "Remover Promoção"
    And Eu seleciono a promoção com ID "9181244520"
    And eu confirmo a remoção
    Then Eu recebo um mensagem de confirmação
    And Eu veja que a promoção de ID "9181244520" foi removida

Scenario: Modificar uma promoção
    Given Eu estou logado como administrador do estabelecimento "Bodega do Matheus" de ID "414250"
    And Eu estou na página de promoções
    And Eu quero modificar a promoção de ID "9181244520"
    When Eu clico em "Modificar Promoção"
    And Eu seleciono a promoção com ID "9181244520"
    And Eu atualizo o valor do desconto para "15%"
    And Eu confirmo as alterações
    Then Eu recebo um mensagem de confirmação
    And Eu vejo que a promoção de ID "9181244520" foi modificada

Scenario: Cadastrar um Novo Cupom
    Given Eu estou logado como administrador do sistema de ID "0200"
    And Eu estou no menu "Cupons de Desconto Válidos"
    When Eu clico em "Adicionar cupom"
    And Eu cadastro o cupom com código "DESC10" e percentual de desconto "10%"
    Then Eu vejo uma mensagem de confirmação
    And Eu vejo o cupom com código "DESC10" na lista de cupons cadastrados

Scenario: Remover um Cupom
    Given Eu estou logado como administrador do sistema de ID "0200"
    And Eu estou no menu "Cupons de Desconto Válidos"
    And O cupom com código "DESC10" está cadastrado no sistema
    When Eu clico em "Remover cupom"
    And Eu seleciono o cupom com código "DESC10"
    And Eu confirmo a remoção
    Then Eu vejo uma mensagem de confirmação
    And Eu não vejo o cupom com código "DESC10" na lista de cupons cadastrados

Scenario: Resgatar um Cupom pelo Usuário
    Given Eu estou logado como usuário de username "clara_abk"
    And Eu estou na página de "Adicionar cupons"
    And O cupom com código "DESC10" está disponível para resgate
    When Eu clico em "Resgatar Cupom"
    And Eu digito "DESC10" para escolher o cupom a resgatar
    Then Eu vejo uma mensagem de confirmação
    And Eu vejo o cupom com código "DESC10" na lista de cupons resgatados pelo usuário

#Cenários de Serviço

Scenario: Adicionar nova promoção
    Given Eu estou logado como administrador do estabelecimento "Bodega do Matheus" de ID "414250"
    When Eu faço uma requisição POST para a rota "/estabelecimento/414250/promocoes" com os IDs de produto "0237802178590347" e "9239423230094129", o valor de desconto "10%" e o ID de promoção "9181244520"
    Then Eu recebo uma resposta "200"
    And A resposta JSON deve conter "Promoção cadastrada"

Scenario: Remover uma promoção
    Given Eu estou logado como administrador do estabelecimento "Bodega do Matheus" de ID "414250"
    When Eu faço uma requisição DELETE para a rota "/estabelecimento/414250/promocoes/9181244520"
    Then Eu recebo uma resposta "200"
    And A resposta JSON deve conter "Promoção removida"

Scenario: Modificar uma promoção
    Given Eu estou logado como administrador do estabelecimento "Bodega do Matheus" de ID "414250"
    When Eu faço uma requisição PUT para a rota "/estabelecimento/414250/promocoes/9181244520" com o novo valor de desconto "15%"
    Then Eu recebo uma resposta "200"
    And A resposta JSON deve conter "Promoção atualizada"

Scenario: Cadastrar um Novo Cupom
    Given Eu estou logado como administrador do sistema de ID "0200"
    When Eu faço uma requisição POST para a rota "/cupons" com código "DESC10" e percentual de desconto "10%"
    Then Eu recebo uma resposta "200"
    And A resposta JSON deve conter "Cupom cadastrado"

Scenario: Remover um Cupom
   Given Eu estou logado como administrador do sistema de ID "0200"
    When Eu faço uma requisição DELETE para a rota "/cupons/DESC10"
    Then Eu recebo uma resposta "200"
    And A resposta JSON deve conter "Cupom deletado"

Scenario: Resgatar um Cupom pelo Usuário
    Given Eu estou logado como usuário de username "clara_abk"
    When Eu faço uma requisição GET para a rota "/cupons/DESC10"
    And Eu recebo uma resposta "200" da requisição GET
    And Eu faço uma requisição POST com o retorno da requisição anterior para a rota "users/clara_abk/cupons"
    Then Eu recebo uma resposta "200"
    And A resposta JSON deve conter "Cupom adicionado a carteira do usuário"