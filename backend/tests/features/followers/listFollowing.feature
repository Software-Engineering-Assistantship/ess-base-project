Feature: following

Scenario: Pegar lista de usuários que segue
        Given o usuário com o id "65d1ebec077a9668192c4fed" está armazenado no sistema com a lista "65d1eb21077a9668192c4fe8", "65d1ebe2077a9668192c4fec", "65d1ebf4077a9668192c4fee" de usuários que segue
        When fizer uma requisição GET com rota "/users/following/65d1ebec077a9668192c4fed"
        Then o status do sistema é 200
        And o sistema retorna um JSON com a lista "65d1eb21077a9668192c4fe8", "65d1ebe2077a9668192c4fec", "65d1ebf4077a9668192c4fee"