Feature: followers

Scenario: Pegar lista de seguidores - teste unitário
    Given o usuário com id "65d1eb21077a9668192c4fe8" está armazenado no sistema com a lista de seguidores "65d1ebd4077a9668192c4feb", "65d1ebf4077a9668192c4fee", "65d1ebf4077a9668192c4fee"
    When fizer a busca pela lista de seguidores do usuário "65d1eb21077a9668192c4fe8"
    And o sistema retorna um JSON com a lista "65d1ebd4077a9668192c4feb", "65d1ebf4077a9668192c4fee", "65d1ebf4077a9668192c4fee"