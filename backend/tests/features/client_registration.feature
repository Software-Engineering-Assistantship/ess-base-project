Feature: Cadastro de usuário
	  As a usuário do aplicativo
	  I want to criar minha conta
	  So that eu posso realizar os pedidos
	
Scenario: Cadastro bem sucedido de cliente
    Given não existe nenhum cliente com o CPF “123321222” 
    And com o email “comercomer@gmail.com” cadastrado no sistema
    When uma requisição “POST” é enviada para “/clients” com o nome “User1”, CPF “123321222”, email “comercomer@gmail.com”, senha “clientqualquer”, endereco "rua1"
    Then é retornada uma mensagem com status “201”
    And retorna uma mensagem “Cliente User1 salvo no banco de dados”

Scenario: E-mail usado no cadastro já está cadastrado
    Given um cliente cadastrado no sistema com os dados “user1” “123321222”, email “cvsj@cin.ufpe.br” e senha “123456”	
    When uma requisição “POST” é enviada para “/clients” com os valores “user2”,  “123321221”, email “cvsj@cin.ufpe.br”, senha “123456”, endereco "rua1"
    Then é retornada uma mensagem com status "409"
    And retorna uma mensagem "e-mail já cadastrado"
    And o cliente "user2" não está salvo no banco de dados