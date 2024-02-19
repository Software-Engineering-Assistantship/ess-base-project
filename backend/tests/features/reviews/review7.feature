Feature: Reviews

Scenario: Visualizar Reviews a partir de um user
        Given O usuário de ID "15d29514713ed7cc6fcf3635" contém dois reviews feitos "Coxinha Boa" e "Ótimo Sushi"
        When É feita uma requisição GET para "/reviews/user/15d29514713ed7cc6fcf3635"
        Then O status da resposta deve ser "200"
        And Deve retornar um JSON contendo os dois reviews "Coxinha Boa" e "Ótimo Sushi"