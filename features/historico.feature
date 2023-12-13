Feature: Histórico de Pagamentos
    As a usuário do Ecommerce
    I want to vizualiazar o histórico de pagamentos do Sistema
    So that posso acessar meu histórico de pagamentos e filtrar 

Scenario: Visualizar o Histórico de Pagamentos
Given que o usuário "Sara Silva" está na página "Home"
When clica em "Historico"
Then uma mensagem de confirmação é exibida indicando que "Pagamento cadastrado com sucesso"

Scenario: Visualizar o Histórico de Pagamentos no Último mês
Given que o usuário "Sara Silva" está na página "Historico"
And clica no Icone de "Filtro" 
when clica no campo de Último mês
And clica em "Confirmar"
Then eu consigo visualizar o historico de pagamentos do ultimo mês

Scenario: Visualizar o Histórico de Pagamentos no Último Trimestre
Given que o usuário "Sara Silva" está na página "Historico"
And clica no Icone de "Filtro" 
when clica no campo de Último Trimestre
And clica em "Confirmar"
Then eu consigo visualizar o historico de pagamentos do último Trimestre

Scenario: Visualizar o Histórico de Pagamentos no Último Ano
Given que o usuário "Sara Silva" está na página "Historico"
And clica no Icone de "Filtro" 
when clica no campo de Último Ano
And clica em "Confirmar"
Then eu consigo visualizar o historico de pagamentos do último Ano

Scenario: Falha na Visualização o Histórico de Pagamentos
    Given que o usuário "Rose Silva" está na página de "Home"
    When clica em "Historico"
    And não aparece nenhum dado no historico
    Then uma mensagem é exibida indicando que "Nenhum Cadastro de Pagamentos ainda!"

Scenario: Falha ao Filtrar de Pagamentos no Último mês
Given que o usuário "Sara Silva" está na página "Historico"
And clica no Icone de "Filtro" 
when clica no campo de Último mês
And clica em "Confirmar"
And não aparece nenhum dado no historico
Then uma mensagem é exibida indicando que "Nenhum Cadastro de Pagamentos ainda!"


Scenario: Falha ao Filtrar de Pagamentos no Último Trimestre
Given que o usuário "Sara Silva" está na página "Historico"
And clica no Icone de "Filtro" 
when clica no campo de Último Trimestre
And clica em "Confirmar"
And não aparece nenhum dado no historico
Then uma mensagem é exibida indicando que "Nenhum Cadastro de Pagamentos ainda!"



Scenario: Falha ao Filtrar de Pagamentos no Último Ano
Given que o usuário "Sara Silva" está na página "Historico"
And clica no Icone de "Filtro" 
when clica no campo de Último Ano
And clica em "Confirmar"
And não aparece nenhum dado no historico
Then uma mensagem é exibida indicando que "Nenhum Cadastro de Pagamentos ainda!"




