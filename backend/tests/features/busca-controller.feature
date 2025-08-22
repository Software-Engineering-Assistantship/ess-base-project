Feature: Busca de reservas com filtro (localidade, preço, reviews, etc.) 
    As a pessoa interessada em realizar uma reserva ou viajar
    I want to fazer uma busca por reservas 
    So that eu possa avaliar a melhor opção para mim

    Scenario: busca bem sucedida, encontrando reservas
        Given o banco de reservas publicadas possui uma reserva publicada com local "Recife", quantidade de pessoas "3" e quantidade de quartos "1"
        And o banco de reservas possui uma reserva com data de checkin "2024-06-18", checkout "2024-06-21", id de reserva publicada "1", num_adults "2" e num_children "1"
        When uma requisição POST for enviada para "/reservations" com o corpo da requisição sendo um JSON com campo city preenchido com "Recife", campo num_adults preenchido com "2", campo num_children preenchido com "1", campo num_rooms preenchido com "1", checkin com "2024-06-18" e checkout com "2024-06-21"
        Then a busca deve ter código "200"
        And o JSON da resposta deve conter a reserva publicada com city "Recife", num_people "3" e num_rooms "1" 

    Scenario: busca bem sucedida, sem encontrar reservas
        Given o banco de reservas publicadas não possui uma reserva publicada com local "Recife", quantidade de pessoas "3" e quantidade de quartos "2"
        When uma requisição POST for enviada para "/reservations" com o corpo da requisição sendo um JSON com campo city preenchido com "Recife", campo num_adults preenchido com "2", campo num_children preenchido com "1", campo num_rooms preenchido com "2", checkin com "2024-06-18" e checkout com "2024-06-21"
        Then a busca deve ter código "200"
        And o JSON da resposta deve estar vazio

    Scenario: busca mal sucedida (Numero de quartos nao preenchido)
        Given o banco de reservas publicadas possui uma reserva publicada com local "Recife", quantidade de pessoas "3" e quantidade de quartos "1"
        And o banco de reservas possui uma reserva com data de checkin "2024-06-18", checkout "2024-06-21", id de reserva publicada "1", num_adults "2" e num_children "1"
        When uma requisição POST for enviada para "/reservations" com o corpo da requisição sendo um JSON com campo city preenchido com "Recife", campo num_adults preenchido com "2", campo num_children preenchido com "1", campo num_rooms não preenchido, checkin com "2024-06-18" e checkout com "2024-06-21"
        Then a busca deve ter código "400"
        And o JSON da resposta deve conter a mensagem "num_rooms is required"

    Scenario: busca mal sucedida (Numero de adultos nao preenchido)
        Given o banco de reservas publicadas possui uma reserva publicada com local "Recife", quantidade de pessoas "3" e quantidade de quartos "1"
        And o banco de reservas possui uma reserva com data de checkin "2024-06-18", checkout "2024-06-21", id de reserva publicada "1", num_adults "2" e num_children "1"
        When uma requisição POST for enviada para "/reservations" com o corpo da requisição sendo um JSON com campo city preenchido com "Recife", campo num_adults não preenchido, campo num_children preenchido com "1", campo num_rooms preenchido com "1", checkin com "2024-06-18" e checkout com "2024-06-21"
        Then a busca deve ter código "400"
        And o JSON da resposta deve conter a mensagem "num_adults is required"

    Scenario: busca de reserva por id
        Given o banco de reservas publicadas possui uma reserva publicada com id "1", local "Recife", quantidade de pessoas "3", quantidade de quartos "1" e promoção com id "1"
        And o banco de reservas possui uma reserva com data de checkin "2024-06-18", checkout "2024-06-21", id de reserva publicada "1", num_adults "2" e num_children "1"
        And o banco de promoções possui uma promoção com id "1", disconto de "5%" e tipo "ILIMITADA"
        When uma requisição GET for enviada para "/reservations/1" 
        Then a busca deve ter código "200"
        And o JSON da resposta deve conter a reserva publicada com city "Recife", num_people "3", num_rooms "1", promotion_id "1" e Promotion com id "1", disconto de "5%" e tipo "ILIMITADA"