Scenario:
Given eu estou na página inicial do sistema
When eu seleciono “Cadastre-se já”
Then eu sou redirecionado para uma tela de criação de novo usuário
And eu preencho o Email como “joao@gmail.com”
And eu preencho o CPF como “123.432.542-87
And eu preencho a senha como “#Senha123“
And eu preencho a confirmação de senha como “# Senha123“
And eu envio
Then eu sou redirecionado para a página inicial
And eu sou capaz de fazer o login com o meu novo usuário

Scenario 2: Usuário solicita a recuperação de conta

Given que eu não estou logado com nenhum usuário do sistema
And eu estou na página "Login"
When eu clico no botão "Esqueci minha Senha"
Then eu sou encaminhado para a página "Recuperação de conta"

Scenario 3: O usuário recupera sua conta

Given eu estou na página “Recuperação de conta”
When eu vejo o campo de e-mail.
And eu preencho o campo de email com “João@gmail.com”
Then eu recebo um email para redefinir minha senha
When eu preencho o campo “Nova Senha”
And clico no botão “Confirmar”
Then eu sou redirecionado para página de “login”
And eu sou capaz de fazer login com minha nova senha.


Scenario 4: A senha ou o login do usuário não conseguem ser identificados

Given eu estou na página inicial do sistema
And a senha “123” não corresponde ao usuário “João”
When eu seleciono a opção “Login”
And eu preencho o campo  de usuário com “João”
And eu preencho o campo da senha com “123”
And eu clico no botão “Confirmar”
Then a seguinte mensagem aparece: “Credenciais inválidas.Verifique seu nome de usuário e senha e tente novamente“

Scenario 7: Senha não cumpre os requisitos mínimos no cadastro

Given eu estou na página de cadastro do sistema
When eu preencho o campo de usuário com “joão”
And preencho o campo de email com “joao@gmail.com”
And preencho o campo de senha com “senha123”
And preencho o campo de confirmar senha com “senha123”
And preencho o campo de CPF
And clico em “Enviar”
Then recebo o aviso:” A senha deve conter no Mínimo uma Letra maiúscula e um caracter especial”  

Scenario 8: o Usuário loga no sistema

Scenario:
Given que eu não estou logado com nenhum usuário do sistema
And meu login é “joão”
And minha senha é “#Senha123”
When seleciono a opção “Já tenho conta”
And preencho o usuário como “joão”
And preencho a senha como “#Senha123”
And eu confirmo
Then consigo logar na minha conta
