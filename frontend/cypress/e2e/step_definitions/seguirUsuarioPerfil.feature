Feature: Followers
Scenario: Seguir usuário a partir da página de perfil
    Given estou logada como "Joaninha", com email "tijb@mail.com" e senha "p@ssWord123"
    Given estou na página de perfil de "Joaozinho", no "http://localhost:3000/users/65d58c5ec3082d4949f7cd03"
    Given tem "0 SEGUIDORES"
    When eu sigo
    Then a mensagem "Seguiu com sucesso. Uma mensagem foi enviada para o usuário!" aparece
    Then tem "1 SEGUIDORES"
    Then eu posso deixar de seguir
