Feature: Lists

    Scenario: Criar lista com sucesso
        Given um usuário de nome "Leticia" está logado com ID "65d51f9ac3b06ec45cdd2acb"
        When uma requisição POST é enviada para "/lists/create/65d51f9ac3b06ec45cdd2acb" com o nome "Favoritos"
        Then o status de resposta é "200"
        And um JSON com o nome do autor "Leticia" e nome da lista "Favoritos" é retornado
        And a lista do usuário com ID "65d51f9ac3b06ec45cdd2acb" com nome "Favoritos" pode ser encontrada no banco de dados