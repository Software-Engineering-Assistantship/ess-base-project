Feature: Shopping Cart
	As a usuário
	I want escolher os itens que desejo pedir
	So that eu posso pagar por eles e receber meus produtos

Scenario: Consulta ao Banco de Dados carrega o carrinho do usuário após login
    Given eu estou na tela "Login"
    When eu faço login como "lgaj@cin.ufpe.br"
    Then uma requisição "GET" para "/users/{id}/shopping_cart" é enviada
    And o status da resposta deve ser "200"
    And o JSON da resposta contém a lista de itens no carrinho do usuário "lgaj@cin.ufpe.br"

Scenario: Salvando produtos adicionados ao carrinho no Banco de Dados
    Given eu estou logado como "lgaj@cin.ufpe.br" na tela "Restaurantes"
    And o carrinho está vazio
    When eu vejo "Coxinha" do "Restaurante Glória Maria Juazeiro" por "1,0 $" como opção
    Then uma requisição "POST" com "1" unidade(s) de "Coxinha" do "Restaurante Glória Maria Juazeiro" por "1,0 $" é enviada para "/users/{id}/shopping_cart/"
    And o status da resposta deve ser "201"
    And o carrinho contém "1" unidade(s) de "Coxinha" por "1,0 $" do "Restaurante Glória Maria Maria Juazeiro"
