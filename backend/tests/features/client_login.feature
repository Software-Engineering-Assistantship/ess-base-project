Feature: loginclient
    As a usuário não logado
    I want to fazer login com meu email e senha
    So that eu posso acessar minha conta no iBreno

Scenario: Login realizado com sucesso
	Given existe um cliente cadastrado com email “cvmfc@cin.ufpe.br” e com senha “777777”
	When uma requisição POST é enviada para “/clients/login” com os dados “cvmfc@cin.ufpe.br” e “777777”
	Then os dados são encontrados no banco de dados
	And é retornado status “200”
	And o login é realizado com sucesso

Scenario: Login fracassou, pois a senha está incorreta
	Given existe um cliente cadastrado com email “cvmfc@cin.ufpe.br” e com senha “777777”
	When uma requisição POST é enviada para “/clients/login” com os dados “cvmfc@cin.ufpe.br” e “1234”
	Then a senha "1234" não é encontrada no banco de dados
	And é retornado status “401”
	And o login não pode ser concluído

Scenario: Login fracassou, pois o email não está cadastrado
	Given não existe um cliente cadastrado com email “cvmfc@cin.ufpe.br”
	When uma requisição POST é enviada para “/clients/login” com os dados “cvmfc@cin.ufpe.br” e “1234”
	Then o email "cvmfc@cin.ufpe.br" não é encontrado no banco de dados
	And é retornado status “401”
	And o login não pode ser concluído