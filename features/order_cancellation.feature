Feature: Cancelamento de Pedidos.
As um usuário. 
I want to acessar os Pedidos e ter a possibilidade de solicitar o cancelamento de um pedido.
So that quando eu tiver algum contratempo ou mudar de ideia, eu possa cancelar o meu pedido.

Scenario: Cancelar pedido com status "Confirmado" e dentro do tempo limite (5 minutos).
Given eu estou logado como "Hugo" com senha "senha_userHugo".
And eu estou na página "Pedidos". 
And "Hugo" finalizou o pedido "#01" há "3" minutos.
And o status do pedido "#01" é "Confirmado".
When seleciona a opção "Cancelar Pedido" do pedido "#01". 
Then aparece a "Janela  de Confirmacao".

Scenario: Falha ao cancelar pedido após o tempo limite (5 minutos).
Given eu estou logado como "Cleber" com senha "senha_userCleber".
And eu estou na página "Pedidos". 
And "Cleber" finalizou o pedido "#01" há "6" minutos.
And o status do pedido "#01" é "Confirmado".
When seleciona a opção "Cancelar Pedido". 
Then há uma "notificacao" informando "Tempo limite excedido!!".

Scenario: Falha ao cancelar pedido com status "em Preparo".
Given eu estou logado como "Luan" com senha "senha_userLuan".
And eu estou na página "Pedidos". 
And um usuário finalizou o pedido "#01" há "3" minutos.
And o status do pedido "#01" é "em Preparo".
When seleciona a opção "Cancelar Pedido". 
Then há uma notificação informando "Pedido ja em preparo :(".

Scenario: Falha na confirmação de cancelamento por senha incorreta.
Given eu estou logado como "Caio" com senha "senha_userCaio".
And eu estou na página "Pedidos".
And eu estou com a janela de confirmação aberta cancelando o pedido "#02".
When seleciona a opção "Outros".
And insiro a senha "321".
And seleciona a opção "Confirmar Cancelamento".
Then há uma notificação informando "Senha incorreta, tente novamente!".
And o status do pedido "#02” é “Confirmado" 


Scenario: Falha no cancelamento por falta de preenchimento do campo "Motivo".
Given eu estou logado como "Emilly" com senha "senha_userEmilly".
And eu estou na página "Pedidos".
And eu estou com a janela de confirmação aberta cancelando o pedido "#03".
When insiro a senha "senha_userEmilly".
And seleciona a opção "Confirmar Cancelamento".
Then há uma notificação informando "E necessario inserir um motivo para o cancelamento".
And o status do pedido "#03” é “Confirmado" 

Scenario: Confirmação de cancelamento de pedido.
Given eu estou logado como "Thiagao" com senha "senha_userThiagao".
And eu estou na página "Pedidos".
And eu estou com a janela de confirmação aberta cancelando o pedido "#01".
And insiro a senha "senha_userThiagao".
And seleciona a opção "Confirmar Cancelamento".
Then há uma "notificacao" informando "Pedido Cancelado com sucesso!"
And o status do pedido "#01” é “Cancelado" 

Scenario: Falha no cancelamento por falta de preenchimento do campo "Senha".
Given eu estou logado como "Otavio" com senha "senha_userOtavio".
And eu estou na página "Pedidos".
And eu estou com a janela de confirmação aberta cancelando o pedido "#02".
When seleciona a opção "Outros".
And seleciona a opção "Confirmar Cancelamento".
Then há uma "notificacao" informando "E necessario o preenchimento da senha".
And o status do pedido "#02” é “Confirmado" 

Scenario: Voltar para página inicial.
Given eu estou logado como "Joao" com senha "senha_userJoao".
And eu estou na página "Pedidos". 
When seleciona a opção "Voltar". 
Then eu estou na página "Pagina Inicial".

Scenario: Cancelamento bem sucedido (serviço).
Given existe um usuário com id "3" e com senha "senha_userId3".
And um pedido com número "004" está registrado em "/users/3/orders".
When uma requisição de "POST" com id "3", motivo "outros" e senha "senha_userId3" é enviada para "/users/3/orders/004/cancellation". 
Then o status da resposta deve ser "200". 
And uma mensagem de "Pedido cancelado" é retornada com id de pedido "004".

Scenario: Rota de acesso à página inicial a partir de "Pedidos" (serviço).
Given o URL da página é "Pedidos".
And é solicitado o acesso à URL "Pagina Inicial".
When uma requisição de "GET" é enviada para "/home".
Then o status da resposta deve ser "200".
And o URL da página é "Pagina Inicial".

Scenario: Cancelamento mal sucedido (serviço).
Given existe um usuário com id "1" com senha "senha_userId1".
And um pedido com número "001" está registrado em "/users/1/orders".
When uma requisição de "POST" com id "1" motivo "Pedi errado" e senha "###" é enviada para "/users/1/orders/001/cancellation".
Then o status da resposta deve ser "401".
And uma mensagem de "Pedido não cancelado" é retornada com id de pedido "001".

Scenario: Carregamento pedidos (serviço)
Given existe um usuário com id "2" com senha "senha_userId2".
When uma requisição de "GET" com id "2" é enviada para "/users/2/orders"
Then o status da resposta deve ser "200"
And uma mensagem de "Todos os Pedidos" é retornada.