
Essa é a feature login de lojas

Scenario 1: Login efetuado com sucesso

Given: Estou na página de login e ainda não entrei na minha conta;
And: Preencho o campo 'nome de usuário' como 'SupleTrintaLogin@gmail.com';
And: Preencho o campo 'senha' como 'SupleTrintaSenha1234';
When: Eu aperto o botão 'Entrar';
Then: O login é aceito e eu entro na minha conta

Scenario 2: Login recusado

Given: Estou na página de login e ainda não entrei na minha conta;
And: Preencho o campo 'nome de usuário' como 'SupleTrintaLogin@gmail.com';
And: Preencho o campo 'senha' erroneamente como 'SupleTrintaSenha12345';
When: Eu aperto o botão 'Entrar';
Then: O login é recusado e a seguinte mensagem aparece: 'Nome de login ou senha incorretos, tente novamente'

