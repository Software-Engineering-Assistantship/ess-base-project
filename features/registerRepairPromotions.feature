Cadastro e Manutenção de Promoção (Ecomeerce):

Cenários:

Scenario: Cadastro de uma promoção em um produto sem promoção prévia
	Given Um usuário está logado como admin 
	And Estou na tela de visualização de produtos já cadastrados
	When o usuário entra na tela de edição do preço/promoção do produto “abacaxi” que vai entrar em promoção
    And visualiza as características do produto
	When o usuário adiciona a nova promoção utilizando a porcentagem de desconto e o preço original e confirma
	Then abacaxi está com o preço modificado

Scenario: Cadastro de uma promoção em um produto sem promoção prévia (Falha)
	Given Um usuário está logado como admin 
	And Estou na tela de visualização de produtos já cadastrados
	When o usuário entra na tela de edição do preço/promoção do produto “abacaxi” que vai entrar em promoção
    And visualiza as características do produto
	When o usuário adiciona a nova promoção utilizando a porcentagem de desconto e o preço original
    And o usuário cancela a operação
	Then abacaxi não tem o preço modificado

Scenario: Cadastro de uma promoção em um produto com promoção prévia (Falha)
    Given Um usuário está logado como admin
    And Estou na tela de visualização de produtos já cadastrados
    When o usuário entra na tela de edição do preço/promoção do produto “abacaxi” que já está em promoção
    And visualiza as características do produto
    When o usuário adiciona a nova promoção utilizando a porcentagem de desconto e o preço original
    And o usuário cancela a operação
    Then abacaxi não tem o preço modificado

Scenario: Cadastro de uma promoção em um produto com promoção prévia
    Given Um usuário está logado como admin
    And Estou na tela de visualização de produtos já cadastrados
    When o usuário entra na tela de edição do preço/promoção do produto “abacaxi” que já está em promoção
    And visualiza as características do produto
    When o usuário adiciona a nova promoção utilizando a porcentagem de desconto e o preço original e confirma
    Then abacaxi tem o preço modificado
