Feature: Curtir
    As a usuário do sistema
    I want to informar à plataforma que gostei de um conteúdo
    So that i can receber recomendações semelhantes à aquele conteúdo
    
#Apenas os cenários de serviço referentes à feature foram colocados aqui

Scenario: Obter a lista de séries curtidas pelo usuário
    Given O usuário "Ykaro" está logado no sistema
    When  Uma requisição "GET" é enviada para "/user/seriesCurtidas/Ykaro"
	Then O status da resposta deve ser "200"
    And O JSON da resposta contém o item "Breaking Bad"

Scenario: Adicionar item a lista de "Séries Curtidas"
	Given A lista "Séries Curtidas" do usuário "Ykaro" contém o item "Breaking Bad"
    When Uma requisição "put" é enviada para "/user/curtir/Ykaro" com o item "The Boys"
	Then O status da resposta deve ser "200"
    And A lista "Séries Curtidas" do usuário "Ykaro" contém os itens "Breaking Bad" e "The Boys"

Scenario: Remover item da lista de "Séries Curtidas"
	Given  A lista "Séries Curtidas" do usuário "Ykaro" contém os itens "Breaking Bad" e "The Boys"
    When Uma requisição "put" é enviada para "/user/descurtir/Ykaro" com o item "The Boys"
	Then O status da resposta deve ser "200"
    And A lista "Séries Curtidas" do usuário "Ykaro" contém o item "Breaking Bad"
