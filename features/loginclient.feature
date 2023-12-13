Feature: loginclient
    As a usuário não logado
    I want to fazer login com meu email e senha
    So that eu posso acessar minha conta no iBreno

Scenario: Login realizado com sucesso
	Given eu estou na aba “Login”
	When eu preencho o campo de email com um email cadastrado “cvmfc@cin.ufpe.br”
	And eu preencho o campo de senha com a senha correspondente “777777”
	And eu tento realizar login apertando em “Confirmar”
	Then eu devo ser redirecionado para a aba seguinte (“Cardápio”)

Scenario: Login fracassou pois a senha está incorreta
	Given eu estou na aba “Login”
	When eu preencho o campo de email com um email cadastrado “cvmfc@cin.ufpe.br”
	And eu preencho o campo de senha com uma senha incorreta “1234”
	And eu tento realizar login apertando em “Confirmar”
	Then eu devo ver uma mensagem de erro no login
	And eu permaneço na aba “Login”

Scenario: Login fracassou pois o email não está cadastrado
	Given eu estou na aba “Login”
	When eu preencho o campo de email com um email não cadastrado “abcde@cin.ufpe.br”
	And eu preencho o campo de senha com uma senha qualquer “12345”
	And eu tento realizar login apertando em “Confirmar”
	Then eu devo ver uma mensagem de erro no login
	And eu permaneço na aba “Login”

Scenario: Login fracassou pois um dos campos não foi preenchido
	Given eu estou na aba “Login”
	When eu preencho o campo de email com um email cadastrado “cvmfc@cin.ufpe.br”
	And eu não preencho o campo de senha
	And eu tento realizar login apertando em “Confirmar”
	Then eu devo ver uma mensagem de erro no login
	And eu permaneço na aba “Login”

Scenario: Login realizado com sucesso
	Given existe um cliente cadastrado com email “cvmfc@cin.ufpe.br” e com senha “777777”
	When uma requisição POST é enviada para “/clients” com os dados “cvmfc@cin.ufpe.br” e “777777”
	Then os dados são encontrados no banco de dados
	And é retornado status “200”
	And o login é realizado com sucesso

Scenario: Login fracassou, pois a senha está incorreta
	Given existe um cliente cadastrado com email “cvmfc@cin.ufpe.br” e com senha “777777”
	When uma requisição POST é enviada para “/clients” com os dados “cvmfc@cin.ufpe.br” e “1234”
	Then a senha "1234" não é encontrada no banco de dados
	And é retornado status “401”
	And o login não pode ser concluído

Scenario: Login fracassou, pois o email não está cadastrado
	Given não existe um cliente cadastrado com email “cvmfc@cin.ufpe.br”
	When uma requisição POST é enviada para “/clients” com os dados “cvmfc@cin.ufpe.br” e “1234”
	Then o email "cvmfc@cin.ufpe.br" não é encontrado no banco de dados
	And é retornado status “401”
	And o login não pode ser concluído

Scenario: Login fracassou pois um dos campos não foi preenchido
	Given existe um cliente cadastrado com email “cvmfc@cin.ufpe.br” e com senha “777777”
	When uma requisição POST é enviada para “/clients” com os dados “cvmfc@cin.ufpe.br” e “”
	Then o campo da senha está vazio
	And é retornado status “204”
	And o login não pode ser concluído