Scenario: Música não encontrada
GIVEN que o sistema não possui na base de dados a música de nome 'Lover'
WHEN uma requisição "GET" for enviada para "/music/details/Lover"
THEN o status da resposta deve ser "404"
AND o JSON da resposta deve conter um campo "msg'" com o valor "Sinto muito, ‘Lover’ não encontrada no sistema"

Scenario: Música indisponível em todos os serviços externos
GIVEN o MusicService informa que a música “Lover” não está disponível em nenhum serviço externo
WHEN uma requisição "GET" for enviada para "/music/details/Lover"
THEN o status da resposta deve ser "404"
AND o JSON da resposta deve conter um campo “msg” com o valor "A música ‘Lover’ não está disponível em nenhum serviço externo no momento"

Scenario: Exibir preço da música em serviços pagos
GIVEN o MusicService retorna informações sobre a música “Lover” disponível no serviço "Apple Music" com preço de "5" reais
WHEN uma requisição "GET" for enviada para "/music/details/Lover"
THEN o status da resposta deve ser "200"
AND o JSON da resposta deve conter informações sobre a música de nome “Lover”, incluindo sua lista de serviços externos com nome “Spotify”, preço “10” e link externo “https://www.spotify.com/”

Scenario: Obter informações sobre a disponibilidade da música
GIVEN o MusicService retorna informações sobre a disponibilidade da música "Lover" para o usuário "Ana"
WHEN uma requisição "GET" for enviada para "/music/details/Lover"
THEN o status da resposta deve ser "200"
AND o JSON da resposta deve conter informações sobre a música de nome “Lover”, incluindo sua lista de serviços externos com nome “Spotify”, preço “10” e link externo “https://www.spotify.com/”