Feature: P�gina Inicial
As a usu�rio do sistema
I want to acessar as cadeiras dispon�veis no sistema
So that para que eu possa visualizar e postar reviews

Scenario: Carregamento com sucesso das reviews mais recentes
Given que a �ltima review cadastrada foi a review com conte�do "Muita ML" na cadeira "Ingl�s para Computa��o"
And que a pen�ltima review cadastrada foi a review com conte�do "T�pica cadeira da �rea 2" na cadeira "F�sica 3"
And que a antipen�ltima review cadastrada foi a review com conte�do "Trabalhosa, muitas atividades" na cadeira "Engenharia de Software e Sistemas"
When carrego "p�gina inicial"
Then visualizo a review com conte�do "Muita ML" na cadeira "Ingl�s para Computa��o"
And visualizo a review com conte�do "T�pica cadeira da �rea 2" na cadeira "F�sica 3"
And visualizo a review com conte�do "Trabalhosa, muitas atividades" na cadeira "Engenharia de Software e Sistemas".

Scenario: Sem review cadastradas
Given que n�o h� reviews cadastradas no sistema
When carrego "p�gina inicial"
Then n�o visualizo nenhum coment�rio
And n�o visualizo a se��o "Em Alta".

Scenario: Carregamento com sucesso das cadeiras na se��o Em Alta
Given que a cadeira "Ingl�s para Computa��o" tem o maior n�mero de reviews
And que a cadeira "F�sica 3" tem o segundo maior n�mero de reviews 
And que a cadeira "Engenharia de Software e Sistemas" tem o terceiro maior n�mero de reviews 
And que a cadeira "C�lculo 1" tem o quarto maior n�mero de reviews 
When carrego "p�gina inicial"
Then visualizo as cadeiras "Ingl�s para Computa��o", "F�sica 3", "Engenharia de Software e Sistemas" e "C�lculo 1" na se��o "Em Alta"

Scenario: Carregamento com sucesso das cadeiras
Given que a cadeira "Ingl�s para Computa��o" est� cadastrada no sistema
And a cadeira "F�sica 3" est� cadastrada no sistema
And a cadeira "Engenharia de Software e Sistemas" est� cadastrada no sistema
And a cadeira "C�lculo 1" est� cadastrada no sistema
When carrego "p�gina inicial"
Then visualizo as cadeiras "Ingl�s para Computa��o", "F�sica 3", "Engenharia de Software e Sistemas" e "C�lculo 1" na se��o �Cadeiras�.

Scenario: Sem cadeiras cadastradas
Given que nenhuma cadeira est� cadastrada no sistema
When carrego "p�gina inicial"
Then o sistema deve enviar uma mensagem de �nenhumaCadeiraRegistrada�.

Scenario: Busca pelo nome da cadeira com sucesso
Given que a cadeira "Ingl�s para Computa��o" est� cadastrada no sistema
And a cadeira "F�sica 3" est� cadastrada no sistema
And a cadeira "Engenharia de Software e Sistemas" est� cadastrada no sistema
And a cadeira "C�lculo 1" est� cadastrada no sistema
When pesquiso "is"
Then visualizo as cadeiras "F�sica 3" e "Engenharia de Software e Sistemas" na se��o �Cadeiras�.

Scenario: Busca pelo nome da cadeira sem sucesso
Given que a cadeira "Ingl�s para Computa��o" est� cadastrada no sistema
And a cadeira "F�sica 3" est� cadastrada no sistema
And a cadeira "Engenharia de Software e Sistemas" est� cadastrada no sistema
And a cadeira "C�lculo 1" est� cadastrada no sistema
When pesquiso "isa"
Then o sistema deve enviar uma mensagem de �nenhumaCadeiraEncontrada�.

Scenario: Aplica��o do filtro com sucesso
Given que a cadeira "Ingl�s para Computa��o" est� cadastrada no sistema
And a cadeira "F�sica 3" est� cadastrada no sistema
And a cadeira "Engenharia de Software e Sistemas" est� cadastrada no sistema
And a cadeira "C�lculo 1" est� cadastrada no sistema
When aplico o filtro "6� Per�odo"
Then visualizo as cadeiras "Ingl�s para Computa��o" e "Engenharia de Software e Sistemas" na se��o �Cadeiras�.

Scenario: Aplica��o do filtro sem sucesso
Given que a cadeira "Ingl�s para Computa��o" est� cadastrada no sistema
And a cadeira "F�sica 3" est� cadastrada no sistema
And a cadeira "Engenharia de Software e Sistemas" est� cadastrada no sistema
And a cadeira "C�lculo 1" est� cadastrada no sistema
When aplico o filtro "2� Per�odo"
Then o sistema deve enviar uma mensagem de �nenhumaCadeiraEncontrada�.

Scenario: Aplica��o de ordena��o
Given que a cadeira "Ingl�s para Computa��o" est� cadastrada no sistema
And a cadeira "F�sica 3" est� cadastrada no sistema
And a cadeira "Engenharia de Software e Sistemas" est� cadastrada no sistema
And a cadeira "C�lculo 1" est� cadastrada no sistema
When ordeno por "ordem alfab�tica"
Then visualizo as cadeiras "C�lculo 1", "Engenharia de Software e Sistemas", "F�sica 3" e "Ingl�s para Computa��o" na se��o �Cadeiras� nesta ordem.
