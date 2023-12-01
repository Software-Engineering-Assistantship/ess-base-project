Cadastro e Manutenção de Promoção (Ecomeerce):

Cenários:

Scenario: Cadastro de uma promoção em um produto sem promoção prévia
	Given Um usuário está logado como admin 
	And Estou na tela de visualização de produtos já cadastrados
	When o usuário entra na tela de edição do preço/promoção do produto “abacaxi” que vai entrar em promoção
    And visualiza as características do produto
	When o usuário adiciona a nova promoção utilizando a porcentagem de desconto e o preço original e confirma
	Then abacaxi está com o preço modificado
    Then o sistema exibe uma mensagem de sucesso

Scenario: Cadastro de uma promoção em um produto sem promoção prévia (Falha)
	Given Um usuário está logado como admin 
	And Estou na tela de visualização de produtos já cadastrados
	When o usuário entra na tela de edição do preço/promoção do produto “abacaxi” que vai entrar em promoção
    And visualiza as características do produto
	When o usuário adiciona a nova promoção utilizando a porcentagem de desconto e o preço original
    And o usuário cancela a operação
	Then abacaxi não tem o preço modificado
    Then o sistema exibe uma mensagem de erro

Scenario: Visualização de histórico de promoções
	Given Um usuário está logado como admin 
	And Estou na tela de visualização de produtos já cadastrados
	When o usuário entra na tela de edição do preço/promoção do produto “Copo térmico” que vai ter seu histórico acessado
    And visualiza as características do produto
    And visualiza o botão Histórico de promoções
    When o usuário acessa o histórico
    Then o produto permanece sem alteração de preço


Scenario: Cadastro de uma promoção em um produto com promoção prévia (Falha)
    Given Um usuário está logado como admin
    And Estou na tela de visualização de produtos já cadastrados
    When o usuário entra na tela de edição do preço/promoção do produto “abacaxi” que já está em promoção
    And visualiza as características do produto
    When o usuário adiciona a nova promoção utilizando a porcentagem de desconto e o preço original
    And o usuário cancela a operação
    Then abacaxi não tem o preço modificado
    Then o sistema exibe uma mensagem de erro

Scenario: Cadastro de uma promoção em um produto com promoção prévia
    Given Um usuário está logado como admin
    And Estou na tela de visualização de produtos já cadastrados
    When o usuário entra na tela de edição do preço/promoção do produto “abacaxi” que já está em promoção
    And visualiza as características do produto
    When o usuário adiciona a nova promoção utilizando a porcentagem de desconto e o preço original e confirma
    Then abacaxi tem o preço modificado
    Then o sistema exibe uma mensagem de sucesso

Scenario: Manutenção de uma promoção em um produto. (Ainda vai permanecer em promoção)
	Given Um usuário está logado como admin 
	And Estou na tela de visualização de produtos já cadastrados
	When o usuário entra na tela de edição do preço/promoção do produto “tomatinhos” que vai ter sua promoção modificada
    And visualiza as características do produto
    And visualiza o preço original
    When o usuário remove a promoção antiga e restabelece o preço original
    Then o produto está com o preço original
	When o usuário adiciona a nova promoção utilizando a porcentagem de desconto e o preço original e confirma
	Then tomatinhos está com o preço modificado

Scenario: Manutenção de uma promoção em um produto. (Não vai permanecer em promoção)
    Given Um usuário está logado como admin 
    And Estou na tela de visualização de produtos já cadastrados
    When o usuário entra na tela de edição do preço/promoção do produto “tomatinhos” que vai ter sua promoção modificada
    And visualiza as características do produto
    And visualiza o preço original
    When o usuário remove a promoção antiga e restabelece o preço original
    Then o produto está com o preço original
    When o usuário adiciona a nova promoção utilizando a porcentagem de desconto e o preço original e confirma
    Then tomatinhos está com o preço modificado
    Then o sistema exibe uma mensagem de sucesso