Feature: Followers
Scenario: Visualização seguidores pela página do usuário
        Given estou logada como "Joaninha", com email "tijb@mail.com" e senha "p@ssWord123"
        And o usuário "Roberto" segue "Joaninha"
        When eu clico em “SEGUIDORES” 
        Then eu deveria ver a lista "Seguidores de Joaninha"
        And posso ver o usuário "Roberto" na lista