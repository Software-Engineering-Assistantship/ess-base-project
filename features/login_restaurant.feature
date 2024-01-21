Feature: login_restaurant
    As a usuário não logado
    I want to fazer login com meu email e senha
    So that eu posso acessar minha conta no iBreno

Scenario: Login realizado com sucesso
	Given existe um cliente cadastrado com email “ecab@cin.ufpe.br” e com senha “senha_restaurant”
	When uma requisição POST é enviada para “/clients” com os dados “ecab@cin.ufpe.br” e “senha_errada_restaurant”
	Then a senha "senha_errada_restaurant" não corresponde à senha correta “senha_restaurant“
	And é retornado status “401”
	And o login não pode ser concluído

Scenario: Login fracassou pois a senha está incorreta
	Given eu estou na aba “Login”
	And eu preencho o campo de email com um email cadastrado “ecab@cin.ufpe.br”
	And eu não preencho o campo de senha
	When eu tento realizar login
	Then eu devo ver uma mensagem de erro no login
	And eu permaneço na aba “Login”


Scenario: Login fracassou pois um dos campos está incorreto
	Given eu estou na aba “Login”
	And eu preencho o campo de email com um email cadastrado “ecab@cin.ufpe.br”
	And eu preencho o campo de senha com a senha correspondente “senha_restaurant”
	When eu tento realizar login
	Then eu sou redirecionado para a aba seguinte

Scenario: Login realizado com sucesso
	Given existe um cliente cadastrado com email “ecab@cin.ufpe.br” e com senha “111111”
	When uma requisição GET é enviada para “/clients” com os dados “ecab@cin.ufpe.br” e “111111”
	Then os dados são encontrados no banco de dados
	And é retornado status “202”
	And o login é realizado com sucesso

Scenario: Login fracassou, pois a senha está incorreta
	Given existe um cliente cadastrado com email “ecab@cin.ufpe.br” e com senha “111115”
	When uma requisição GET é enviada para “/clients” com os dados “ecab@cin.ufpe.br” e “111115”
	Then um dos dados não é encontrado no banco de dados
	And é retornado status “401”
	And o login não pode ser concluído
