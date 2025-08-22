Feature: Exibir Histórico de Vídeos/Séries Assistidos e Assistidos Recentemente

  As a usuário
  I want Quero ver meu histórico de vídeos e séries assistidos
  So that eu possa acompanhar o que assisti e ver os itens assistidos recentemente


    Scenario: Registrar visualização ao acessar a página do vídeo
    Given o usuário está logado na plataforma
    And o usuário está na página inicial
    When o usuário seleciona e acessa o vídeo "Breaking Bad - Episódio 1"
    Then o usuário é redirecionado para a página de visualização do vídeo "Breaking Bad - Episódio 1"
    And "Breaking Bad - Episódio 1" aparece no topo do histórico de visualizações do usuário

    Cenário precisa ser concertado
    Scenario: Exibir 2 vídeos por página com botões de navegação
    Given o usuário está logado na plataforma
    And o usuário possui 3 vídeos assistidos no histórico
    When o usuário acessa a página de histórico de visualizações
    Then o sistema exibe os primeiros 2 vídeos (1 a 2) na primeira página
    
    When o usuário clica no botão "Próximo"
    Then o sistema exibe o último 1  vídeo na segunda página

    When o usuário clica no botão "anterior"
    Then o sistema exibe os últimos 2 vídeos (1 a 2) na primeira página 

	Scenario: Exibir mensagem padrão para usuários sem histórico de visualizações
    Given o usuário está logado na plataforma
    And o usuário nunca assistiu a nenhum vídeo/série
    When o usuário acessa a página de histórico de visualizações
    Then o sistema exibe a mensagem "Você ainda não assistiu a nenhum vídeo."
    And o sistema recomenda o vídeo mais assistido da plataforma "Stranger Things - Episódio Piloto"

	Scenario: Atualizar histórico ao assistir novamente um vídeo
    Given o usuário está logado na plataforma
    And o usuário já assistiu ao vídeo "Game of Thrones - Temporada 1, Episódio 1" no dia 01/01/2024
    When o usuário clica novamente no vídeo "Game of Thrones - Temporada 1, Episódio 1"
    Then o usuário é redirecionado para a página de visualização do vídeo "Game of Thrones - Temporada 1, Episódio 1"
    And "Game of Thrones - Temporada 1, Episódio 1" aparece no topo da lista de histórico de visualizações do usuário