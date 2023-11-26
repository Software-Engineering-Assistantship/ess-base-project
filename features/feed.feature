Feature: P�gina Inicial
As a usu�rio do sistema
I want to visualizar as turmas dispon�veis no sistema
So that para que eu possa visualizar e postar reviews

Scenario: Carregamento com sucesso das cadeiras
Given a se��o �1� per�odo - EC�
When cadastro com sucesso a turma �AVLC� como uma turma d �1� Per�odo� e de �EC�
Then a se��o �1� per�odo - EC� deve exibir a turma �AVLC�.

Scenario: Sem cadeiras cadastradas
Given que nenhuma cadeira est� cadastrada na se��o �1� per�odo - EC�
When carregar a se��o �1� per�odo - EC�
Then o sistema deve enviar uma mensagem de �nenhumaCadeiraRegistrada�.

Scenario: Busca pelo nome da turma com sucesso
As turmas cadastradas com correspond�ncia parcial � busca devem ser exibidas.


Scenario: Aplica��o do filtro com sucesso
Ao aplicar um dos filtros dispon�veis, apenas as turmas que atendem �quela condi��o devem ficar dispon�veis.
