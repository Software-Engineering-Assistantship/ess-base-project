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

commit teste main q13c
commit teste dev q13c

Scenario: teste main q14
	Given ... ajuste q14a
	When ... ajuste q14a
	Then ... ajuste q14a