Feature: Lists

    Scenario: Tentar criar uma lista sem nome
        Given o usuário de ID "65d58c5ec3082d4949f7cd03" está logado
        When uma requisição POST é enviada para "/lists/create/65d58c5ec3082d4949f7cd03" com nenhum nome e descrição "sem nome"
        Then o status de resposta é "400"
        And a lista sem nome não pode ser encontrada no banco de dados com autor de ID "65d58c5ec3082d4949f7cd03"

        