Feature: Sistema de Visibilidade de Vídeos

  As um usuário
  I want visualizar vídeos com uma interface de reprodução e interações
  So that eu possa assistir, curtir ou compartilhar os vídeos facilmente.

    Scenario: Compartilhar vídeo copiando a URL
    Given o usuário está na página de visualização do vídeo "Stranger Things - Episódio Piloto"
    When o usuário clica no botão "Compartilhar"
    And o usuário clica em "Copiar URL"
    Then a URL da página de visualização do vídeo "Stranger Things - Episódio Piloto" é copiada para a área de transferência
    And o usuário vê uma confirmação "URL copiada com sucesso!"

    Scenario: Registrar visualização no histórico ao acessar a página de visualização
    Given o usuário está logado na plataforma
    And o usuário possui o vídeo "The Office - Episódio 3" no banco de dados
    When o usuário clica no vídeo "The Office - Episódio 3"
    Then o usuário é redirecionado para a página de visualização do vídeo "The Office - Episódio 3"
    And "The Office - Episódio 3" aparece no topo da lista de histórico de visualizações do usuário

    Scenario: Acessar a página de visualização sem estar logado
    Given o usuário não está logado na plataforma
    When o usuário tenta acessar a página de visualização do vídeo "Friends - Episódio 5" diretamente via URL
    Then o sistema redireciona o usuário para a página de login
    And exibe a mensagem "Por favor, faça login para acessar o vídeo."

    Cenário precisa ser concertado
    Scenario: Exibir elementos essenciais na página de visualização
    Given o usuário está logado na plataforma
    And o usuário está na página inicial
    When o usuário clica no vídeo "Breaking Bad - Temporada 1, Episódio 1"
    Then a página de visualização do vídeo "Breaking Bad - Temporada 1, Episódio 1" é exibida