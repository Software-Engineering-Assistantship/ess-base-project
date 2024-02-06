Feature: Cadastro e Manutenção dos entregadores
Como uma companhia de delivery
Eu quero registrar meus profissionais entregadores na minha plataforma
Para que eu possa gerenciar meus trabalhadores

Scenario: Cadastro de entregador
Given não existe pessoa entregadora cadastrada  no banco de dados com cpf ""1111111111"
When uma nova requisição POST é feita para um end point "/delivery-people" com o corpo da requisição nome: "Beatriz Freire", cpf: "1111111111", endereço: "Rua X, número 01", status:"trabalhando", email: "beatriz@gmail.com", telefone: “81 81372017”
Then o Status resposta deve ser 200
And a resposta deve conter o detalhe "Sucess"
And pessoa com essas informações pessoais nome: "Beatriz Freire", cpf: "1111111111", endereço: "Rua X, número 01", status:"trabalhando", email: "beatriz@gmail.com", telefone: “81 81372017”é cadastrada no banco de dados

Scenario: Não conseguiu Cadastrar
Given existe pessoa entregadora cadastrada no banco de dados com cpf ""1111111111"
When uma nova requisição POST é feita para um end point "/delivery-people" com o corpo da requisição nome: "Beatriz Freire", cpf: "1111111111",telefone: “81 81372017”
endereço: "Rua X, número 01", status:"trabalhando" email: "beatriz@gamil.com"
Then o Status resposta deve ser 400
And a resposta deve conter o detalhe "Already exists this cpf in the db"
And pessoa com essas informações pessoais nome: "Beatriz Freire", cpf: "1111111111", endereço: "Rua X, número 01", status:"trabalhando", email: "beatriz@gmail.com", “81 81372017”não é cadastrada no banco de dados

Scenario: Mudança de caractesticas 
Given existe pessoa entregadora cadastrada  no banco de dados com cpf ""1111111111"
When uma nova requisição PATCH é feita para um end point "/delivery-people" com o corpo da requisição nome: "Beatriz Freire", cpf: "1111111111",
endereço: "Rua Y, número 100", status:"trabalhando", email: "beatriz@gmail.com", “81 81372017”
Then o Status resposta deve ser 200
And a resposta deve conter o detalhe "Sucess"
And pessoa com essas informações pessoais nome: "Beatriz Freire", cpf: "1111111111", endereço: "Rua X, número 01", status:"trabalhando", email: "beatriz@gmail.com", “81 81372017”tem o campo endereço  mudado para "Rua Y, número 100" 



Scenario: Mudança de características mal sucedida
Given não existe pessoa entregadora cadastrada  no banco de dados com cpf ""1111111111"
When uma nova requisição PATCH é feita para um end point "/delivery-people" com o corpo da requisição nome: "Beatriz Freire", cpf: "1111111111",
endereço: "Rua Y, número 100", status:"trabalhando", email: "beatriz@gamil.com", “81 81372017”
Then o Status resposta deve ser 400
And a resposta deve conter o detalhe "This cpf doesn't exist in the db"
And pessoa com essas informações pessoais  nome: "Beatriz Freire", cpf: "1111111111", endereço: "Rua X, número 01", status:"trabalhando", email: "beatriz@gmail.com", “81 81372017”não tem o campo endereço  mudado para "Rua Y, número 100" 
