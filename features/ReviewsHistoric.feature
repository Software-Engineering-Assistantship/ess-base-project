Feature: Ver as reviews passadas de uma cadeira
As me
I want to ser capaz de ver as reviews e opiniões de outros usuários
So that eu possa saber mais acerca da perspectiva de outras pessoas em relação à uma cadeira

Scenario 1: Ver as reviews passadas de uma cadeira
Given o usuário "Paulo" está logado e na página principal da cadeira "Sistemas Digitais"
And outro usuário logado como "Marcela" cadastrou previamente uma review com nota "9" para a disciplina "Sistema Digitais"
When o usuário "Paulo" ir para a seção de "Reviews" na página de "Sistemas Digitais"
Then o usuário "Paulo" irá ver a review de "Marcela", que irá dar nota "9" para a cadeira "Sistemas Digitais"

Scenario 2: Ordenar as reviews de uma cadeira da mais nova até a mais antiga
Given o usuário "Paulo" está logado e na página principal da cadeira "Sistemas Digitais" no dia "29/3/2023"
And outro usuário logado como "Marcela" cadastrou previamente uma review com nota "9" para a disciplina "Sistema Digitais"  no dia "20/1/2023"
And outro usuário logado como "Thiago" cadastrou previamente uma review com nota "8" para a disciplina "Sistema Digitais"  no dia "1/2/2023"
When o usuário "Paulo" ir para a seção de "Reviews" na página de "Sistemas Digitais"
Then o usuário "Paulo" irá ver primeiro a review de "Thiago", com nota "8", e, logo abaixo, o usuário "Paulo" irá ver a review de "Marcela", com nota "9"

Scenario 3: Visualizar a média geral das notas das reviews de uma cadeira
Given o usuário "Paulo" está logado
And outro usuário logado como "Marcela" cadastrou previamente uma review com nota "4" para a disciplina "Sistema Digitais"
And outro usuário logado como "Thiago" cadastrou previamente uma review com nota "8" para a disciplina "Sistema Digitais"
And outro usuário logado como "Camila" cadastrou previamente uma review com nota "9" para a disciplina "Sistema Digitais"
When o usuário "Paulo"acessar a página principal da cadeira "Sistemas Digitais"
Then  o usuário "Paulo" irá ver a nota "7" na seção "média das reviews" na página principal da cadeira "Sistemas Digitais"

Scenario 4: Tentar visualizar as reviews de uma cadeira sem reviews cadastrados
Given o usuário "Paulo" está logado e na página principal da cadeira "Sanidade"
And não há reviews cadastradas na cadeira "Sanidade"
When o usuário "Paulo" ir para a seção de "Reviews" na página de "Sanidade"
Then uma mensagem indicando ausência de reviews será mostrada para o usuário "Paulo"

Scenario 5: Ordenar as reviews de uma cadeira da mais antiga até a mais nova
Given o usuário "Paulo" está vendo as reviews da cadeira "Métodos Numéricos"
When o usuário "Paulo" seleciona que quer ordenar as reviews por publicações mais antigas
Then o usuário "Paulo" irá ver as reviews de forma ordenada, da mais antiga até a mais recente
