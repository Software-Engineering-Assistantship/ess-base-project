Feature: Cadastro e manutenção de usuários

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