Feature: Shopping Cart
	As a usuário
	I want escolher os itens que desejo pedir
	So that eu posso pagar por eles e receber meus produtos

Scenario: Adicionando produto ao carrinho de compras
	Given eu estou logado como "lgaj@cin.ufpe.br" na tela "Restaurantes"
	When eu vejo "Coxinha" do "Restaurante Glória Maria" como opção
	And eu vejo "Tapioca" do "Restaurante Glória Maria Oficial" como opção
	And eu adiciono "Coxinha" do "Restaurante Glória Maria" ao carrinho
	Then eu vejo "uma notificação no ícone do carrinho de compras"
	And "Coxinha" do "Restaurante Glória Maria" é devidamente adicionado ao carrinho

Scenario: Limpando o carrinho de compras
	Given eu estou logado como "lgaj@cin.ufpe.br" na tela "Carrinho de Compras"
	And o carrinho contém "1" unidade(s) de "Coxinha" por "1,00 $" do "Restaurante Glória Maria"
	And o carrinho contém "1" unidade(s) de "Pastel" por "2,50 $" do "Restaurante Glória Maria Filha"
	When eu clico na opção "Excluir"
	And eu seleciono "Confirmar"
	Then eu vejo um pop-up com "Carrinho esvaziado"
	And o carrinho está vazio

Scenario: Consulta ao Banco de Dados carrega o carrinho do usuário após login
	Given eu estou na tela “Login”
	When eu faço login como “lgaj@cin.ufpe.br”
	Then uma requisição "GET" para "/carrinho" é enviada
	And o status da resposta deve ser "200"
	And o JSON da resposta contém a lista de itens no carrinho do usuário “lgaj@cin.ufpe.br”

Scenario: Diminuindo a quantidade de um item com uma unidade no carrinho de compras
	Given eu estou logado como "lgaj@cin.ufpe.br" na tela "Carrinho de Compras"
	And o carrinho contém "2" unidade(s) de "Coxinha" por "2,00 $" do "Restaurante Glória Maria 2"
	And o carrinho contém "1" unidade(s) de "Pizza" por "10,00 $" do "Restaurante Glória Maria Conceição"
	And o carrinho contém "1" unidade(s) de "Ovo de Páscoa" por "100,00 $" do "Restaurante Glória Maria Conceição"
	When eu clico na opção "Menos um" para o produto "Pizza" do "Restaurante Glória Maria Conceição"
	Then eu vejo um pop-up com "Este item contém apenas um unidade, deseja removê-lo?"
    When eu seleciono "Cancelar"
    Then eu estou na tela "Carrinho de compras"
	And o carrinho contém "2" unidade(s) de "Coxinha" por "2,00 $" do "Restaurante Glória Maria 2"
	And o carrinho contém "1" unidade(s) de "Pizza" por "10,00 $" do "Restaurante Glória Maria Conceição"
	And o carrinho contém "1" unidade(s) de "Ovo de Páscoa" por "100,00 $" do "Restaurante Glória Maria Conceição"

Scenario: Finalizando um pedido sem itens
	Given eu estou logado como "lgaj@cin.ufpe.br" na tela "Carrinho de Compras"
	And o carrinho está vazio.
	When eu seleciono "Finalizar pedido"
	Then eu vejo um pop-up com "O carrinho está vazio, adicione algo antes de finalizar o pedido."

Scenario: Removendo um item do carrinho de compras
	Given eu estou logado como "lgaj@cin.ufpe.br" na tela "Carrinho de Compras"
	And o carrinho contém "2" unidade(s) de "Coxinha" por "2,00 $" do "Restaurante Glória Maria 2"
	And o carrinho contém "1" unidade(s) de "Pizza" por "10,00 $" do "Restaurante Glória Maria Conceição"
	And o carrinho contém "1" unidade(s) de "Ovo de Páscoa" por "100,00 $" do "Restaurante Glória Maria Conceição"
	When eu clico na opção "Remover item" para o produto "Ovo de Páscoa" do "Restaurante Glória Maria Conceição"
	And eu seleciono "Confirmar"
	Then eu vejo um pop-up com "Produto removido"
	And o carrinho contém "2" unidade(s) de "Coxinha" por "2,00 $" do "Restaurante Glória Maria 2"
	And o carrinho contém "1" unidade(s) de "Pizza" por "10,00 $" do "Restaurante Glória Maria Conceição"

Scenario: Aumentando a quantidade de um item no carrinho de compras
	Given eu estou logado como "lgaj@cin.ufpe.br" na tela "Carrinho de Compras"
	And o carrinho contém "2" unidade(s) de "Coxinha" por "2,00 $" do "Restaurante Glória Maria 2"
	And o carrinho contém "1" unidade(s) de "Pizza" por "10,00 $" do "Restaurante Glória Maria Conceição"
	When eu clico na opção "Mais um" para o produto "Pizza" do "Restaurante Glória Maria Conceição"
	Then o carrinho contém "2" unidade(s) de "Coxinha" por "2,00 $" do "Restaurante Glória Maria 2"
	And o carrinho contém "2" unidade(s) de "Pizza" por "20,00 $" do "Restaurante Glória Maria Conceição"
