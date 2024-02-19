Feature: Reviews

Scenario: Obter Média de Notas de um Restaurante
        Given O restaurante de ID "65d29514713ed7cc6fcf3635" contém três notas dadas em reviews: "5" pelo user "15d29514713ed7cc6fcf3635", "4" pelo user "02d29514713ed7cc6fcf3635" e "3" pelo user "03d29514713ed7cc6fcf3635"
        When Uma requisição GET é feita para "/reviews/65d29514713ed7cc6fcf3635/avg"
        Then O status de resposta deve ser "200"
        And A resposta deve ser média "4"