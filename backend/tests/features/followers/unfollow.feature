Feature: Followers

Scenario: Deixar de seguir um usuário
    Given o usuário com id "65d1ebe2077a9668192c4fec" está armazenado no sistema com a lista de usuários que segue "65d1ebec077a9668192c4fed"
    And o usuário com o id "65d1ebec077a9668192c4fed" está armazenado no sistema com a lista de seguidores "65d1ebe2077a9668192c4fec"
    When fizer uma requisição PUT com rota "/users/unfollow/65d1ebec077a9668192c4fed" e o body contendo o id "65d1ebe2077a9668192c4fec"
    Then o status do sistema é 200
    And retorna um JSON contendo o id "65d1ebec077a9668192c4fed" e a lista de seguidores vazia
    And contendo o id "65d1ebe2077a9668192c4fec" e a lista de usuários que segue vazia