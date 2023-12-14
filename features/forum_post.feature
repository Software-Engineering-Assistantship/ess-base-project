Feature: Posts de fórum

    As a usuário comum
    I want to criar, editar e remover posts de fórum
    So that eu possa compartilhar experiências, fazer perguntas ou discutir tópicos relevantes com a comunidade.

    Scenario: Criar um novo post de fórum
        Given eu estou na página de fórum
        When eu seleciono a opção "Criar novo post"
        And eu preencho o título com o meu título desejado
        And eu preencho o contéudo com o meu conteúdo desejado
        And eu seleciono a opção "Publicar"
        Then eu recebo uma mensagem de confirmação de criação de post
        And eu vejo o novo post com o meu título e o meu conteúdo na página de fórum atribuído ao meu usuário

    Scenario: Editar conteúdo de um post de fórum de um usuário
        Given eu estou na página de um post do meu usuário
        And o post possui o conteúdo indesejado
        When eu seleciono a opção "Editar conteúdo"
        And eu modifico o conteúdo para um conteúdo desejado
        And eu seleciono a opção "Confirmar edição"
        Then eu recebo uma mensagem de confirmação de edição de post
        And eu vejo o conteúdo desejado no conteúdo do post do meu usuário

    Scenario: Excluir um post de fórum do usuário
        Given eu estou na página do post "Opções Mexicanas Pet Friendly" do meu usuário
        When eu seleciono a opção "Excluir"
        And eu confirmo a exclusão
        Then eu recebo uma mensagem de confirmação de exclusão de post
        And eu não vejo o post "Opções Mexicanas Pet Friendly" na página do conteúdo de fórum