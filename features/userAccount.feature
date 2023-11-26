Feature: Cadastrar uma conta
As a usuário 
I want to ser capaz de cadastrar um conta
So that eu acessar o sistema de reviews

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