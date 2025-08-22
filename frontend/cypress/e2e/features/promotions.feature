Feature: Cadastro e manutenção de promoções
As a usuário hoteleiro
I want to cadastrar, atualizar e remover as promoções nas reservas publicadas
So that eu possa gerenciar eficientemente os descontos nas reservas

Scenario: Cadastro da promoção realizado com sucesso
    Given eu estou logado como hoteleiro com o username "viccesar" e a senha "vic1234" 
    And eu estou na página "/promotions" da reserva do "Quarto-Esmeralda" com o valor da diária por "700"
    When eu preencho o campo "desconto" com "20"
    And eu seleciono a promoção "Limite de Quarto"
    And eu preencho o campo "quantidade-de-quartos" com "2"
    And eu seleciono "confirmar"
    Then eu vejo um toast de sucesso com a mensagem "Promoção cadastrada com sucesso!"
    And eu sou redirecionado para a página "/hotelier-reservations"
    And eu vejo o "Quarto Esmeralda" com o valor de "560"

Scenario: Tentativa de cadastro da promoção com algum campo não preenchido
    Given eu estou logado como hoteleiro com o username "viccesar" e a senha "vic1234"  
    And eu estou na página "/promotions" da reserva do "Quarto-Ruby" com o valor da diária por "1000"
    When eu preencho o campo "desconto" com "20"
    And eu seleciono a promoção "Limite de Quarto"
    And eu seleciono "confirmar"
    Then eu vejo um toast de erro com a mensagem "Preencha todos os campos"
    And eu continuo na página "/promotions"

Scenario: Tentativa de cadastro da promoção com desconto menor que 5% ou maior que 60%
    Given eu estou logado como hoteleiro com o username "viccesar" e a senha "vic1234"  
    And eu estou na página "/promotions" da reserva do "Quarto-Ruby" com o valor da diária por "1000" 
    When eu preencho o campo "desconto" com "70"
    And eu seleciono a promoção "Ilimitada"
    And eu seleciono "confirmar"
    Then eu vejo um toast de erro com a mensagem "O desconto deve estar entre 5% e 60%"
    And eu continuo na página "/promotions"

Scenario: Edição na promoção de uma reserva
    Given eu estou logado como hoteleiro com o username "viccesar" e a senha "vic1234"  
    And eu estou na página "/reservationDetails" da reserva do "Quarto-Esmeralda"
    And o "Quarto Esmeralda" tem uma promoção de "20" cadastrada com o valor promocional de "560" a diária
    When eu seleciono "editar-promocao"
    And eu preencho o campo "desconto" com "60"
    And eu seleciono a promoção "Ilimitada"
    And eu seleciono "confirmar"
    Then eu vejo um toast de sucesso com a mensagem "Promoção atualizada com sucesso!"
    And eu sou redirecionado para a página "/hotelier-reservations"
    And eu vejo o "Quarto Esmeralda" com o valor de "280"

Scenario: Edição na promoção de uma reserva sem promoção cadastrada
    Given eu estou logado como hoteleiro com o username "viccesar" e a senha "vic1234"  
    And eu estou na página "/reservationDetails" da reserva do "Quarto-Ruby"
    And o "Quarto-Ruby" não possui nenhuma promoção cadastrada
    When eu seleciono "editar-promocao"
    And eu preencho o campo "desconto" com "60"
    And eu seleciono a promoção "Ilimitada"
    And eu seleciono "confirmar"
    Then eu vejo um toast de erro com a mensagem "Não há promoção cadastrada"
    And eu continuo na página "/promotions"

Scenario: Deletar promoção na reserva
    Given eu estou logado como hoteleiro com o username "viccesar" e a senha "vic1234"  
    And eu estou na página "/reservationDetails" da reserva do "Quarto-Esmeralda"
    And o "Quarto Esmeralda" tem uma promoção de "60" cadastrada com o valor promocional de "280" a diária
    When eu tento deletar a promoção
    Then eu vejo um toast de sucesso com a mensagem "Promoção deletada com sucesso!"
    And eu continuo na página "/reservationDetails"
    And eu vejo o "Quarto Esmeralda" com o valor de "700"

Scenario: Deletar promoção na resereva sem promoção cadastrada
    Given eu estou logado como hoteleiro com o username "viccesar" e a senha "vic1234"  
    And eu estou na página "/reservationDetails" da reserva do "Quarto-Esmeralda"
    And o "Quarto Esmeralda" não possui nenhuma promoção cadastrada
    When eu tento deletar a promoção
    Then eu vejo um toast de erro com a mensagem "Não há promoção cadastrada"
    And eu continuo na página "/reservationDetails"

Scenario: Cadastrar uma promoção em todas as reservas publicadas
    Given eu estou logado como hoteleiro com o username "viccesar" e a senha "vic1234"  
    And eu estou na página "/hotelier-reservations"
    And o "Quarto Esmeralda" está nas reservas publicadas com o valor de "700" a diária
    And o "Quarto Ruby" está nas reservas publicadas com o valor de "1000" a diária
    When eu seleciono "cadastrar-promocao" 
    And eu preencho o campo "desconto" com "10"
    And eu seleciono "confirmar"
    Then eu vejo um toast de sucesso com a mensagem "Promoção cadastrada com sucesso!"
    And eu vejo o "Quarto Esmeralda" com o valor de "630" 
    And eu vejo o "Quarto Ruby" com o valor de "900"

Scenario: Deletar todas as promoções
    Given eu estou logado como hoteleiro com o username "viccesar" e a senha "vic1234" 
    And eu estou na página "/hotelier-reservations"
    And o "Quarto Esmeralda" com o valor promocional de "630" a diária
    And o "Quarto Ruby" com o valor promocional de "900" a diária
    When eu tento deletar as promoções
    Then eu vejo um toast de sucesso com a mensagem "Promoções deletadas com sucesso!"
    And eu vejo o "Quarto Esmeralda" com o valor de "700"
    And eu vejo o "Quarto Ruby" com o valor de "1000"

Scenario: Deletar todas as promoções com nenhuma promoção cadastrada
    Given eu estou logado como hoteleiro com o username "viccesar" e a senha "vic1234"  
    And eu estou na página "/hotelier-reservations"
    And não há nenhuma promoção cadastrada
    When eu tento deletar as promoções
    Then eu vejo um toast de erro com a mensagem "Não há promoção cadastrada"
    And eu continuo na página "/hotelier-reservations"

