Feature: Cadastro e Manutenção dos entregadores
Como uma companhia de delivery
Eu quero registrar meus profissionais entregadores na minha plataforma
Para que eu possa gerenciar meus trabalhadores

Scenario: Cadastro de entregador
Given não existe pessoa entregadora cadastrada  no banco de dados com cpf "1111111111"
When uma nova requisição POST é feita para um end point '/deliveryperson' com o corpo da requisição nome: "Beatriz Freire", cpf: "1111111111", endereço: "Rua X, número 01", status:"trabalhando", email: "beatriz@gmail.com", telefone: “81 81372017”
Then o Status resposta deve ser 201
And a resposta deve conter o detalhe "User created"


Scenario: Não conseguiu Cadastrar
Given existe pessoa entregadora cadastrada no banco de dados com cpf ""1111111111"
When uma nova requisição POST é feita para um end point '/deliveryperson' com o corpo da requisição nome: "Beatriz Freire", cpf: "1111111111",telefone: “81 81372017”
endereço: "Rua X, número 01", status:"trabalhando" email: "beatriz@gamil.com"
Then o Status resposta deve ser 400
And a resposta deve conter o detalhe "This cpf is already registered"


Scenario: Mudança de caractesticas 
Given existe pessoa entregadora cadastrada  no banco de dados com cpf ""1111111111"
When uma nova requisição PATCH é feita para um end point '/deliveryperson' com o corpo da requisição nome: "Beatriz Freire", cpf: "1111111111",
endereço: "Rua Y, número 100", status:"trabalhando", email: "beatriz@gmail.com", “81 81372017”
Then o Status resposta deve ser 200
And a resposta deve conter o detalhe "User updated"




Scenario: Mudança de características mal sucedida
Given não existe pessoa entregadora cadastrada  no banco de dados com cpf ""1111111111"
When uma nova requisição PATCH é feita para um end point '/deliveryperson' com o corpo da requisição nome: "Beatriz Freire", cpf: "1111111111",
endereço: "Rua Y, número 100", status:"trabalhando", email: "beatriz@gamil.com", “81 81372017”
Then o Status resposta deve ser 404
And a resposta deve conter o detalhe "User not found"
