Feature: Lists

    Scenario: Excluir lista por ID
        Given existe uma lista de restaurantes com ID "65d58ca2c3082d4949f7cd06" com autor de ID "65d58c5ec3082d4949f7cd03" e nome "Restaurantes que amei"
        When uma requisição DELETE é enviada para "/lists/delete/65d58ca2c3082d4949f7cd06"
        Then o status de resposta é "200"
        And a lista com ID "65d58ca2c3082d4949f7cd06" não pode ser encontrada no banco de dados