Feature: Remoção de conteúdo 

    É possível remover um conteúdo do sistema ao selecionar o conteúdo que deseja remover e clicar no botão "Remover conteúdo" na página de conteúdos.

Given “Ana” está logada na aplicação
And “Ana” tem permissão de ““edição/remoção””
And “Ana” está na aba “músicas” da página de conteúdos
When “Ana” localiza uma música de ID “123” e deseja remover
And “Ana” clica em um botão de remoção próximo à música de ID “123”
And “Ana” confirma a remoção no pop-up
Then A música de ID “123” é removida da aplicação 
And A música de ID “123” não é mais exibida na página de conteúdos