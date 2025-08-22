Feature: Recomendações com base nas curtidas (Top 10) - Ykaro dos Santos Albuquerque
    As a usuário da plataforma
    I want to receber recomendções
    So that i can receber conteúdo de qualidade

Scenario: Visualização da lista "Em alta"
	Given O usuário "Ykaro" está na "Página Inicial"
    When O usuário "Ykaro" acessa a lista "Em Alta"
    Then Estão presentes na lista "howls-moving-castle", "the-hangover", "superbad", "la-la-land", "the-notebook", "a-quiet-place", "it", "jumanji", "mad-max", "alien"

Scenario: Exibindo recomendações com base nas curtidas
    Given O usuário "Ykaro" está logado no sistema
    When  Uma requisição "GET" é enviada para "/user/top10/Sistema"
	Then O status da resposta deve ser "200"
    And O JSON da resposta contém a lista "Top 10" com os itens "howls-moving-castle", "the-hangover", "superbad", "la-la-land", "the-notebook", "a-quiet-place", "it", "jumanji", "mad-max", "alien"
