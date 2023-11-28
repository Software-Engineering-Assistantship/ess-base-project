Feature: Cadastrar uma conta
	As a usuário 
	I want to cadastrar uma conta
	So that eu possa acessar o sistema de reviews

Scenario 1: Cadastrar uma conta com todas as informações corretas
	Given estou na página “Cadastrar Conta”
	When eu preencho nome “Breno”, nome de usuário “bafm”, senha “senhaTeste” e repito a senha “senhaTeste”
	Then eu estou na página “Página Inicial”

Scenario 2: Cadastrar uma conta com um nome de usuário já existente
	Given estou na página “Cadastrar Conta”
	And existe um usuário com nome de usuário “bafm”
	When eu preencho nome “Breno”, nome de usuário “bafm”, senha “senhaTeste” e repito a senha “senhaTeste” 
	Then eu estou na página “Cadastrar Conta”
  And eu vejo a mensagem “Nome de usuário indisponivel”

Scenario 3: Cadastrar uma conta faltando o nome
	Given estou na página “Cadastrar Conta”
	When eu preencho nome de usuário “bafm”, senha “senhaTeste” e repito a senha “senhaTeste” 
	Then eu estou na página “Cadastrar Conta”
	And eu vejo a mensagem “Nome é um campo obrigatório”

Scenario 4: Cadastrar uma conta com duas senhas diferentes
	Given estou na página “Cadastrar Conta”
	When eu preencho nome “Breno”, nome de usuário “bafm”, senha “senhaTeste” e repito a senha “senhaTeste2” 
	Then eu estou na página “Cadastrar Conta”
	And eu vejo a mensagem “As senhas não são iguais”

Scenario: Deletar uma conta
	Given estou logado com o nome de usuário "bafm"
	And estou na página "Perfil"
	When eu deleto a conta
	Then eu estou na página "Login"
	And não estou logado no sistema

Scenario: Editar nome de usuário com sucesso
	Given estou logado com o nome de usuário "bafm"
	And estou na página "Atualizar Cadastro de Usuário"
	When eu edito o nome de usuário para "brenomiranda"
	And o nome de usuário "brenomiranda" está disponível
	Then eu estou na página "Perfil"
	And estou logado com o nome de usuário "brenomiranda" 