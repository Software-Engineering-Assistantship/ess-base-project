Feature: Realização de reserva
As a usuário cliente
I want to realizar uma reserva em um hotel
So that eu possa garantir minha estadia no hotel desejado

Scenario: Reserva realizada com sucesso
Given existe um usuário "Cliente" com o e-mail "vbcf@cin.ufpe.br" e a senha "vic123"
And um método de pagamento com id "1" e com nome "1234567891010112" está registrado nos métodos de pagamentos do usuário de id "1" 
And está na página "Quarto Zumbi Digital"
And existe a oferta com nome "Quarto Zumbi Digital" com id "1", com quartos "20", pessoas "3" e preço "1000"
When uma requisição POST é enviada para "/client/1/publishedReservation/1/reserve" com quartos "2", checkin "2024-06-20", checkout "2024-06-22", adultos "2", crianças "0" e pagamento "1234567891010112"
Then o status da resposta deve ser "201"
And é retornada a mensagem "Reserva realizada com sucesso!"

Scenario: Realização de reserva mal sucedida (Campos obrigatórios não preenchidos)
Given existe um usuário "Cliente" com o e-mail "vbcf@cin.ufpe.br" e a senha "vic123"
And um método de pagamento com id "1" e com nome "1234567891010112" está registrado nos métodos de pagamentos do usuário de id "1" 
And está na página "Quarto Zumbi Digital"
And existe a oferta com nome "Quarto Zumbi Digital" com id "1", com quartos "20", pessoas "3" e preço "1000"
When uma requisição POST é enviada para "/client/1/publishedReservation/1/reserve" com quartos "2", checkin "2024-06-20", checkout "2024-06-22", adultos "2", crianças "1" e pagamento ""
Then o status da resposta deve ser "400"
And é retornada a mensagem "Preencha todos os campos"

Scenario: Realização de reserva mal sucedida (Cliente não existe - não está logado)
Given existe um usuário "Cliente" com o e-mail "vbcf@cin.ufpe.br" e a senha "lili123"
And está na página "Quarto Zumbi Digital"
And existe a oferta com nome "Quarto Zumbi Digital" com id "1", com quartos "20", pessoas "3" e preço "1000"
When uma requisição POST é enviada para "/client/0/publishedReservation/1/reserve" com quartos "2", checkin "2024-06-20", checkout "2024-06-22", adultos "2", crianças "0" e pagamento "1234567891010112"
Then o status da resposta deve ser "404"
And é retornada a mensagem "Faça login ou cadastre-se!"

Scenario: Realização de reserva mal sucedida (Pagamento não existe)
Given existe um usuário "Cliente" com o e-mail "vbcf@cin.ufpe.br" e a senha "vic123"
And está na página "Quarto Zumbi Digital"
And existe a oferta com nome "Quarto Zumbi Digital" com id "1", com quartos "20", pessoas "3" e preço "1000"
When uma requisição POST é enviada para "/client/1/publishedReservation/1/reserve" com quartos "2", checkin "2024-06-20", checkout "2024-06-22", adultos "2", crianças "0" e pagamento "1234567891010111"
Then o status da resposta deve ser "404"
And é retornada a mensagem "Cadastre um método de pagamento."

Scenario: Realização de reserva mal sucedida (Capacidade do quarto excedida)
Given existe um usuário "Cliente" com o e-mail "vbcf@cin.ufpe.br" e a senha "vic123"
And um método de pagamento com id "1" e com nome "1234567891010112" está registrado nos métodos de pagamentos do usuário de id "1" 
And está na página "Quarto Zumbi Digital"
And existe a oferta com nome "Quarto Zumbi Digital" com id "1", com quartos "20", pessoas "3" e preço "1000"
When uma requisição POST é enviada para "/client/1/publishedReservation/1/reserve" com quartos "2", checkin "2024-06-20", checkout "2024-06-22", adultos "4", crianças "0" e pagamento "1234567891010112"
Then o status da resposta deve ser "400"
And é retornada a mensagem "Capacidade de hóspedes no quarto excedida."

Scenario: Realização de reserva mal sucedida (Todos os quartos ocupados no período selecionado)
Given existe um usuário "Cliente" com o e-mail "vbcf@cin.ufpe.br" e a senha "vic123"
And um método de pagamento com id "1" e com nome "1234567891010112" está registrado nos métodos de pagamentos do usuário de id "1" 
And está na página "Quarto Zumbi Digital"
And existe a oferta com nome "Quarto Zumbi Digital" com id "1", com quartos "20", pessoas "3" e preço "1000"
When uma requisição POST é enviada para "/client/1/publishedReservation/1/reserve" com quartos "21", checkin "2024-06-20", checkout "2024-06-22", adultos "2", crianças "0" e pagamento "1234567891010112"
Then o status da resposta deve ser "404"
And é retornada a mensagem "Não há quartos disponíveis para o período selecionado."

