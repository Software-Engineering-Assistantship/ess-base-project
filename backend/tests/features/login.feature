Feature: Login
As a Usuário
I want to fazer login no sistema
So that eu possa realizar ações no site de acordo com minha credencial

Scenario: Acessar tela de login
Guiven o usuário está na tela inicial
When o usuário clica no botão de login
Then o usuário é redirecionado para a página de login

Scenário: login feito com sucesso
Guiven o usuário está cadastrado no sistema
And o usuário é "iasm" e senha "brenoétop"
When o usuário coloca "iasm" no campo usuário
And "brenoétop" no campo senha
Then o usuário recebe uma mensagem de confirmação
And fica logado no sistema

Scenário: falha no login pela senha
Guiven o usuário está cadastrado no sistema
And o usuário usuário é "iasm" e senha "brenoétop"
When o usuário coloca "iasm" no campo usuário
And "12345" no campo senha
Then o usuário recebe uma mensagem de erro
And continuo na tela de login

Scenário: falha no login pelo usuário
Guiven o usuário não está cadastrdo
When o usuário coloca "iasm" no campo usuário
And "12345" no campo senha
Then o usuário recebe uma mensagem de erro
And continuo na tela de login
