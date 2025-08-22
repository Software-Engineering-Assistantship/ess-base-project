Feature: Disparo de email para usuários com comprovante de pedido
As a usuário "cliente"
I want to Receber e-mails de confirmação, edição e cancelamento da reserva
So that eu possa ter uma confirmação escrita das minhas transações e atualizações importantes da minha reserva 

Scenario: Finalização da reserva com sucesso
    Given existe um usuário "Cliente" logado com o e-mail "mleticiagaspar17@gmail.com" e a senha "let123"
    And está na página "Realizar reserva" do quarto com id "1"
    When uma requisição POST é enviada para "/client/1/publishedReservation/1/reserve" com os dados da reserva
    Then o status da resposta deve ser "201"
    And é retornada a mensagem "Reserva realizada com sucesso!"

Scenario: Edição da reserva  
    Given existe um usuário "Cliente" logado com o e-mail "mleticiagaspar17@gmail.com" e a senha "let123"
    And o quarto de id "1" está na listagem das reservas feitas por ele
    When uma requisição PUT é enviada para "/client/1/publishedReservation/1/reserve/1" com os dados da reserva
    Then o status da resposta deve ser "200"
    And é retornada a mensagem "Reserva atualizada com sucesso!"

Scenario: Cancelamento da reserva  
    Given existe um usuário "Cliente" logado com o e-mail "mleticiagaspar17@gmail.com" e a senha "let123"
    And o quarto de id "1" está na listagem das reservas feitas por ele
    When uma requisição DELETE é enviada para "/reserve/1"
    Then o status da resposta deve ser "200"
    And é retornada a mensagem "Reserva cancelada com sucesso."


