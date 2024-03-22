Feature: Lists

    Scenario: Editar o nome de uma lista
        Given existe uma lista de restaurantes com ID "65d58d6cc3082d4949f7cd0a" e nome "restaurantes que to amando" com autor de nome "Joaozinho"
        When uma requisição PUT é enviada para "/lists/edit/65d58d6cc3082d4949f7cd0a" com o novo nome "ex favoritos"
        Then o status de resposta é "200"
        And a lista com ID "65d58d6cc3082d4949f7cd0a" é atualizada com nome "ex favoritos" no banco de dados