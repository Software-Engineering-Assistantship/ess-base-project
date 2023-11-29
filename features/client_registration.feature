Feature: Cadastro de usuário
	As a usuário do aplicativo
	I want to criar minha conta
	So that eu posso realizar os pedidos
	
Scenario: As senhas do campo "senha" e "confirmar senha" são iguais
Given: As strings do campo senha é armazenada em SENHA1	
AND a string do campo confirmar senha é armazenada em SENHA2
When: A expressão booleana “SENHA1==SENHA2” é comparada
AND A expressão retorna 1
Then As duas senhas são iguais


Scenario: E-mail usado no cadastro já está cadastrado
Given Existe um email “cvsj@cin.ufpe.br” no BD
And Estou cadastrando um usuário que usa o e-mail “cvsj@cin.ufpe.br”	
When O usuário tenta efetuar o cadastro
Then é feita uma consulta ao Banco de Dados
AND É verificado que o e-mail já esta cadastrado
AND o usuário é notificado
AND o cadastro não é efetuado
