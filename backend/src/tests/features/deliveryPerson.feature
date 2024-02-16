Feature: Cadastro e Manutenção dos entregadores
Como uma companhia de delivery
Eu quero registrar meus profissionais entregadores na minha plataforma
Para que eu possa gerenciar meus trabalhadores

Scenario: Cadastro de entregador
Given não existe pessoa entregadora cadastrada no banco de dados com cpf "1111111111"
When uma nova requisição POST é feita para um end point "/deliveryperson" com o corpo da requisição nome: "Beatriz Freire", cpf: "1111111111", cep: "11111111", rua: "ricardo b@zerra", numero: "23", bairro: "livia", estado: "joao", cidade: "jove", email: "beatriz@gmail.com", telefone: "8181372017"
Then o Status resposta deve ser "201"
And a resposta deve conter o detalhe "User created"

Scenario: Falha conseguiu Cadastrar
Given existe pessoa entregadora cadastrada no banco de dados com cpf "1111111111"
When uma nova requisição POST é feita para um end point "/deliveryperson" com o corpo da requisição nome: "Beatriz Freire", cpf: "1111111111", cep: "11111111", rua: "ricardo b@zerra", numero: "23", bairro: "livia", estado: "joao", cidade: "jove", email: "beatriz@gmail.com", telefone: "8181372017"
Then o Status resposta deve ser "400"
And a resposta deve conter o detalhe "This cpf is already registered"

Scenario: Mudança de caracteristicas
Given existe pessoa entregadora cadastrada no banco de dados com cpf "1111111111"
When uma nova requisição PATCH é feita para um end point "/deliveryperson" com o corpo da requisição nome: "Paula Perazzo", cpf: "1111111111", cep: "11111111", rua: "ricardo b@zerra", numero: "23", bairro: "livia", estado: "joao", cidade: "jove", email: "beatriz@gmail.com", telefone: "8181372017"
Then o Status resposta deve ser "200"
And a resposta deve conter o detalhe "User updated"


Scenario: Falha em mudança de caracteristicas
Given não existe pessoa entregadora cadastrada no banco de dados com cpf "1111111111"
When uma nova requisição PATCH é feita para um end point "/deliveryperson" com o corpo da requisição nome: "Paula Perazzo", cpf: "1111111111", cep: "11111111", rua: "ricardo b@zerra", numero: "23", bairro: "livia", estado: "joao", cidade: "jove", email: "beatriz@gmail.com", telefone: "8181372017"
Then o Status resposta deve ser "404"
And a resposta deve conter o detalhe "User not found"


