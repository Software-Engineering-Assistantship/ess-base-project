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
Given um cliente cadastrado no sistema com os dados “user1” “123321222”, email “cvsj@cin.ufpe.br” e senha “123456”	
When uma requisição “POST” é enviada para “/clients” com os valores “user2”,  “123321221”, email “cvsj@cin.ufpe.br”, senha “123456”
Then é retornada uma mensagem com status "409"
And retorna uma mensagem "e-mail já cadastrado"
And o cliente "user2" não está salvo no banco de dados


