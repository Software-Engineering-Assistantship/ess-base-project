Essa é a feature de cadastro de novas lojas

Scenario 1: Cadastro realizado com sucesso.

Given: Estou na página de login de lojas;
And: Ainda não cadastrei minha loja;
When: Clico na opção 'Sua loja ainda não foi registrada? Cadastre-se agora';
And: Preencho o nome da loja como 'SuplementosTrinta';
And: Preencho e-mail como 'SupleTrintaLogin@gmail.com';
And: Preencho o CNPJ como '21. 123. 456/0001-55';
And: Preencho a localização da loja como 'Fortaleza - Ceará, Rua do Tuezin, número 777-666';
And: Confirmo o envio do questionário;
Then: Aparece uma mensagem confirmando o cadastro da loja.

Scenario 2: Cadastro não realizado por dados incorretos

Given: Estou na página de login de lojas;
And: Ainda não cadastrei minha loja;
When: Clico na opção 'Sua loja ainda não foi registrada? Cadastre-se agora';
And: Preencho o nome da loja como 'SuplementosTrinta';
And: Preencho e-mail como 'SupleTrintaLogin@gmail.com';
And: Não preencho o campo CNPJ;
And: Preencho a localização da loja como 'Fortaleza - Ceará, Rua do Tuezin, número 777-666';
And: Confirmo o envio do questionário;
Then: Aparece uma mensagem: 'Sinto muito, o cadastro da loja não foi realizado pois faltam informações essenciais para o cadastro.'

Scenario 3: Cadastro não realizado por essa loja já possuir cadastro

Given: Estou na página de login de lojas;
When: Clico na opção 'Sua loja ainda não foi registrada? Cadastre-se agora';
And: Preencho o nome da loja como 'SuplementosTrinta';
And: Preencho e-mail como 'SupleTrintaLogin@gmail.com';
And: Preencho o CNPJ como '21. 123. 456/0001-55';
And: Preencho a localização da loja como 'Fortaleza - Ceará, Rua do Tuezin, número 777-666';
And: Confirmo o envio do questionário;
Then: Aparece uma mensagem: 'Sua loja já foi registrada no nosso site! Por favor realize o login.'.


