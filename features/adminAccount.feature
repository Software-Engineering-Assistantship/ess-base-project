Feature: Administrar uma conta
	As a usuário 
	I want to ser capaz de cadastrar, atualizar e deletar uma conta
	So that possa administrar uma conta no sistema de reviews

Scenario: Cadastrar uma conta com todas as informações corretas
	Given estou na página “Cadastrar Conta”
	When preencho nome “Breno”, sobrenome "Miranda", nome de usuário “bafm”, senha “senhaTeste” e repito a senha “senhaTeste”
	And adiciono a foto "fotoPerfil.jpg"
	Then estou na página “Página Inicial”
	And estou logado como "bafm"

Scenario: Cadastrar uma conta com um nome de usuário já existente
	Given estou na página “Cadastrar Conta”
	And existe um usuário com nome de usuário “bafm”
	When preencho nome “Breno”, nome de usuário “bafm”, e-mail “bafm@cin.ufpe.br", senha “senhaTeste” e repito a senha “senhaTeste” 
	Then estou na página “Cadastrar Conta”
  And vejo a mensagem “Nome de usuário indisponivel”

Scenario: Cadastrar uma conta com um e-mail já existente
	Given estou na página “Cadastrar Conta”
	And existe um usuário com e-mail “bafm@cin.ufpe.br”
	When preencho nome “Breno”, nome de usuário “bafm”, e-mail “bafm@cin.ufpe.br", senha “senhaTeste” e repito a senha “senhaTeste” 
	Then estou na página “Cadastrar Conta”
  And vejo a mensagem “Nome de usuário indisponivel”

Scenario: Cadastrar uma conta sem o nome
	Given estou na página “Cadastrar Conta”
	When preencho nome de usuário “bafm”, senha “senhaTeste” e repito a senha “senhaTeste” 
	Then estou na página “Cadastrar Conta”
	And vejo a mensagem “Nome é um campo obrigatório”

Scenario: Cadastrar uma conta com duas senhas diferentes
	Given estou na página “Cadastrar Conta”
	When preencho nome “Breno”, nome de usuário “bafm”, senha “senhaTeste” e repito a senha “senhaTeste2” 
	Then estou na página “Cadastrar Conta”
	And vejo a mensagem “As senhas não são iguais”

Scenario: Deletar uma conta com senha correta
	Given estou logado com o nome de usuário "bafm"
	And estou na página "Deletar Perfil"
	When preencho senha "senhaTeste"
	Then estou na página "Login"
	And não estou logado no sistema

Scenario: Deletar uma conta com senha incorreta
	Given estou logado com o nome de usuário "bafm"
	And estou na página "Deletar Perfil"
	When preencho senha "senhaTeste2"
	Then estou na página "Login"
	And estou logado como "bafm"

Scenario: Editar nome de usuário com sucesso
	Given estou logado com o nome de usuário "bafm"
	And estou na página "Atualizar Cadastro de Usuário"
	When preencho nome de usuário "brenomiranda"
	And nome de usuário "brenomiranda" está disponível
	Then estou na página "Perfil"
	And estou logado com o nome de usuário "brenomiranda" 

Scenario: Editar nome de usuário por um já existente
	Given estou logado com o nome de usuário "bafm"
	And estou na página "Atualizar Cadastro de Usuário"
	When preencho nome de usuário "brenomiranda"
	And nome de usuário "brenomiranda" não está disponível
	Then vejo uma mensagem "Nome de usuário não disponível"
	And estou na página "Atualizar Cadastro de Usuário"
	And estou logado com o nome de usuário "bafm" 