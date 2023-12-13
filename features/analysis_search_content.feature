Scenario: Descobrir um restaurante novo
         Given o usuário “Laís” está na página inicial do sistema
         When o usuário “Laís” visualiza um ponto gastronômico  chamado “Casa dos Doces”
         And clica no ícone de “Casa dos Doces”
         Then os dados registrados de “Casa dos Doces” serão exibidos
         
Scenario: Seção “Em alta” quando existem restaurantes cadastrados no sistema
         Given o usuário “Laís” está na página inicial do sistema
         When o usuário “Laís” visualiza a seção “Reviews em Alta”
         Then a review “Coxinha fria” estará nessa seção
         And ao clicar em “Coxinha fria”
         Then o conteúdo em “Coxinha fria” será exibido 
         
Scenario: Seção “Mais vistos” quando existem restaurantes cadastrados no sistema
         Given o usuário “Laís” está na página inicial do sistema
         When o usuário “Laís” visualiza a seção “Mais vistos”
         Then a review “O melhor bem-casado da cidade ” estará nessa seção
         And ao clicar em “O melhor bem-casado da cidade”
         Then o conteúdo em “Coxinha fria” será exibido

Scenario: “Busca com filtro” quando existem restaurantes cadastrados no sistema
         Given o usuário “Laís” está em qualquer página do sistema
         When o usuário “Laís” seleciona o filtro “Confeitaria”
         Then o resultado da pesquisa terá somente restaurantes com o filtro “Confeitaria”
