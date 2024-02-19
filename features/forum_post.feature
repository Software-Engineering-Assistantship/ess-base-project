Feature: Posts de fórum

    As a usuário comum
    I want to criar, editar e remover posts de fórum
    So that eu possa compartilhar experiências, fazer perguntas ou discutir tópicos relevantes com a comunidade.

    Scenario: Criar um novo post de fórum
        Given eu estou na página de fórum
        When eu seleciono a opção "Criar novo post"
        And eu preencho o título com "Meu Post"
        And eu preencho o contéudo com "Este é o conteúdo do meu post"
        And eu seleciono a opção "Publicar"
        Then eu recebo uma mensagem de confirmação de criação de post
        And eu vejo o novo post com o título "Meu Post" e com o conteúdo "Este é o conteúdo do meu post" na página de fórum atribuído ao meu usuário

    Scenario: Editar conteúdo de um post de fórum de um usuário
        Given eu estou na página do post "Meu Post" do meu usuário
        And o post possui o conteúdo "Este é o conteúdo do meu post"
        When eu seleciono a opção "Editar conteúdo"
        And eu modifico o conteúdo para o conteúdo "Este é o novo conteúdo do meu post"
        And eu seleciono a opção "Confirmar edição"
        Then eu recebo uma mensagem de confirmação de edição de post
        And eu vejo "Este é o novo conteúdo do meu post" no conteúdo do post "Meu Post" do meu usuário

    Scenario: Excluir um post de fórum do usuário
        Given eu estou na página do post "Opções Mexicanas Pet Friendly" do meu usuário
        When eu seleciono a opção "Excluir"
        And eu confirmo a exclusão
        Then eu recebo uma mensagem de confirmação de exclusão de post
        And eu não vejo o post "Opções Mexicanas Pet Friendly" na página do conteúdo de fórum

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


    # Cenários de serviço

    Scenario: Obter todos os posts de fórum
        Given existem 2 posts de fórum
        And o primeiro possui id "001", título "ABC", conteúdo "primeiro conteúdo" e autor usuário de id "123"
        And o segundo possui id "002", título "DEF", conteúdo "segundo conteúdo" e autor usuário de id "456"
        When uma requisição "GET" é feita para "/forum"
        Then o status de resposta deve ser "200"
        And o JSON da resposta deve ser uma lista de itens 
        And o post com id "001", título "ABC", conteúdo "primeiro conteúdo" e autor "123" deve estar na lista
        And o post com id "002", título "DEF", conteúdo "segundo conteúdo" e autor "456" deve estar na lista

    Scenario: Obter post de fórum por ID
        Given existe um post de fórum com o id "1410"
        And o post possui o título "Meu Post", conteúdo "Este é o conteúdo do meu post" e autor usuário de id "123"
        When uma requisição "GET" é feita para "/forum/1410"
        Then o status de resposta deve ser "200"
        And o JSON de resposta deve conter id "1410", título "Meu Post", conteúdo "Este é o conteúdo do meu post" e autor "123"

    Scenario: Editar post de fórum por ID
        Given existe um post de fórum com o id "1410"
        And o post possui o título "Meu Post", conteúdo "Este é o conteúdo do meu post" e autor usuário de id "123"
        When uma requisição "PUT" é feita para "/forum/1410" com o JSON {"conteudo": "Este é o novo conteúdo do meu post"}
        Then o status de resposta deve ser "200"
        And o JSON de resposta deve conter id "1410", título "Meu Post", conteúdo "Este é o novo conteúdo do meu post" e autor "123"

    Scenario: Excluir post de fórum por ID
        Given existe um post de fórum com o id "1410"
        And o post possui o título "Meu Post", conteúdo "Este é o conteúdo do meu post" e autor usuário de id "123"
        When uma requisição "DELETE" é feita para "/forum/1410"
        Then o status de resposta deve ser "200"
        And o JSON de resposta deve conter uma mensagem de confirmação de exclusão