Scenario: Adicionando produto ao carrinho de compras
	Given eu estou logado como “lgaj@cin.ufpe.br” na tela “Restaurantes”
	When eu vejo “Coxinha” do “Restaurante Glória Maria” como opção
	And eu vejo “Tapioca” do “Restaurante Glória Maria Oficial” como opção
	And eu adiciono “Coxinha” do “Restaurante Glória Maria” ao carrinho
	Then eu vejo “uma notificação no ícone do carrinho de compras”
	And “Coxinha” do “Restaurante Glória Maria” é devidamente adicionado ao carrinho 

Scenario: Limpando o carrinho de compras
	Given eu estou logado como “lgaj@cin.ufpe.br” na tela “Carrinho de Compras”
	And o carrinho contém “1” unidade(s) de “Coxinha” por “1,00 $” do “Restaurante Glória Maria”
	And o carrinho contém “1” unidade(s) de “Pastel” por “1,50 $” do “Restaurante Glória Maria Filha”
	When eu clico na opção “Excluir”
	And eu seleciono “Confirmar”
	Then eu vejo um pop-up com “Carrinho esvaziado”
	And o carrinho está vazio
