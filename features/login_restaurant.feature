Feature: login_restaurant
    As a usuário não logado
    I want to fazer login com meu email e senha
    So that eu posso acessar minha conta no iBreno

Scenario: Login realizado com sucesso
	Given eu estou na aba “Login”
	When eu preencho o campo de email com um email cadastrado “ecab@cin.ufpe.br”
	And eu preencho o campo de senha com a senha correspondente “11111git”
	And eu tento realizar login apertando em “Confirmar”
	Then eu devo ser redirecionado para a aba seguinte (“Cardápio”)

Scenario: Login realizado com sucesso
	Se um usuário, na página de login, inserir um email cadastrado e a senha 
	correspondente e confirmar a tentativa de login, ele será redirecionado 
	para a aba com os cardápios.

Scenario: Login fracassou pois o email não está cadastrado
	Se um usuário, na página de login, inserir um email não cadastrado e qualquer senha
	 e confirmar a tentativa de login, ele receberá uma notificação de erro no login.

Scenario: Login fracassou pois a senha está incorreta
	Se um usuário, na página de login, inserir um email cadastrado e uma senha
	 incorreta e confirmar a tentativa de login, ele receberá uma notificação de erro no login.

Scenario: Login fracassou pois um dos campos não foi preenchido
	Se um usuário, na página de login, deixar um dos campos ou ambos vazios
	 e confirmar a tentativa de login, ele receberá uma notificação de erro no login.
