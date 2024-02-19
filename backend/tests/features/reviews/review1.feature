Feature: Reviews

    Scenario: Visualização de um Review
        Given O restaurante de ID "65d29514713ed7cc6fcf3635" contém um review feito pelo usuário de ID "15d29514713ed7cc6fcf3635" de título "Coxinha Boa", texto "Boa Coxinha" e nota "5"
        When é feita uma requisição GET para "/reviews/65d29514713ed7cc6fcf3635/15d29514713ed7cc6fcf3635"
        Then O status da resposta deve ser "200"
        And Deve ser retornado um JSON com o review "Coxinha Boa"