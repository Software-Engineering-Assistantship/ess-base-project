Cenários GUI
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


Cenários de Serviço
Scenario: Criar lista de restaurantes
    Given um usuário logado com ID "123"
    When uma requisição "POST" é enviada para "/lists" com os seguintes dados:
        """
        {
            "name": "Minha Lista Favorita",
            "description": "Esta é a minha lista pessoal de restaurantes favoritos",
            "restaurants": ["5678", "91011"]  // IDs dos restaurantes que fazem parte da lista
        }
        """
    Then o status de resposta é "200"
    And a resposta contém um ID de lista gerado
    And a lista é criada com nome "Minha Lista Favorita", descrição "Esta é a minha lista pessoal de restaurantes favoritos" e restaurantes com IDs "5678" e "91011"

Scenario: Editar lista de restaurantes
    Given existe uma lista de restaurantes com ID "456" e nome "Minha Lista"
    And um usuário logado com ID "123" é o autor dessa lista
    When uma requisição "PUT" é enviada para "/lists/edit/456" com os seguintes dados:
        """
        {
            "name": "Minha Lista Atualizada",
            "description": "Esta é a minha lista atualizada de restaurantes favoritos",
            "restaurants": ["5678", "91011", "121314"]  // IDs atualizados dos restaurantes que fazem parte da lista
        }
        """
    Then o status de resposta é "200"
    And a lista com ID "456" é atualizada com nome "Minha Lista Atualizada", descrição "Esta é a minha lista atualizada de restaurantes favoritos" e restaurantes com IDs "5678", "91011" e "121314"

Scenario: Excluir lista de restaurantes
    Given existe uma lista de restaurantes com ID "789" e nome "Minha Lista Excluída"
    And um usuário logado com ID "123" é o autor dessa lista
    When uma requisição "DELETE" é enviada para "/lists/delete/789"
    Then o status de resposta é "200"
    And a lista com ID "789" é excluída

Scenario: Tentar excluir lista de restaurantes que não pertence ao usuário
    Given existe uma lista de restaurantes com ID "789" e nome "Minha Lista Excluída"
    And um usuário logado com ID "456" não é o autor dessa lista
    When uma requisição "DELETE" é enviada para "/lists/delete/789"
    Then o status de resposta é "403"
    And a resposta é "Você não tem permissão para excluir esta lista"

Scenario: Tentar editar lista de restaurantes que não pertence ao usuário
    Given existe uma lista de restaurantes com ID "456" e nome "Minha Lista"
    And um usuário logado com ID "456" não é o autor dessa lista
    When uma requisição "PUT" é enviada para "/lists/edit/456" com os seguintes dados:
        """
        {
            "name": "Minha Lista Atualizada",
            "description": "Esta é a minha lista atualizada de restaurantes favoritos",
            "restaurants": ["5678", "91011", "121314"]
        }
        """
    Then o status de resposta é "403"
    And a resposta é "Você não tem permissão para editar esta lista"

Scenario: Tentar criar uma lista sem estar autenticado
    When uma requisição "POST" é enviada para "/lists" com os seguintes dados:
        """
        {
            "name": "Minha Lista Favorita",
            "description": "Esta é a minha lista pessoal de restaurantes favoritos",
            "restaurants": ["5678", "91011"]
        }
        """
    Then o status de resposta é "401"
    And a resposta é "Não autorizado: você precisa estar logado para criar uma lista"


