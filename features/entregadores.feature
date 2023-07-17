Cadastro e manutenção de entregadores (inserir, remover, atualizar)

	Scenario: Preenchimento de um novo cadastro de entregador
	Given: Eu estou na página de realização de cadastro do website HenriqueMeloE-commerce.com
	When: Eu digito meu nome "brenda" no campo NOME
	And: Eu digito meu cpf "XXX.XXX.XXX-XX" no campo CPF
	And: Eu digito o valor do frete "10,00" no campo FRETE
	And: Eu faço o upload da minha foto no campo FOTO
	And: Eu clico no botão "Sign Up"
	Then: Eu recebo um Pop-up confirmando a realização do cadastro de forma eficiente
