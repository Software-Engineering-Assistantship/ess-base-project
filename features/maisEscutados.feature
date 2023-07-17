Scenery: Exibição de Top 5 Músicas Mais Escutadas

GIVEN “Ana” está na página inicial do site
AND O sistema possui as músicas “123”, “321”, “231”, “132”, “312”
WHEN “Ana” visualiza as seção "Mais Escutadas"
THEN As músicas “123”, “321”, “231”, “132”, “312” serão mostradas
AND a lista é atualizada a cada intervalo de tempo definido (por exemplo, a cada hora)

AND modifiquei o arquivo .features

Cenário: Pesquisa Avançada nos Mais Escutados e Melhores Avaliados
GIVEN “Ana” está na página inicial
AND está na seção "Mais Escutados" ou "Mais Bem Avaliadas"
WHEN “Ana” seleciona múltiplos critérios de filtragem (como gênero, artista, data de lançamento)
THEN a lista é atualizada para mostrar apenas as músicas que correspondem a todos os critérios selecionados
AND a lista é classificada em ordem decrescente com base na classificação média e no número de reproduções