Scenario: Reserva atualizada com sucesso
Given existe um usuário "Cliente" com o e-mail "vbcf@cin.ufpe.br" e a senha "vic123"
And um método de pagamento com id "1" e com nome "1234567891010112" está registrado nos métodos de pagamentos do usuário de id "1"
And está na página "Minhas reservas"
And existe a oferta com nome "Quarto Zumbi Digital" com id "1", com quartos "20", pessoas "3" e preço "1000"
And existe a reserva com id "1", com quartos "1", checkin "2024-06-20", checkout "2024-06-22", adultos "2", crianças "0", pagamento "1234567891010112", preço "2000", id da reserva "1", id do cliente "1" e id do pagamento "1"
When uma requisição PUT é enviada para "/client/1/publishedReservation/1/reserve/1" com quartos "1", checkin "2024-06-20", checkout "2024-06-22", adultos "1", crianças "0" e pagamento "1234567891010112"
Then o status da resposta deve ser "200"
And é retornada a mensagem "Reserva atualizada com sucesso!"

Scenario: Atualização de reserva mal-sucedida (Campos obrigatórios não preenchidos)
Given existe um usuário "Cliente" com o e-mail "vbcf@cin.ufpe.br" e a senha "vic123"
And um método de pagamento com id "1" e com nome "1234567891010112" está registrado nos métodos de pagamentos do usuário de id "1"
And está na página "Minhas reservas"
And existe a oferta com nome "Quarto Zumbi Digital" com id "1", com quartos "20", pessoas "3" e preço "1000"
And existe a reserva com id "1", com quartos "1", checkin "2024-06-20", checkout "2024-06-22", adultos "2", crianças "0", pagamento "1234567891010112", preço "2000", id da reserva "1", id do cliente "1" e id do pagamento "1"
When uma requisição PUT é enviada para "/client/1/publishedReservation/1/reserve/1" com quartos "1", checkin "2024-06-20", checkout "2024-06-22", adultos "1", crianças "0" e pagamento ""
Then o status da resposta deve ser "400"
And é retornada a mensagem "Preencha todos os campos"

Scenario: Atualização de reserva mal-sucedida (Indisponibilidade de quartos)
Given existe um usuário "Cliente" com o e-mail "vbcf@cin.ufpe.br" e a senha "vic123"
And um método de pagamento com id "1" e com nome "1234567891010112" está registrado nos métodos de pagamentos do usuário de id "1"
And está na página "Minhas reservas"
And existe a reserva com id "1", com quartos "1", checkin "2024-06-20", checkout "2024-06-22", adultos "2", crianças "0", pagamento "1234567891010112", preço "2000", id da reserva "1", id do cliente "1" e id do pagamento "1"
And existe a oferta com nome "Quarto Zumbi Digital" com id "1", com quartos "20", pessoas "3" e preço "1000"
When uma requisição PUT é enviada para "/client/1/publishedReservation/1/reserve/1" com quartos "21", checkin "2024-06-20", checkout "2024-06-22", adultos "1", crianças "0" e pagamento "1234567891010112"
Then o status da resposta deve ser "404"
And é retornada a mensagem "Não há quartos disponíveis para o período selecionado."

Scenario: Reserva cancelada com sucesso 
Given existe um usuário "Cliente" com o e-mail "vbcf@cin.ufpe.br" e a senha "vic123"
And um método de pagamento com id "1" e com nome "1234567891010112" está registrado nos métodos de pagamentos do usuário de id "1"
And está na página "Minhas reservas"
And existe a oferta com nome "Quarto Zumbi Digital" com id "1", com quartos "20", pessoas "3" e preço "1000"
And existe a reserva com id "1", com quartos "1", checkin "2024-06-20", checkout "2024-06-22", adultos "2", crianças "0", pagamento "1234567891010112", preço "2000", id da reserva "1", id do cliente "1" e id do pagamento "1"
When uma requisição DELETE é enviada para "/reserve/1" 
Then o status da resposta deve ser "200"
And é retornada a mensagem "Reserva cancelada com sucesso."



















