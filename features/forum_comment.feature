Feature: Comentários de post de fórum

    As a usuário comum
    I want to comentar, editar e remover um post de fórum
    So that eu possa interagir com outros usuários e participar de discussões

    Scenario: Comentar em post
        Given eu estou na página de um post de fórum
        When eu seleciono a opção "Comentar"
        And eu preencho o comentário com o conteúdo que desejo
        And eu seleciono a opção de confirmação
        Then eu vejo o comentário com o conteúdo desejado atribuído a mim na seção de comentários do post

    Scenario: Edição de comentário
        Given eu estou na página de um post de fórum
        When eu seleciono a opção "Editar" em um comentário do meu usuário
        And eu modifico o conteúdo do comentário
        And eu seleciono a opção "Confirmar edição"
        Then eu volto para a seção de comentários do post que estava
        And eu consigo ver o comentário que fiz
