Feature: Reviews

Scenario: Edição de Review
        Given O restaurante de ID "65d2cfb1620894960053d364" contém um review feito pelo usuário de ID "25d29514713ed7cc6fcf3635" e título "Coxinha Ruim"
        When é feita uma requisição PUT para "/reviews/65d2cfb1620894960053d364/25d29514713ed7cc6fcf3635/edit" alterando o título para "Coxinha Mais ou Menos"
        Then O status da resposta deve ser "200"
        And Deve ser retornado um JSON contendo o review "Coxinha Mais ou Menos"