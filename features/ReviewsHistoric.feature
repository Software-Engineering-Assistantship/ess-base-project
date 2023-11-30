Feature: Ver as reviews passadas de uma cadeira
As a usuário do sistema
I want to ser capaz de ver as reviews e opiniões de outros usuários
So that eu possa saber mais acerca da perspectiva de outras pessoas em relação à uma cadeira

Scenario 1: Ver as reviews passadas de uma cadeira
Given o usuário "Paulo" está logado e na página principal da cadeira "Sistemas Digitais"
And outro usuário logado como "Marcela" cadastrou previamente uma review com nota "9" para a disciplina "Sistema Digitais"
When o usuário "Paulo" ir para a seção de "Reviews" na página de "Sistemas Digitais"
Then o usuário "Paulo" irá ver a review de "Marcela", que irá dar nota "9" para a cadeira "Sistemas Digitais"

Scenario 2: Ordenar as reviews de uma cadeira da mais nova até a mais antiga
Given o usuário "Paulo" está logado e na página principal da cadeira "Sistemas Digitais" no dia "1/3/2023"
And outro usuário logado como "Marcela" cadastrou previamente uma review com nota "9" para a disciplina "Sistema Digitais"  no dia "20/1/2023"
And outro usuário logado como "Thiago" cadastrou previamente uma review com nota "8" para a disciplina "Sistema Digitais"  no dia "1/2/2023"
When o usuário "Paulo" ir para a seção de "Reviews" na página de "Sistemas Digitais"
Then o usuário "Paulo" irá ver primeiro a review de "Thiago", com nota "8", e, logo abaixo, o usuário "Paulo" irá ver a review de "Marcela", com nota "9"