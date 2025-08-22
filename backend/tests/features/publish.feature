Feature: Publicar Reservas 
As a usuário “Hoteleiro”
I want to publicar as reservas do meu hotel
So that eu possa disponibilizar os quartos para reserva pelos clientes

Scenario: Publicar uma reserva com sucesso
  Given que estou logado como usuário “Hoteleiro” com login “thaisnevest” e senha “12345678”
  And estou na página de “Publicação de Reservas”
  When eu preencho o campo “Nome da Reserva” com “Quarto Standard”
	And preencho o campo “Tipo do Quarto” com “Casal”
  And preencho o campo “Camas” com “1”
  And preencho o campo “Tipo de cama” com “Casal”
  And preencho o campo “Acomoda” com “2”
  And preencho o campo “Espaço” com “20m²”
  And seleciono o campo “Wi-Fi grátis”
  And seleciono o campo “Café da manhã incluso”
  And seleciono o campo “Estacionamento grátis”
  And seleciono o campo “Ar condicionado”
  And preencho o campo “Valor” com “R$450/diária”
  And clico no botão de publicar reserva
  Then devo ver a seguinte mensagem de confirmação “A reserva do Serrambi Resort foi publicada com sucesso”
  And eu vejo “Quarto Standard” na página “Reservas Publicadas”


Scenario: Publicar uma reserva com dados incompletos
  Given que estou logado como usuário “Hoteleiro” com login “thaisnevest” e senha “12345678”
  And estou na página de “Publicação de Reservas”
  When eu preencho o campo “Nome da Reserva” com “Quarto Standard”
	And preencho o campo “Tipo do Quarto” com “Casal”
  And preencho o campo “Espaço” com “20m²”
  And seleciono o campo “Wi-Fi grátis”
  And clico no botão de publicar reserva
  Then devo ver a seguinte mensagem de erro “Os campos obrigatórios não foram preenchidos”
  And a reserva não deve ser publicada
  And eu permaneço na página de “Publicação de Reservas”
