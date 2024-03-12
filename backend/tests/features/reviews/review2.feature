Feature: Reviews

Scenario: Criar Review
        Given Não existe review feito pelo usuário de ID "00d29514713ed7cc6fcf3635" no restaurante de ID "65d29514713ed7cc6fcf3635"
        When Uma requisição POST é feita para "/reviews/65d29514713ed7cc6fcf3635/00d29514713ed7cc6fcf3635/create" com título "Coxinha Bem Ruim", texto "Bem Ruim Coxinha" e nota "1"
        Then O status da resposta deve ser "200"
        And O review "Coxinha Bem Ruim" associada ao usuário "00d29514713ed7cc6fcf3635" e restaurante "65d29514713ed7cc6fcf3635" está no banco de dados