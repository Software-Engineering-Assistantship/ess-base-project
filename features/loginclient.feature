Feature: loginclient
    As a usuário não logado
    I want to fazer login com meu email e senha
    So that eu posso acessar minha conta no iBreno

Scenario: Login realizado com sucesso
	Given eu estou na aba “Login”
	When eu preencho o campo de email com um email cadastrado “cvmfc@cin.ufpe.br”
	And eu preencho o campo de senha com a senha correspondente “777777”
	And eu tento realizar login apertando em “Confirmar”
	Then eu devo ser redirecionado para a aba seguinte (“Cardápio”)

Scenario: Login fracassou pois a senha está incorreta
	Given eu estou na aba “Login”
	When eu preencho o campo de email com um email cadastrado “cvmfc@cin.ufpe.br”
	And eu preencho o campo de senha com uma senha incorreta “1234”
	And eu tento realizar login apertando em “Confirmar”
	Then eu devo ver uma mensagem de erro no login
	And eu permaneço na aba “Login”

Scenario: Login fracassou pois o email não está cadastrado
	Given eu estou na aba “Login”
	When eu preencho o campo de email com um email não cadastrado “abcde@cin.ufpe.br”
	And eu preencho o campo de senha com uma senha qualquer “12345”
	And eu tento realizar login apertando em “Confirmar”
	Then eu devo ver uma mensagem de erro no login
	And eu permaneço na aba “Login”

Scenario: Login fracassou pois um dos campos não foi preenchido
	Given eu estou na aba “Login”
	When eu preencho o campo de email com um email cadastrado “cvmfc@cin.ufpe.br”
	And eu não preencho o campo de senha
	And eu tento realizar login apertando em “Confirmar”
	Then eu devo ver uma mensagem de erro no login
	And eu permaneço na aba “Login”

Scenario: Login realizado com sucesso
	Given existe um cliente cadastrado com email “cvmfc@cin.ufpe.br” e com senha “777777”
	When uma requisição POST é enviada para “/clients/login” com os dados “cvmfc@cin.ufpe.br” e “777777”
	Then os dados são encontrados no banco de dados
	And é retornado status “200”
	And o login é realizado com sucesso

Scenario: Login fracassou, pois a senha está incorreta
	Given existe um cliente cadastrado com email “cvmfc@cin.ufpe.br” e com senha “777777”
	When uma requisição POST é enviada para “/clients/login” com os dados “cvmfc@cin.ufpe.br” e “1234”
	Then a senha "1234" não é encontrada no banco de dados
	And é retornado status “401”
	And o login não pode ser concluído

Scenario: Login fracassou, pois o email não está cadastrado
	Given não existe um cliente cadastrado com email “cvmfc@cin.ufpe.br”
	When uma requisição POST é enviada para “/clients/login” com os dados “cvmfc@cin.ufpe.br” e “1234”
	Then o email "cvmfc@cin.ufpe.br" não é encontrado no banco de dados
	And é retornado status “401”
	And o login não pode ser concluído

Scenario: Login fracassou pois um dos campos não foi preenchido
	Given existe um cliente cadastrado com email “cvmfc@cin.ufpe.br” e com senha “777777”
	When uma requisição POST é enviada para “/clients/login” com os dados “cvmfc@cin.ufpe.br” e “”
	Then o campo da senha está vazio
	And é retornado status “204”
	And o login não pode ser concluído

Scenario: Token de autorização válido
	Given o valor esperado para o token de autorização é "abcd1234efgh5678"
	When uma requisição GET é enviada para "clients/home"
	And essa requisição possui um cabeçalho de autorização "Bearer abcd1234efgh5678"
	And o valor do token é extraído do cabeçalho como "abcd1234efgh5678"
	And esse valor é comparado com o valor esperado para o token
	Then o valor do token obtido é igual ao esperado
	And é retornado status "200"
	And o login é concluído
	
Scenario: Token de autorização inválido
	Given o valor esperado para o token de autorização é "abcd1234efgh5678"
	When uma requisição GET é enviada para "clients/home"
	And essa requisição possui um cabeçalho de autorização "Bearer xxyy0099"
	And o valor do token é extraído do cabeçalho como "xxyy0099"
	And esse valor é comparado com o valor esperado para o token
	Then o valor do token obtido difere do esperado
	And é retornado status “401”
	And o login não pode ser concluído

Scenario: Token de autorização não fornecido
	Given o valor esperado para o token de autorização é "abcd1234efgh5678"
	When uma requisição GET é enviada para "clients/home"
	And essa requisição não possui um cabeçalho de autorização
	And o valor do token é extraído do cabeçalho como uma string vazia ou NULL
	And esse valor é comparado com o valor esperado para o token
	Then o valor do token obtido difere do esperado
	And é retornado status “401”
	And o login não pode ser concluído

Scenario: Esqueci minha senha (sucesso)
	Given existe um restaurante cadastrado com email "cvmfc@cin.ufpe.br" 
	When uma requisição POST é enviada para “/recover" com o dado “cvmfc@cin.ufpe.br”
	Then o e-mail "cvmfc@cin.ufpe.br" é encontrado  no banco de dados
	And é retornado status "202"
	And o restaurante de e-mail "cvmfc@cin.upe.br" é atualizado com o código de verificação "12345"
	And o código "12345" é enviado para o endereço de e-mail

Scenario: Esqueci minha senha (fracasso)
	Given não existe um restaurante cadastrado com email "null404@cin.ufpe.br" 
	When uma requisição POST é enviada para “/recover" com o dado “null404@cin.ufpe.br”
	Then o e-mail "cvmfc@cin.ufpe.br" não é encontrado  no banco de dados
	And é retornado status "401"
	And o texto do corpo de requisição é "e-mail não encontrado"

Scenario: Recuperação de senha (sucesso)
	Given o restaurante de e-mail "cvmfc@cin.ufpe.br" tem um código de verificação "12345"
	When uma requisição POST é enviada para “/recover/code" com os dados "cvmfc@cin.ufpe.br" e “12345”
	Then o e-mail "cvmfc@cin.ufpe.br" é encontrado  no banco de dados
	And o código "12345" é associado ao restaurante de e-mail "cvmfc@cin.ufpe.br"
	And é retornado status "202"

Scenario: Recuperação de senha (fracasso)
	Given o restaurante de e-mail "cvmfc@cin.ufpe.br" tem um código de verificação "12345"
	When uma requisição POST é enviada para “/recover/code" com os dados "cvmfc@cin.ufpe.br" e “1234”
	Then o e-mail "cvmfc@cin.ufpe.br" é encontrado  no banco de dados
	And o código "1234" não é associado ao restaurante de e-mail "cvmfc@cin.ufpe.br"
	And é retornado status "401"

Scenario: Criação de nova senha (sucesso)
	Given o restaurante de e-mail "cvmfc@cin.ufpe.br" tem um código de verificação
	When uma requisição POST é enviada para “/recover/password" com os dados "cvmfc@cin.ufpe.br" e “98765”
	Then a senha do restaurante de e-mail "cvmfc@cin.ufpe.br" é atualizada para "98765"
	And é retornado status "202"
	And o texto do corpo de requisição é "senha atualizada com sucesso"

Scenario: Criação de nova senha (fracasso)
	Given o restaurante de e-mail "cvmfc@cin.ufpe.br" não tem um código de verificação
	When uma requisição POST é enviada para “/recover/password" com os dados "cvmfc@cin.ufpe.br" e “98765”
	Then a senha do restaurante de e-mail "cvmfc@cin.ufpe.br" não é atualizada 
	And é retornado status "401"