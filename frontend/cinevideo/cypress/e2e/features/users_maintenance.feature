Feature: Cadastro e manutenção de usuários
	As a usuário do sistema
	I want to criar, atualizar, e deletar minha informação pessoal
	so that eu possa gerenciar os detalhes da minha conta de forma segura e os manter atualizados

Scenario: Cadastro de usuário bem-sucedido
Given o usuário acessa a página de cadastro
When o usuário preenche o campo "nome completo" com "Lucas Henrique"
And o usuário preenche o campo "usuário" com "LucasHenrique"
And o usuário preenche o campo "senha" com "X"
And o usuário preenche o campo "data de nascimento" com "20/02/2004"
And o usuário preenche o campo "gênero" com "Masculino"
And o usuário preenche o campo "foto" com "minha-foto.jpg"
And o usuário clica no botão "Cadastrar"
Then o usuário deve ver uma mensagem de cadastro bem-sucedido

Scenario:  Alteração de dados cadastrais bem-sucedido
Given o usuário “LucasHenrique” está na página de “Dados cadastrais” 
And vê que os seus dados para os campos nome completo, usuário/email,  data de nascimento, gênero e foto são, respectivamente,  “Lucas Henrique”, “LucasHenrique”,  “20/02/2004”, “Masculino” e “minha-foto.jpg
When o usuário altera os campos nome completo, usuário/email,  data de nascimento, gênero e foto para, respectivamente,  “Lucas Henrique Silva”, “lucashns”,  “20/02/1994”, “Masculino” e “minha-foto-nova.jpg
And insere a senha correta “X”
Then ele recebe um aviso de alteração cadastral bem-sucedida
And vê que os seus dados para os campos nome completo, usuário/email, data de nascimento, gênero e foto são, respectivamente,  “Lucas Henrique Silva”, “lucashns”, “20/02/1994”, “Masculino” e “minha-foto-nova.jpg”

Scenario: Alteração de dados cadastrais malsucedido
Given o usuário “LucasHenrique” está na página de “Dados cadastrais” 
And vê que os seus dados para os campos nome completo, usuário/email,  data de nascimento, gênero e foto são, respectivamente,  “Lucas Henrique”, “LucasHenrique”,  “20/02/2004”, “Masculino” e “minha-foto.jpg
When o usuário altera os campos nome completo, usuário/email,  data de nascimento, gênero e foto para, respectivamente,  “Lucas Henrique Silva”, “lucashns”,  “20/02/1994”, “Masculino” e “minha-foto-nova.jpg
And insere a senha incorreta “Y”
Then ele recebe um aviso de alteração cadastral malsucedida
And vê que os seus dados para os campos nome completo, usuário/email,  data de nascimento, gênero e foto são, respectivamente,  “Lucas Henrique”, “LucasHenrique”,  “20/02/2004”, “Masculino” e “minha-foto.jpg

Scenario: Remoção de usuário bem-sucedido
Given o usuário “LucasHenrique” está na página de “Dados cadastrais” 
When seleciona em “deletar minha conta”
Then o sistema pede ao usuário para inserir sua senha
When insere a senha correta “X”
Then ele recebe um aviso de remoção cadastral bem-sucedido
And o usuário é redirecionado para página de “Autenticação”

Scenario: Remoção de usuário malsucedida
Given o usuário “LucasHenrique” está na página de “Dados cadastrais” 
When seleciona em “deletar minha conta”
Then o sistema pede ao usuário para inserir sua senha
When insere a senha incorreta: “Y”
Then ele recebe um aviso de senha incorreta
And o usuário é solicitado para inserir a senha novamente  