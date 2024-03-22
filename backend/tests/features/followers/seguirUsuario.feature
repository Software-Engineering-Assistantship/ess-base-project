Feature: followers

Scenario: Seguir um usuário
    Given o usuário com id "65d1ebd4077a9668192c4feb" está armazenado no sistema com a lista de usuários que segue vazia
    And o usuário com o id "65d1eb21077a9668192c4fe8" está armazenado no sistema com a lista de seguidores vazia e com e-mail "almocin.ess@gmail.com"
    When fizer uma requisição PUT com rota "/users/follow/65d1eb21077a9668192c4fe8" e o body contendo o id "65d1ebd4077a9668192c4feb"
    Then o status do sistema é 200
    And retorna um JSON com os dados do usuário com o id "65d1eb21077a9668192c4fe8" que tem a lista de seguidores "65d1ebd4077a9668192c4feb"
    And com os dados do usuário com id "65d1ebd4077a9668192c4feb" tem a lista de usuários que segue "65d1eb21077a9668192c4fe8"
    And a mensagem enviada para o e-mail cadastrado do usuário seguido tem status "success"