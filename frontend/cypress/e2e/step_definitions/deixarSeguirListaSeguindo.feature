Feature: Followers
Scenario: Deixar de seguir um usuário a partir da lista de seguindo
    Given estou logada como "Joaninha", com email "tijb@mail.com" e senha "p@ssWord123"
    And eu tenho "2 SEGUINDO"
    When eu visualizo a lista de usuários que sigo
    And eu deixo de seguir "Leticia"
    And volto para a minha página
    Then eu tenho "1 SEGUINDO"

