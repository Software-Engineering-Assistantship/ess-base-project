Feature: Video Service

  Scenario: Retornar vídeo por videoId
    Given o método getVideo do VideoService retorna um vídeo com videoId "101", título "Stranger Things - Piloto" e duração "45 minutos"
    When o método getVideo do VideoService for chamado com o id "101"
    Then o vídeo retornado deve ter videoId "101", título "Stranger Things - Piloto" e duração "45 minutos"
