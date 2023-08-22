Scenery: Exibição de Top 5 Músicas Mais Escutadas

GIVEN “Ana” está na página inicial do site
AND O sistema possui as músicas “123”, “321”, “231”, “132”, “312”
WHEN “Ana” visualiza as seção "Mais Escutadas"
THEN As músicas “123”, “321”, “231”, “132”, “312” serão mostradas
AND a lista é atualizada a cada intervalo de tempo definido (por exemplo, a cada hora)

Scenery: Filtragem dos Mais Escutados e Mais Bem Avaliados por Gênero

GIVEN que o usuário “Ana” está na página inicial do site
AND o sistema possui a música "123" do gênero "POP" cadastrada
WHEN “Ana” abre a seção "Mais Escutados ou Mais Bem Avaliadas"
AND o usuário “Ana” seleciona o gênero musical "POP" do filtro de gênero
THEN o usuário "Ana" visualiza a música de título "123" e gênero "POP"

Cenário: Pesquisa Avançada nos Mais Escutados e Melhores Avaliados
GIVEN “Ana” está na página inicial
AND está na seção "Mais Escutados" ou "Mais Bem Avaliadas"
WHEN “Ana” seleciona múltiplos critérios de filtragem (como gênero, artista, data de lançamento)
THEN a lista é atualizada para mostrar apenas as músicas que correspondem a todos os critérios selecionados

Cenário: Mais Escutados entre amigos

Given "Ana" está na seção de "Mais Escutados"
And "Ana" clica para no filtro para "Apenas Amigos"
Then "Ana" vê que a música "132" é a mais escutada entre seus amigos
