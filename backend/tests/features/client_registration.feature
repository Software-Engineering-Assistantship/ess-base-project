Feature: Cadastro de usuário
	  As a usuário do aplicativo
	  I want to criar minha conta
	  So that eu posso realizar os pedidos
	


Scenario: E-mail usado no cadastro já está cadastrado
    Given um cliente cadastrado no sistema com os dados id "2" "user1" "123321222", email "cvsj@cin.ufpe.br" endereço "rua1" senha "123456"	
    When uma requisição POST é enviada para "/clients" com os valores "user2",  "123.321.222-56", email "cvsj@cin.ufpe.br", senha "123456", endereco "rua1"
    Then é retornada uma mensagem com status "409"
    And retorna uma mensagem "Cliente já cadastrado"

Scenario: CPF usado no cadastro já está cadastrado
    Given um cliente cadastrado no sistema com os dados id "2" "user1" "123321222", email "cvsj@cin.ufpe.br" endereço "rua1" senha "123456"		
    When uma requisição POST é enviada para "/clients" com os valores "user2",  "123.321.222-56", email "ham4@cin.ufpe.br", senha "123456", endereco "rua1"
    Then é retornada uma mensagem com status "409"
    And retorna uma mensagem "Cliente já cadastrado"


Scenario: Remover conta 
    Given um cliente cadastrado no sistema com os dados id "2" "user1" "123.321.222-56", email "cvsj@cin.ufpe.br" endereço "rua1" senha "123456"	
    When uma requisição DELETE é enviada para "/clients/{2}"
    Then é retornada uma mensagem com o status "200"
    And retorna uma mensagem "Client deleted"

Scenario: Leitura de cliente do sistema
    Given um cliente cadastrado no sistema com os dados id "2" "user1" "123321222", email "cvsj@cin.ufpe.br" endereço "rua1" senha "123456"
    When uma requisição GET é enviada para "/clients"
    Then é retornada uma mensagem com status "200"
    And a mensagem contém "user1" "123321222", email "cvsj@cin.ufpe.br" endereço "rua1"

Scenario: Alteração de e-mail mal sucedida
    Given um cliente cadastrado no sistema com os dados id "1" "user1" "123.321.222-87", email "cvsj@cin.ufpe.br" endereço "rua1" senha "123456"
    And  um cliente cadastrado no sistema com os dados id "2" "user2" "123.321.222-56", email "ham4@cin.ufpe.br" endereço "rua6" senha "1234567"	
    When uma requisição PUT é enviada para "/clients/{2}" com os valores "user2",  "123.321.222-56", email "cvsj@cin.ufpe.br", endereco "rua1" senha "129786"
    Then é retornada uma mensagem com status "409"
    And retorna uma mensagem "Cliente já registrado"
