Feature: Curtir
    As a usuário do sistema
    I want to informar à plataforma que gostei de um conteúdo
    So that i can receber recomendações semelhantes à aquele conteúdo

Scenario: Clicar no botão de curtida
	Given A lista “Séries Curtidas” está vazia 
	And O usuário “Ykaro” está na tela de visualização da série “The Boys” 
	When O usuário “Ykaro” clica no botão “curtir”
    And O usuário “Ykaro” acessa a lista “séries curtidas”
    Then “The boys” está na lista “séries curtidas”

Scenario: Clicar novamente no botão de curtida
	Given A série “The Boys” está na lista “séries curtidas”
	And O usuário “Ykaro” está na tela de visualização da série “The Boys”
	When O usuário “Ykaro” clica no botão “curtir”
    And O usuário “Ykaro” acessa a lista “séries curtidas”
    Then A lista “séries curtidas” está vazia

Scenario: Obter a lista de séries curtidas pelo usuário
    Given O usuário "Ykaro" está logado no sistema
    When  Uma requisição “GET” é enviada para “/usuario/seriesCurtidas”
	Then O status da resposta deve ser “200”
    And O JSON da resposta contém a lista “séries curtidas”
    And A lista contém o item “Breaking Bad”

Scenario: Adicionar item a lista de “Séries Curtidas”
	Given A lista ‘séries curtidas’ do usuário ‘Ykaro’ contém o item “Breaking Bad”
	And O usuário curtiu a série “The Boys”
    When Uma requisição “PUT” é enviada para “/usuario/seriesCurtidas/theBoys” com o item “The Boys”
	Then O status da resposta deve ser “200”
    And A lista “séries curtidas” contém os itens “Breaking Bad” e “The Boys”

Scenario: Remover item da lista de “Séries Curtidas”
	Given  A lista “Séries curtidas” do usuário “Ykaro” contém os itens “Breaking Bad” e “The Boys”
    When Uma requisição “PUT” é enviada para “/usuario/seriesCurtidas/theBoys” com o item “The Boys”
	Then O status da resposta deve ser “200”
    And A lista “séries curtidas” do usuário “Ykaro” contém o item “Breaking Bad”
