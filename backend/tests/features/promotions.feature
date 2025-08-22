Feature: Cadastro e manutenção de promoções
As a usuário hoteleiro
I want to cadastrar, atualizar e remover as promoções nas reservas publicadas
So that Eu possa gerenciar eficientemente os descontos nas reservas

Scenario: Cadastro da promoção realizado com sucesso
    Given existe um usuário "Hoteleiro" do hotel "Encantado" logado com o username "leticiagaspar" e a senha "let1234"
    And o quarto "Flores" está nas reservas publicadas com o valor de "R$ 1300.00" a diária
    When uma requisição POST é enviada para "/reservation/{reservation_id}/promotions" com o desconto de "20%", promoção "LIMITE_QUARTO" e quantidade de quartos "2"
    Then o status da resposta deve ser "201"
    And é retornada a mensagem "A promoção foi cadastrada com sucesso!"

Scenario: Tentativa de cadastro da promoção com algum campo não preenchido
    Given existe um usuário "Hoteleiro" do hotel "Encantado" logado com o username "leticiagaspar" e a senha "let1234"
    And o quarto "Flores" está nas reservas publicadas com o valor de "R$ 1300.00" a diária
    When uma requisição POST é enviada para "reservation/${reservation_id}/promotions" com desconto de "20%" e promoção "LIMITE_QUARTO"
    Then o status da resposta deve ser "400"
    And é retornada a mensagem "num_rooms is required"

Scenario: Deletar a promoção da reserva
    Given existe um usuário "Hoteleiro" do hotel "Encantado" logado com o username "leticiagaspar" e a senha "let1234"
    And o quarto "Flores" tem uma promoção de "30%" cadastrada com o valor promocional de "R$ 910.00" a diária
    When uma requisição DELETE é enviada para "/reservation/1/promotions" 
    Then o status da resposta deve ser "200"
    And é retornada a mensagem "A promoção foi deletada com sucesso!"

Scenario: Edição na promoção de uma reserva
    Given existe um usuário "Hoteleiro" do hotel "Encantado" logado com o username "maria@gmail.com" e a senha "let1234"
    And o quarto "Flores" tem uma promoção de "20%" cadastrada com o valor promocional de "R$ 1040.00" a diária
    When uma requisição PUT é enviada para "/reservation/{reservation_id}/promotions" com desconto de "60%" e promoção "ILIMITADA"
    Then o status da resposta deve ser "200"
    And é retornada a mensagem "A promoção foi atualizada com sucesso!"

Scenario: Deletar todas as promoções
    Given existe um usuário "Hoteleiro" do hotel "Encantado" logado com o username "leticiagaspar" e a senha "let1234"
    And o quarto "Flores" tem uma promoção de "30%" cadastrada com o valor promocional de "R$ 910.00" a diária
    And o quarto "Campos" tem uma promoção de "20%" cadastrada com o valor promocional de "R$ 1120.00" a diária
    And o quarto "Jardins" não possui nenhuma promoção cadastrada e seu valor original é "R$ 1500.00" a diária
    When uma requisição DELETE é enviada para "/reservation/promotions" 
    Then o status da resposta deve ser "200"
    And é retornada a mensagem "Todas as promoções foram deletadas com sucesso!"

Scenario: Cadastrar uma promoção em todas as reservas publicadas
    Given existe um usuário "Hoteleiro" do hotel "Encantado" logado com o username "leticiagaspar" e a senha "let1234"
    And o quarto "Flores" está nas reservas publicadas com o valor de "R$ 1300.00" a diária
    And o quarto "Jardins" está nas reservas publicadas com o valor de "R$ 1500.00" a diária
    And o quarto "Campos" está nas reservas publicadas com o valor de "R$ 1400.00" a diária 
    When uma requisição POST é enviada para "/reservation/promotions" com o desconto de "20%" e promoção "ILIMITADA"
    Then o status da resposta deve ser "201"
    And é retornada a mensagem "A promoção foi cadastrada em todas as reservas com sucesso!"

Scenario: Deletar todas as promoções com nenhuma promoção cadastrada
    Given existe um usuário "Hoteleiro" do hotel "Encantado" logado com o username "leticiagaspar" e a senha "let1234"
    And não há nenhum quarto com promoção cadastrada
    When uma requisição DELETE é enviada para "/reservation/promotions"
    And o status da resposta deve ser "404"
    And é retornada a mensagem "Não há promoção cadastrada"