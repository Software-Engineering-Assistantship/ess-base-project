Feature: Cadastro de usuário
	As a usuário do aplicativo
	I want to criar minha conta
	So that eu posso realizar os pedidos
	
Scenario: E-mail usado no cadastro já está cadastrado
Given um cliente cadastrado no sistema com os dados “user1” “123321222”, email “cvsj@cin.ufpe.br” e senha “123456”	
When uma requisição “POST” é enviada para “/clients” com os valores “user2”,  “123321221”, email “cvsj@cin.ufpe.br”, senha “123456”
Then é retornada uma mensagem com status "409"
And retorna uma mensagem "e-mail já cadastrado"
And o cliente "user2" não está salvo no banco de dados

Scenario: CPF usado no cadastro já está cadastrado
Given um cliente cadastrado no sistema com os dados “user1” “123321222”, email “user2_email” e senha “123456”	
When uma requisição “POST” é enviada para “/clients” com os valores “user2”,  “123321222”, email “user_email”, senha “123456”
Then é retornada uma mensagem com status "409"
And retorna uma mensagem "CPF já cadastrado"
And o cliente "user2" não está salvo no banco de dados


Scenario : Alteração de e-mail mal sucedida
GIVEN: Given um cliente cadastrado no sistema com os dados “user1” “123321222”, email “cvsj@cin.ufpe.br” e senha “123456”	
When uma requisição “PUT” é enviada para “/clients” com os valores “user2”,  “123321221”, email “cvsj@cin.ufpe.br”, senha “129786”
Then é retornada uma mensagem com status "409"
And retorna uma mensagem "Falha na atualização do e-mail"
And o e-mail do user2 não é alterado
And o user volta para a tela inicial

Scenario: Cadastro bem sucedido de cliente
Given não existe nenhum cliente com o CPF “71254959411” nem com o email “comercomer@gmail.com” cadastrado no sistema
When uma requisição “POST” é enviada para “/clients” com os valores “User1”,  “71254959411”, email “comercomer@gmail.com”, senha “clientqualquer”
Then é retornada uma mensagem com status “201”
And retorna uma mensagem “Cliente User1 salvo no banco de dados”
And mensagem “Cadastro Concluído” 

Scenario: Remover Conta
Given Um usuário com CPF “71254959411” nem com o email “comercomer@gmail.com” cadastrado no sistema
When O usuário seleciona a opção "remover conta"
Then As informações são removidas do banco de dados
And aparece uma mensagem "Conta removida"
And o usuário volta para a tela de login


Scenario: Remover conta - Serviço
Given existe um cliente cadastrado no sistema com os dados “user3" “123321222”, email “soucliente” e senha “jk123”
When uma requisição “DELETE” é enviada para “/clients/{id}”
Then o cliente “user3" não está mais salvo no banco de dados
And é retornada uma mensagem com o status “200” e mensagem “cliente excluído com sucesso”

Scenario: Leitura de cliente do sistema
Given existe um cliente cadastrado no sistema com os dados “User1”,  “71254959411”, email “comercomer@gmail.com”, senha “clientqualquer”, endereco "rua1"
When uma requisição "GET" é enviada para "/clients"
Then é retornada uma mensagem com o status "200"
And a mensagem contém “User1”, “71254959411”, “comercomer@gmail.com”, senha “clientqualquer”, endereco "rua1"

Scenario: Remover Conta (GUI)
Given Um usuário com CPF “71254959411” nem com o email “comercomer@gmail.com” cadastrado no sistema
When O usuário seleciona a opção "remover conta"
Then As informações são removidas do banco de dados
And aparece uma mensagem "Conta removida"
And o usuário volta para a tela de login

Scenario:Cadastro bem sucedido (GUI)
Given estou na pagina de cadastro
And não existe nenhum cliente com o CPF “123321222” nem com o email "comercomer@gmail.com" nem com onome "user1" cadastrado no sistema
When eu preencho o campo nome com "user1"
And o campo email com "comercomer@gmail.com"
And o campo CPF com “123321222”
And o campo endereco com "rua1"
And o campo senha com "123"
And o campo confirmar_senha com "123"
And seleciono a opção “Cadastrar”
Then surge a mensagem "Cadastro realizado com sucesso!"
And volto a tela de login

Scenario: Cadastro mal-sucedido, email já usado (GUI)
Given estou na pagina de cadastro
And existe um cliente com o CPF “123321222” e com o email "comercomer@gmail.com" e com onome "user1" cadastrado no sistema
When eu preencho o campo nome com "user2"
And o campo email com "comercomer@gmail.com"
And o campo CPF com “1233214444”
And o campo endereco com "rua1"
And o campo senha com "123"
And o campo confirmar_senha com "123"
And seleciono a opção “Cadastrar”
Then surge a mensagem "Cadastro mal-sucedido, e-mal já existente"
And permaneco na tela de cadastro

Scenario: Cadastro mal-sucedido, CPF já usado (GUI)
Given estou na pagina de cadastro
And existe um cliente com o CPF “123321222” e com o email "alimentarmail.com" e com o nome "user1" cadastrado no sistema
When eu preencho o campo nome com "user2"
And o campo email com "comercomer@gmail.com"
And o campo CPF com “123321222”
And o campo endereco com "rua1"
And o campo senha com "123"
And o campo confirmar_senha com "123"
And seleciono a opção “Cadastrar”
Then surge a mensagem "Cadastro mal-sucedido, CPF já existente"
And permaneco na tela de cadastro

Scenario: atualização de cadastro (GUI)
Given estou logado numa conta cujo e-mail é "alimentarmail.com"
And estou na página "Meus dados"
When eu altero o e-mail para "comercomer@gmail.com"
And seleciono Salvar
Then aparece a mensagem "Cadastro atualizado com sucesso"
And permaneco na pagina "Meus dados"

Scenario: atualização de cadastro mal-sucedida, email já usado (GUI)
Given estou logado numa conta cujo e-mail é "alimentarmail.com"
And estou na página "Meus dados"
And existe uma conta que usa o e-mail "comercomer@gmail.com"
When eu altero o e-mail para "comercomer@gmail.com"
And seleciono Salvar
Then aparece a mensagem "Cadastro não atualizado, e-mail já existente"
And permaneco na pagina "Meus dados"
