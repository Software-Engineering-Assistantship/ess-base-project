Feature: Exibir Histórico de Vídeos/Séries Assistidos e Assistidos Recentemente

  As a usuário
  I want Quero ver meu histórico de vídeos e séries assistidos
  So that eu possa acompanhar o que assisti e ver os itens assistidos recentemente

    Scenario: Registrar primeira visualização
      Given o usuário "Lucas Sales" está na página "Inicial"
      And "Lucas Sales" não possui nenhum vídeo em seu histórico
      When "Lucas Sales" seleciona o vídeo "Breaking Bad - Episódio 1" para assistir
      Then "Lucas Sales" acessa a página "Histórico"
      And "Lucas Sales" vê "Breaking Bad - Episódio 1" no histórico

    Scenario: Paginação do histórico (2 vídeos por página)
      Given o usuário "Lucas Sales" está na página "Histórico"
      And "Lucas Sales" possui os seguintes 3 vídeos em seu histórico:
        | ID | Título                         |
        |  1 | "Breaking Bad - Episódio 1"    |
        |  2 | "Breaking Bad - Episódio 2"    |
        |  3 | "Stranger Things - Episódio 1" |
      When a página "Histórico" é exibida
      Then o sistema mostra os 2 primeiros vídeos:
        | "Breaking Bad - Episódio 1" |
        | "Breaking Bad - Episódio 2" |
      
      When "Lucas Sales" seleciona a opção "Próximo"
      Then o sistema mostra:
        | "Stranger Things - Episódio 1" |
      
      When "Lucas Sales" seleciona a opção "Anterior"
      Then o sistema mostra novamente:
        | "Breaking Bad - Episódio 1" |
        | "Breaking Bad - Episódio 2" |

    Scenario: Exibir mensagem para usuário sem histórico
      Given o usuário "Lucas Sales" está na página "Histórico"
      And "Lucas Sales" não possui nenhum vídeo em seu histórico
      When a página "Histórico" é carregada
      Then o sistema exibe a mensagem "Você ainda não assistiu a nenhum vídeo."
      And o sistema recomenda o vídeo "Stranger Things - Episódio Piloto"

    Scenario: Reassistir um vídeo já visto
      Given o usuário "Lucas Sales" está na página "Inicial"
      And "Lucas Sales" já assistiu o vídeo "Game of Thrones - T1 E1"
      When "Lucas Sales" seleciona novamente o vídeo "Game of Thrones - T1 E1"
      Then o sistema atualiza a data de visualização de "Game of Thrones - T1 E1"
      And o vídeo "Game of Thrones - T1 E1" permanece no histórico de "Lucas Sales"