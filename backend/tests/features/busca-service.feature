Feature: Busca Service

# Service
Scenario: Busca todas as reservas publicadas
    Given o método getAllPublishedReservations retorna um array com a reserva publicada de id "1", name "Quarto Standard", rooms "1", people "2", wifi "true", breakfast "true", airConditioner "true", parking "true", room_service "false", price "450", new_price "450", promotion_id "null", hotelier_id "1"
    When o método getAllPublishedReservations do PublishedReservationService for chamado
    Then o teste retornado deve conter id "1", name "Quarto Standard", rooms "1", people "2", wifi "true", breakfast "true", airConditioner "true", parking "true", room_service "false", price "450", new_price "450", promotion_id "null", hotelier_id "1"



    Given o método getTests do TestService retorna um array com o test de nome "test" e id "123"
    When o método getTests do TestService for chamado
    Then o array retornado deve conter o test de nome "test" e id "123"

Scenario: Return test by id
    Given o método getTest chamado com "123" do TestService retorna um test de nome "test" e id "123"
    When o método getTest do TestService for chamado com o id "123"
    Then o test retornado deve ter o nome "test" e id "123"