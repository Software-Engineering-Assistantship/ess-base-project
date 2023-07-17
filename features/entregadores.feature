Cadastro e manutenção de entregadores (inserir, remover, atualizar)

	Scenario: Preenchimento de um novo cadastro de entregador
	Given: Eu estou na página de realização de cadastro do website HenriqueMeloE-commerce.com
	When: Eu digito meu nome "brenda" no campo NOME
	And: Eu digito meu cpf "XXX.XXX.XXX-XX" no campo CPF
	And: Eu digito o valor do frete "10,00" no campo FRETE
	And: Eu faço o upload da minha foto no campo FOTO
	And: Eu clico no botão "Sign Up"
	Then: Eu recebo um Pop-up confirmando a realização do cadastro eficientemente


FALHAS

	Scenario: Preenchimento de um novo cadastro de entregador, com CPF repetido
        Given: Eu estou na página de realização de cadastro do website HenriqueMeloE-commerce.com
        When: Eu digito meu nome "brenda" no campo NOME
        And: Eu digito meu cpf "XXX.XXX.XXX-XX" no campo CPF
        And: Eu digito o valor do frete "10,00" no campo FRETE
        And: Eu faço o upload da minha foto no campo FOTO
        And: Eu clico no botão "Sign Up"
	Then: Eu recebo um Pop-up informando que o CPF é invalido e o cadastro não foi completado

	Scenario: Modificação do valor do frete para um valor inválido
	Given: Eu estou logada no meu perfil "brenda" do website HenriqueMeloE-Commerce.com
	And: Estou na minha página de perfil
	When: EU clico no campo FRETE
	And: Eu altero o valor do campo de "10,00" para "-8,00"
	And: Eu clico no botão "Update"
	Then: Eu recebo um Pop-up informando que o valor do frete não é válido
	And: As alterações não foram realizadas

