Feature: Recomendação com base nas visualizações do usuário 
    As a usuário da plataforma
    I want to receber recomendções que sejam compatíveis com os meus gostos
    So that i can aproveitar as recomendações da plataforma

Scenario: Exibir recomendações para um usuário com histórico de visualizações (GUI)
    Given O usuário "Ykaro" assistiu aos filmes "Capitão América", "Homem de Ferro" e "Anabelle"
    When  O usuário "Ykaro" acessa a "Página Inicial"
    Then Está presente uma lista de título "Recomendações" em que "Homem Aranha, de volta ao lar", "The Batman", "The boys" e "Deadpool 2" aparecem disponíveis
    And Está presente outra lista de título "Recomendações" em que "Anabelle 3", "A Freira", "Sorriso" e "A substância" aparecem disponíveis

Scenario: Exibir recomendações para um usuário sem histórico de visualizações (GUI)
    Given O usuário "Ykaro" está logado no sistema
    When O usuário "Ykaro" acessa a "página inicial"
    Then Está presente uma lista de título "Recomendações" em que "black-panther", "alien", "mad-max", "jumanji" aparecem disponíveis

Scenario: Exibindo recomendações para o usuário com histórico de visualizações (gênero 1) (Service)
	Given A lista "historicoDeVisualizacao" do usuário "Ykaro" contém os itens "O incrível Hulk", "Homem-Formiga"
	When Uma requisição "GET" é enviada para "/user/Sistema/series/acao"
	Then O status da resposta deve ser "200"
	And O JSON da resposta contém os itens "Homem Aranha, de volta ao lar", "The Batman"

Scenario: Exibindo recomendações para o usuário com histórico de visualizações (gênero 2) (Service)
	Given A lista "historicoDeVisualizacao" do usuário "Ykaro" contém o item "Invocação do mal"
	When Uma requisição "GET" é enviada para "/user/Sistema/series/terror"
	Then O status da resposta deve ser "200"
	And O JSON da resposta contém os itens "A Freira", "Sorria"

Scenario: Exibindo recomendações para o usuário sem histórico de visualizações (Service)
	Given A lista "historicoDeVisualizacao" do usuário está vazia
	When Uma requisição "GET" é enviada para "/user/Sistema/series/"
	Then O status da resposta deve ser "200"
	And O JSON da resposta contém os itens "black-panther", "alien", "mad-max", "jumanji"


