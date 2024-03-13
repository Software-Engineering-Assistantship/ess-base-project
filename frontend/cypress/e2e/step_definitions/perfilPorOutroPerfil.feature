Feature: Followers
Scenario: Acessar o perfil de um usuário a partir da página de outro
        Given estou logada como "Joaninha", com email "tijb@mail.com" e senha "p@ssWord123"
        And estou na página de "Guilherme Maranhão", no link "http://localhost:3000/users/65d1eb21077a9668192c4fe8"
        When eu clico nos usuário que segue
        And eu seleciono "Ver perfil" de "Joaozinho"
        Then eu estou na página de perfil de "Joaozinho"