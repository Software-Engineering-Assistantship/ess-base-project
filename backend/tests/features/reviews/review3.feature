Feature: Reviews

Scenario: Obter lista de reviews de um restaurante
        Given O restaurante de id "65d29514713ed7cc6fcf3635" contém três reviews "Coxinha Boa", "Coxinha ok" e "Coxinha meh"
        When é feita uma requisição GET para "/reviews/65d29514713ed7cc6fcf3635"
        Then O status da resposta deve ser "200"
        And Deve ser retornado um JSON com os três reviews "Coxinha Boa", "Coxinha ok" e "Coxinha meh"