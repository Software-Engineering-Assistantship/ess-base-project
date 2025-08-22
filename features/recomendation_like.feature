Feature: Recomendações com base nas curtidas (Top 10) - Ykaro dos Santos Albuquerque
    As a usuário da plataforma
    I want to receber recomendções
    So that i can receber conteúdo de qualidade

Scenario: Visualização da lista “Em alta”
	Given O usuário “Ykaro” está na “Página Inicial”
    When O usuário “Ykaro” acessa a lista “Em Alta”
    Then Estão presentes na lista “The Boys”, “Breaking Bad”, “The Last of Us”, “Marley e Eu”, “Vingadores: Guerra Infinita”, “The Walking Dead”, “The Batman”, “Ainda estou aqui”, “La La Land”, “Valente”

Scenario: Exibindo recomendações com base nas curtidas
    Given O usuário "Ykaro" está logado no sistema
    When  Uma requisição “GET” é enviada para “/user/top10/Sistema”
	Then O status da resposta deve ser “200”
    And O JSON da resposta contém a lista “Top 10” com os itens “The Boys”, “Breaking Bad”, “The Last of Us”, “Marley e Eu”, “Vingadores: Guerra Infinita”, “The Walking Dead”, “The Batman”, “Ainda estou aqui”, “La La Land”, “Valente”
