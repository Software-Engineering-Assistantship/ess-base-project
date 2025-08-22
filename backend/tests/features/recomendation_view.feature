Feature: Recomendação com base nas visualizações do usuário 
    As a usuário da plataforma
    I want to receber recomendções que sejam compatíveis com os meus gostos
    So that i can aproveitar as recomendações da plataforma

# Apenas os cenários de serviço referentes à feature foram colocados aqui

Scenario: Exibindo recomendações para o usuário com histórico de visualizações (gênero 1) (Service)
	Given A lista "historicoDeVisualizacao" do usuário "Ykaro" contém os itens "O Incrível Hulk", "Homem-Formiga"
	When Uma requisição "GET" é enviada para "/user/Sistema/series/acao"
	Then O status da resposta deve ser "200"
	And O JSON da resposta contém os itens "Homem Aranha, de volta ao lar", "The Batman"

Scenario: Exibindo recomendações para o usuário com histórico de visualizações (gênero 2) (Service)
	Given A lista "historicoDeVisualizacao" do usuário "Ykaro" contém o item "Invocação do mal"
	When Uma requisição "GET" é enviada para "/user/Sistema/series/terror"
	Then O status da resposta deve ser "200"
	And O JSON da resposta contém os itens "A Freira", "Sorria"

Scenario: Exibindo recomendações para o usuário sem histórico de visualizações (Service)
	Given A lista "historicoDeVisualizacao" do usuário "João" está vazia
	When Uma requisição "GET" é enviada para "/user/Sistema/series"
	Then O status da resposta deve ser "200"
	And O JSON da resposta contém os itens "Moana 2", "Zootopia"


