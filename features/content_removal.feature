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

Given que “Ana” está logada na aplicação
And “Ana” está na página de edição de um review “123” que ela criou anteriormente
When “Ana” decide remover o review “123” enquanto está na página de edição
And clica no botão de remoção do review “123”
Then uma janela de confirmação é exibida perguntAndo se ele realmente deseja remover o review “123”
And “Ana” confirma a remoção do review “123” na janela de confirmação
Then o review “123” é removido da aplicação
And “Ana” é redirecionada para a página de reviews
And o review “123” removido não é mais exibido na página de reviews
And uma mensagem de confirmação é exibida informando que o review “123” foi removido com sucesso
Then test test test

# DEV NEW SCENARIO
Given “Ana” está logada na aplicação
And “Ana” tem permissão de ““edição/remoção””
And “Ana” está na aba “músicas” da página de conteúdos
When “Ana” localiza uma música de ID “123” e deseja remover
And “Ana” clica em um botão de remoção próximo à música de ID “123”
And “Ana” confirma a remoção no pop-up
Then A música de ID “123” é removida da aplicação 
And A música de ID “123” não é mais exibida na página de conteúdos
Then AJUSTANDO CENARIO TESTE
And ajustanddo mais uma vez

TESTE UM DOIS TRES
