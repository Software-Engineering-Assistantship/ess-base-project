Feature: Shopping Cart
	As a usuário
	I want escolher os itens que desejo pedir
	So that eu posso pagar por eles e receber meus produtos

Scenario: Consulta ao Banco de Dados carrega o carrinho do usuário após login
    Given eu estou na tela "Login"
    When eu faço login como "lgaj"
    Then uma requisição "GET" para "/{id}/shopping_cart" é enviada
    And o status da resposta deve ser "200"
    And o JSON da resposta contém a lista de itens no carrinho do usuário "lgaj"

Scenario: Salvando produtos adicionados ao carrinho no Banco de Dados
    Given eu estou logado como "lgaj" na tela "Restaurantes"
    And o carrinho está vazio
    When eu vejo "Coxinha" do "Restaurante Glória Maria Juazeiro" por "1.0" $ como opção
    Then uma requisição "POST" com "1" unidade(s) de "Coxinha" do "Restaurante Glória Maria Juazeiro" por "1.0" $ é enviada para "/{id}/shopping_cart/"
    And o status da resposta deve ser "201"
    And o carrinho contém "1" unidade(s) de "Coxinha" por "1.0" $ do "Restaurante Glória Maria Maria Juazeiro"

Scenario: Aumentando a quantidade de produtos no Banco de Dados
    Given eu estou logado como "lgaj" na tela "Restaurantes"
    And o carrinho contém "1" unidade(s) de "Coxinha" por "1.0" $ do "Restaurante Glória Maria Maria Juazeiro"
    When eu seleciono a opção "aumentar quantidade" do produto no carrinho "Coxinha" do "Restaurante Glória Maria Maria Juazeiro"
    Then uma requisição "PUT" com "2" unidade(s) de "Coxinha" do "Restaurante Glória Maria Juazeiro" por "2.0" $ é enviada para "/{id}/shopping_cart/"
    And o status da resposta deve ser "200"
    And o carrinho contém "2" unidade(s) de "Coxinha" por "2.0" $ do "Restaurante Glória Maria Maria Juazeiro"

Scenario: Diminuindo a quantidade de produtos no Banco de Dados
    Given eu estou logado como "lgaj" na tela "Restaurantes"
    And o carrinho contém "3" unidade(s) de "Coxinha" por "1.0" $ do "Restaurante Glória Maria Maria Juazeiro"
    When eu seleciono a opção "diminuir quantidade" do produto no carrinho "Coxinha" do "Restaurante Glória Maria Maria Juazeiro"
    Then uma requisição "PUT" com "2" unidade(s) de "Coxinha" do "Restaurante Glória Maria Juazeiro" por "1.0" $ é enviada para "/{id}/shopping_cart/"
    And o status da resposta deve ser "200"
    And o carrinho contém "2" unidade(s) de "Coxinha" por "2.0" $ do "Restaurante Glória Maria Maria Juazeiro"

Scenario: Removendo produtos do carrinho no Banco de Dados
    Given eu estou logado como "lgaj" na tela "Restaurantes"
    And o carrinho contém "3" unidade(s) de "Coxinha" por "1.0" $ do "Restaurante Glória Maria Maria Juazeiro"
    And o carrinho contém "1" unidade(s) de "Pitsa" por "10.0" $ do "Restaurante Glória Maria Juazeiro Oficial"
    When eu seleciono a opção "remover item" do produto no carrinho "Coxinha" do "Restaurante Glória Maria Maria Juazeiro"
    Then uma requisição "DELETE" com "3" unidade(s) de "Coxinha" do "Restaurante Glória Maria Juazeiro" por "1.0" $ é enviada para "/{id}/shopping_cart/"
    And o status da resposta deve ser "200"
    And o carrinho contém "1" unidade(s) de "Pitsa" por "10.0" $ do "Restaurante Glória Maria Juazeiro Oficial"

Scenario: Finalizando pedidos no Banco de Dados
    Given eu estou logado como "lgaj" na tela "Restaurantes"
    And o carrinho contém "3" unidade(s) de "Coxinha" por "1.0" $ do "Restaurante Glória Maria Maria Juazeiro"
    And o carrinho contém "1" unidade(s) de "Pitsa" por "10.0" $ do "Restaurante Glória Maria Juazeiro Oficial"
    When eu seleciono a opção "finalizar pedido" no carrinho
    Then uma requisição "PUT" é enviada para "/{id}/shopping_cart/"
    And o status da resposta deve ser "200"
    And o pedido tem status diferente de "Nao finalizado"
    And o carrinho está vazio
