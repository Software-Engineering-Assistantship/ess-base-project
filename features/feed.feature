Feature: Página Inicial
As a usuário do sistema
I want to visualizar as turmas disponíveis no sistema
So that para que eu possa visualizar e postar reviews

Scenario: Carregamento com sucesso das cadeiras
Given a seção “1° período - EC”
When cadastro com sucesso a turma “AVLC” como uma turma d “1° Período” e de “EC”
Then a seção “1° período - EC” deve exibir a turma “AVLC”.

Scenario: Sem cadeiras cadastradas
Given que nenhuma cadeira está cadastrada na seção “1° período - EC”
When carregar a seção “1° período - EC”
Then o sistema deve enviar uma mensagem de “nenhumaCadeiraRegistrada”.

Scenario: Busca pelo nome da turma com sucesso
As turmas cadastradas com correspondência parcial à busca devem ser exibidas.

Scenario: Aplicação do filtro com sucesso
Ao aplicar um dos filtros disponíveis, apenas as turmas que atendem àquela condição devem ficar disponíveis.
"último cenário do arquivo precisa de um passo adicional nos resultados esperados (Then)"

Scenario: Nenhum conteúdo registrado
Se nenhuma turma estiver cadastrada, deve aparecer uma mensagem na tela inicial.

Scenario: Carregamento do conteúdo com sucesso
As turmas cadastradas devem aparecer na sua respectiva seção ao acessar o sistema.
"ajuste no cenário fix"
