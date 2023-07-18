Feature: Em Alta

    A feature destaca as 10 músicas mais repercutidas da última semana, fornecendo aos usuários uma visão atualizada das tendências musicais e permitindo que eles descubram novas músicas populares e interessantes.

Scenario: Exibir informações sobre as músicas em alta
GIVEN que o usuário “Ana” está na página de “Reviews” 
WHEN o usuário “Ana” clicar no “Em alta”
THEN o usuário “Ana” deve ser redirecionado à uma página de “Em alta”
AND o usuário “Ana” deve visualizar uma lista das músicas em alta com algumas informações sobre a música (título, cantor, capa do álbum)

Scenario: Filtrar músicas em alta por gênero musical
GIVEN que o usuário “Ana” está na página de “Em alta” 
AND que existem músicas disponíveis no sistema
WHEN o usuário “Ana” clicar no ícone “filtros”
AND escolher um gênero musical dentre as opções listadas
THEN o usuário “Ana” deve ser redirecionado à uma nova página com uma lista das músicas em alta apenas no gênero selecionado

Scenario: Busca por gênero
GIVEN o usuário “Ana” está na página de “Reviews”
AND o usuário “Ana” quer achar a review de uma música “Cruel Summer” do género POP
WHEN o usuário “Ana” clica no “filtro” de busca
AND o usuário “Ana” escolhe o gênero POP na categoria de “Gêneros” no filtro
THEN é exibida uma lista de resultados onde ela visualiza a música de título " “Cruel Summer" desejada e todas as outras com mesmo nome

Scenario: Busca por artista 
GIVEN o usuário “Ana” está na página de “Reviews”
AND o usuário “Ana” quer achar a review da música  “Lover”  da “Taylor Swift”
WHEN o usuário “Ana” insere o nome da Taylor Swift em “buscar”
THEN é exibida uma lista de resultados, exibindo as músicas e álbuns da “Taylor Swift”

Scenario: Busca avançada com múltiplos filtros
GIVEN o usuário “Ana” está na página de “Reviews”
AND o usuário”Ana” quer achar a review da música “Lover” da “Taylor Swift” que é POP e está nas mais bem avaliadas
WHEN o usuário “Ana” clica no “filtro” de busca
AND o usuário “Ana” escolhe o gênero POP na categoria de “Gêneros” no filtro e clica do mais popular pro menos popular na categoria “popularidade”, buscando por “Taylor Swift” no “Buscar” 
THEN os resultados são apresentados com base nos critérios escolhidos, fornecendo uma lista personalizada de músicas e álbuns da “Taylor Swift”, do mais popular para o menos popular que são do gênero POP.