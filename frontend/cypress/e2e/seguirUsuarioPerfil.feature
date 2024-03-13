Feature: Followers
Scenario: Seguir usuário a partir da página de perfil
    Given estou na página de perfil "http://localhost:3000/users/65d58c5ec3082d4949f7cd03"
    And tem "3 SEGUIDORES"
    When eu sigo
    Then tem "4 SEGUIDORES"
    And eu posso deixar de seguir
