Scenario: Obter músicas em alta
GIVEN o MusicService retorna “Lover”, “Vampire” e “August” que estão em alta
WHEN uma requisição "GET" for enviada para "/music/highlights"
THEN o status da resposta deve ser "200"
AND o JSON da resposta deve conter as músicas  “Lover”, “Vampire” e “August”, cada uma com título, artista e pontuação média

Scenario: Ordenar músicas em alta por popularidade
GIVEN o MusicService retorna “Lover”, “Vampire” e “August” que estão em alta
WHEN uma requisição "GET" for enviada para "/music/highlights" com o parâmetro "sort" com o valor "Popularity"
THEN o status da resposta deve ser "200"
AND o JSON da resposta deve conter as músicas “Lover”, “Vampire” e “August” ordenadas por popularidade
AND a primeira música da lista deve ter a maior pontuação de popularidade