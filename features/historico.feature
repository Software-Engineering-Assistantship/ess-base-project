Feature: Histórico de Pagamentos
    As a usuário do Ecommerce
    I want to vizualiazar o histórico de pagamentos que realizei no Sistema
    So that posso acessar meu histórico de pagamentos e filtrar 

Scenario: Visualizar o Histórico de Pagamentos
Given que estou autenticado no sistema como usuário registrado
And eu tenho pagamnetos anteriores registrados no sistema
When eu navego até a página de Histórico de Pagamentos
Then eu devo visualizar uma lista dos meus pagamentos anteriores
And cada pagamento deve exibir informações como data, preço, produto ????


Scenario: Filtra o Histórico de Pagamentos para Último mês
Given que o usuário autenticado está na página "Historico"
And clica no Icone de "Filtro" 
And eu tenho pagamnetos anteriores do último mês registrados no sistema
When clica no campo de Último mês
And clica em "Confirmar"
Then a lista de pagamentos exibida é limitada ao último mês
And cada pagamento deve exibir informações como data, preço, produto
And o total de pagamentos para o último mês é exibido na página
And o usuário pode voltar ao histórico completo removendo o filtro

Scenario: Filtra o Histórico de Pagamentos para Último Trimestre
Given que o usuário autenticado está na página "Historico"
And clica no Icone de "Filtro" 
And eu tenho pagamnetos anteriores do Último Trimestre registrados no sistema
When clica no campo de Último Trimestre
And clica em "Confirmar"
Then a lista de pagamentos exibida é limitada ao Último Trimestre
And cada pagamento deve exibir informações como data, preço, produto
And o total de pagamentos para o Último Trimestre é exibido na página
And o usuário pode voltar ao histórico completo removendo o filtro


Scenario: Filtra o Histórico de Pagamentos para Último Ano
Given que o usuário autenticado está na página "Historico"
And clica no Icone de "Filtro" 
And eu tenho pagamnetos anteriores do Último Ano registrados no sistema
When clica no campo de Último Ano
And clica em "Confirmar"
Then a lista de pagamentos exibida é limitada ao Último Ano
And cada pagamento deve exibir informações como data, preço, produto
And o total de pagamentos para o Último Ano é exibido na página
And o usuário pode voltar ao histórico completo removendo o filtro


Scenario: Falha na Visualização o Histórico de Pagamentos
Given que estou autenticado no sistema como usuário registrado
When eu navego até a página de Histórico de Pagamentos
And não aparece nenhum dado no historico
Then uma mensagem é exibida indicando que "Nenhum Cadastro de Pagamentos ainda!"


Scenario: Falha ao Filtrar de Pagamentos no Último mês
Given que o usuário autenticado está na página "Historico"
And clica no Icone de "Filtro" 
When clica no campo de Último mês
And clica em "Confirmar"
And não aparece nenhum dado no historico
Then uma mensagem é exibida indicando que "Nenhum Cadastro de Pagamentos ainda!"


Scenario: Falha ao Filtrar de Pagamentos no Último Trimestre
Given que o usuário autenticado está na página "Historico"
And clica no Icone de "Filtro" 
When clica no campo de Último Trimestre
And clica em "Confirmar"
And não aparece nenhum dado no historico
Then uma mensagem é exibida indicando que "Nenhum Cadastro de Pagamentos ainda!"


Scenario: Falha ao Filtrar de Pagamentos no Último Ano
Given que o usuário autenticado está na página "Historico"
And clica no Icone de "Filtro" 
When clica no campo de Último Ano
And clica em "Confirmar"
And não aparece nenhum dado no historico
Then uma mensagem é exibida indicando que "Nenhum Cadastro de Pagamentos ainda!"





