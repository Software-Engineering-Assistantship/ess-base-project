Feature: Cadastro e Manutenção dos entregadores
As a delivery company
I want to register the delivery people in my plataform 
So that I can manage my workers

Scenario: Cadastro de entregador
Given there is no delivery person with id "1"
When a new request POST is made for an end point "/delivery-people" with the body: id "1", name: "Beatriz Freire", cpf: "1111111111",
adress: "Rua X, número 01"
Then The person with those personal informations will be registed

Scenario: Mudança de endereço
Given the delivery person with the id "1" moved 
When a new request PATCH is made for an end point "/delivery-people" with the body: id "1" atalizará o campo adress para
adress: "Rua Y, número 02"
Then The new adress of the person with id "1" will be registed