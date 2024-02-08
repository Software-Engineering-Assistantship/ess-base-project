Feature: Cadastro e Manutenção dos entregadores
Como uma companhia de delivery
Eu quero registrar meus profissionais entregadores na minha plataforma
Para que eu possa gerenciar meus trabalhadores

Scenario: Cadastro de entregador
Given não existe pessoa entregadora cadastrada  no banco de dados com cpf "1111111111"
When uma nova requisição POST é feita para um end point '/deliveryperson' com o corpo da requisição nome: "Beatriz Freire", cpf: "1111111111", cep: "11111111", rua: "ricardo b@zerra", numero: "23", bairro: "livia", estado: "joao", cidade: "jove", email: "beatriz@gmail.com", telefone: "8181372017"
Then Deve ter um usuário com cpf "1111111111"

Scenario: Não conseguiu Cadastrar
Given existe pessoa entregadora cadastrada no banco de dados com cpf "1111111111"
When uma nova requisição POST é feita para um end point '/deliveryperson' com o corpo da requisição nome: "Beatriz Freire", cpf: "1111111111", cep: "11111111", rua: "ricardo b@zerra", numero: "23", bairro: "livia", estado: "joao", cidade: "jove", email: "beatriz@gmail.com", telefone: "8181372017"
Then Não deve criar um novo usuário com cpf "1111111111"

# Scenario: Mudança de caractesticas 
# Given existe pessoa entregadora cadastrada  no banco de dados com cpf "1111111111"
# When uma nova requisição POST é feita para um end point '/deliveryperson' com o corpo da requisição nome: "Paula Perazzo", cpf: "1111111111", cep: "11111111", rua: "ricardo b@zerra", numero: "23", bairro: "livia", estado: "joao", cidade: "jove", email: "beatriz@gmail.com", telefone: "8181372017"
# Then o usuário que tem cpf "1111111111" deve ser atualizado com nome: "Paula Perazzo", cpf: "1111111111", cep: "11111111", rua: "ricardo b@zerra", numero: "23", bairro: "livia", estado: "joao", cidade: "jove", email: "beatriz@gmail.com", telefone: "8181372017"





