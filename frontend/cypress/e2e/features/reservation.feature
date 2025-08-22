Feature: Realização de reserva
As a usuário cliente
I want to realizar uma reserva em um hotel
So that eu possa garantir minha estadia no hotel desejado

Scenario: Reserva realizada com sucesso
Given eu estou logado como cliente com o username "julyafig" e a senha "juju123"
And eu estou na página "/create-reservation" da reserva do "Quarto-Esmeralda" com capacidade de hóspedes igual a "3" 
When eu preencho o campo data checkin com "2024-07-25"
And eu preencho o campo data checkout com "2024-07-27"
And eu preencho o campo "criancas" com "1"
And eu seleciono "avancar"
And eu seleciono o pagamento "**** **** **** 1111"
And eu seleciono "finalizar-reserva" 
Then eu vejo um toast de sucesso com a mensagem "Reserva realizada com sucesso!"
And eu sou redirecionado para a página "/my-reservations"
And eu vejo a reserva do "Quarto Esmeralda"
And eu vejo a reserva do "Quarto Outono"

Scenario: Realização de reserva mal sucedida (Quartos não disponíveis para o período selecionado)
Given eu estou logado como cliente com o username "julyafig" e a senha "juju123"
And eu estou na página "/create-reservation" da reserva do "Quarto-Iglu" com capacidade de hóspedes igual a "3" 
When eu preencho o campo data checkin com "2024-07-25"
And eu preencho o campo data checkout com "2024-07-27"
And eu preencho o campo "criancas" com "1"
And eu seleciono "avancar"
And eu seleciono o pagamento "**** **** **** 1111"
And eu seleciono "finalizar-reserva" 
Then eu vejo um toast de erro com a mensagem "Não há quartos disponíveis para o período selecionado."
And eu continuo na página "/create-reservation"

Scenario: Realização de reserva mal sucedida (Campos obrigatórios não preenchidos)
Given eu estou logado como cliente com o username "julyafig" e a senha "juju123"
And eu estou na página "/create-reservation" da reserva do "Quarto-Esmeralda" com capacidade de hóspedes igual a "3" 
And eu preencho o campo "criancas" com "1"
And eu seleciono "avancar"
Then eu vejo um toast de erro com a mensagem "Preencha todos os campos!"
And eu continuo na página "/create-reservation"

Scenario: Realização de reserva mal sucedida (Capacidade do quarto excedida)
Given eu estou logado como cliente com o username "julyafig" e a senha "juju123"
And eu estou na página "/create-reservation" da reserva do "Quarto-Esmeralda" com capacidade de hóspedes igual a "3" 
When eu preencho o campo data checkin com "2024-07-25"
And eu preencho o campo data checkout com "2024-07-27"
And eu preencho o campo "criancas" com "10"
And eu seleciono "avancar"
Then eu vejo um toast de erro com a mensagem "A capacidade do quarto foi excedida!"
And eu continuo na página "/create-reservation"

Scenario: Realização de reserva mal sucedida (CheckIn depois do CheckOut)
Given eu estou logado como cliente com o username "julyafig" e a senha "juju123"
And eu estou na página "/create-reservation" da reserva do "Quarto-Esmeralda" com capacidade de hóspedes igual a "3" 
When eu preencho o campo data checkin com "2024-07-28"
And eu preencho o campo data checkout com "2024-07-27"
And eu preencho o campo "criancas" com "1"
And eu seleciono "avancar"
Then eu vejo um toast de erro com a mensagem "A data de check-in deve preceder a data de check-out"
And eu continuo na página "/create-reservation"

Scenario: Listagem de todas as reservas 
Given eu estou logado como cliente com o username "julyafig" e a senha "juju123"
And eu estou na página "/reservations"
When eu seleciono a opcao "Meu Perfil"
And eu seleciono "my-reservations-button"
Then eu sou redirecionado para a página "/my-reservations"
And eu vejo a reserva do "Quarto Outono"
And eu vejo a reserva do "Quarto Esmeralda"











