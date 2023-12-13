Feature: Página Inicial
As a usuário do sistema
I want to acessar as cadeiras disponíveis no sistema
So that para que eu possa visualizar e postar reviews

Scenario: Carregamento com sucesso das reviews mais recentes
Given que a última review cadastrada foi a review com conteúdo "Muita ML" na cadeira "Inglês para Computação"
And que a penúltima review cadastrada foi a review com conteúdo "Típica cadeira da área 2" na cadeira "Física 3"
And que a antipenúltima review cadastrada foi a review com conteúdo "Trabalhosa, muitas atividades" na cadeira "Engenharia de Software e Sistemas"
When carrego "página inicial"
Then visualizo a review com conteúdo "Muita ML" na cadeira "Inglês para Computação"
And visualizo a review com conteúdo "Típica cadeira da área 2" na cadeira "Física 3"
And visualizo a review com conteúdo "Trabalhosa, muitas atividades" na cadeira "Engenharia de Software e Sistemas".

Scenario: Sem review cadastradas
Given que não há reviews cadastradas no sistema
When carrego "página inicial"
Then não visualizo nenhum comentário
And não visualizo a seção "Em Alta".

Scenario: Carregamento com sucesso das cadeiras na seção Em Alta
Given que a cadeira "Inglês para Computação" tem o maior número de reviews
And que a cadeira "Física 3" tem o segundo maior número de reviews 
And que a cadeira "Engenharia de Software e Sistemas" tem o terceiro maior número de reviews 
And que a cadeira "Cálculo 1" tem o quarto maior número de reviews 
When carrego "página inicial"
Then visualizo as cadeiras "Inglês para Computação", "Física 3", "Engenharia de Software e Sistemas" e "Cálculo 1" na seção "Em Alta"

Scenario: Carregamento com sucesso das cadeiras
Given que a cadeira "Inglês para Computação" está cadastrada no sistema
And a cadeira "Física 3" está cadastrada no sistema
And a cadeira "Engenharia de Software e Sistemas" está cadastrada no sistema
And a cadeira "Cálculo 1" está cadastrada no sistema
When carrego "página inicial"
Then visualizo as cadeiras "Inglês para Computação", "Física 3", "Engenharia de Software e Sistemas" e "Cálculo 1" na seção “Cadeiras”.

Scenario: Sem cadeiras cadastradas
Given que nenhuma cadeira está cadastrada no sistema
When carrego "página inicial"
Then o sistema deve enviar uma mensagem de “nenhumaCadeiraRegistrada”.

Scenario: Busca pelo nome da cadeira com sucesso
Given que a cadeira "Inglês para Computação" está cadastrada no sistema
And a cadeira "Física 3" está cadastrada no sistema
And a cadeira "Engenharia de Software e Sistemas" está cadastrada no sistema
And a cadeira "Cálculo 1" está cadastrada no sistema
When pesquiso "is"
Then visualizo as cadeiras "Física 3" e "Engenharia de Software e Sistemas" na seção “Cadeiras”.

Scenario: Busca pelo nome da cadeira sem sucesso
Given que a cadeira "Inglês para Computação" está cadastrada no sistema
And a cadeira "Física 3" está cadastrada no sistema
And a cadeira "Engenharia de Software e Sistemas" está cadastrada no sistema
And a cadeira "Cálculo 1" está cadastrada no sistema
When pesquiso "isa"
Then o sistema deve enviar uma mensagem de “nenhumaCadeiraEncontrada”.

Scenario: Aplicação do filtro com sucesso
Given que a cadeira "Inglês para Computação" está cadastrada no sistema
And a cadeira "Física 3" está cadastrada no sistema
And a cadeira "Engenharia de Software e Sistemas" está cadastrada no sistema
And a cadeira "Cálculo 1" está cadastrada no sistema
When aplico o filtro "6° Período"
Then visualizo as cadeiras "Inglês para Computação" e "Engenharia de Software e Sistemas" na seção “Cadeiras”.

Scenario: Aplicação do filtro sem sucesso
Given que a cadeira "Inglês para Computação" está cadastrada no sistema
And a cadeira "Física 3" está cadastrada no sistema
And a cadeira "Engenharia de Software e Sistemas" está cadastrada no sistema
And a cadeira "Cálculo 1" está cadastrada no sistema
When aplico o filtro "2° Período"
Then o sistema deve enviar uma mensagem de “nenhumaCadeiraEncontrada”.

Scenario: Aplicação de ordenação
Given que a cadeira "Inglês para Computação" está cadastrada no sistema
And a cadeira "Física 3" está cadastrada no sistema
And a cadeira "Engenharia de Software e Sistemas" está cadastrada no sistema
And a cadeira "Cálculo 1" está cadastrada no sistema
When ordeno por "ordem alfabética"
Then visualizo as cadeiras "Cálculo 1", "Engenharia de Software e Sistemas", "Física 3" e "Inglês para Computação" na seção “Cadeiras” nesta ordem.
