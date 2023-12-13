Scenario: Visualização de uma lista criada pelo usuário
	Given eu estou na página de listas do meu perfil
	When eu seleciono a opção "Minhas Listas"
	And eu sou direcionado para uma tela contendo todas as minhas listas
	And eu seleciono a lista "Favoritos"
	Then sou direcionado para a página da lista "Favoritos"
	And eu consigo visualizar todos os restaurantes da lista "Favoritos"

Scenario: Visualização de uma lista curtida pelo usuário
	Given eu estou na página de listas do meu perfil
	When eu seleciono a opção "Listas Curtidas"
	And eu sou direcionado para uma tela contendo todas as minhas listas curtidas
	And eu seleciono a lista "Curtida123"
	Then sou direcionado para a página da lista "Favoritos"
	And eu consigo visualizar todos os restaurantes da "Curtida123"

Scenario: Criar uma lista com sucesso
	Given eu estou na página de listas do meu perfil
	When eu seleciono a opção "Criar Lista"
	And eu preencho o espaço de "Nome" com "NomeDaLista"
	Then "NomeDaLista" aparecerá na página de listas

Scenario: Criar uma lista sem sucesso
	Given eu estou na página de listas do meu perfil
	When eu seleciono a opção "Criar Lista"
	And eu não preencho o espaço de "Nome" com "NomeDaLista"
	And a mensagem "Insira o nome da lista" aparecer
    And eu seleciono a opção "OK"
    Then eu estou de volta na página de criação de lista

Scenario: Excluir uma lista
    Given eu estou na página de listas "Não gostei"
    When eu clico em "Opções"
    And eu seleciono "Excluir"
    Then eu não posso mais visualizar a lista "Não gostei" na página de listas

Scenario: Editar uma lista
    Given eu estou na página de listas "Não gostei"
    When eu clico em "Opções"
    And eu seleciono "Editar"
    Then eu vou para a página de edição da lista "Não gostei"

Scenario: Compartilhar uma lista
    Given eu estou na página de listas "Não gostei"
    When eu clico em "opções"
    And eu seleciono "Compartilhar"
    Then eu gero um link único associado à lista "Não gostei"

Scenario: Adição de restaurantes nas listas
	Given eu estou logado no meu perfil
	When seleciono o restaurante "Restaurante123"
    And eu sou direcionado para a página contendo as informações sobre "Restaurante123"
    And eu seleciono a opção "Adicionar"
    And eu seleciono a lista "Favoritos"
    Then o restaurante "Restaurante123" será adicionado na lista "Favoritos"
    And eu poderei visualizar o restaurante "Restaurante123" na lista "Favoritos"

Scenario: Remoção de restaurantes nas listas
	Given eu estou na página da lista "Favoritos"
	When eu seleciono o restaurante "Restaurante123" dessa lista
	And clico na opção "Remover"
	Then eu não posso mais visualizar o restaurante "Restaurante123" na lista "Favoritos"
 
