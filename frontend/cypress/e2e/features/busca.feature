Feature: Busca de reservas com filtro (localidade, preço, reviews, etc.) 
    As a pessoa interessada em realizar uma reserva ou viajar
    I want to fazer uma busca por reservas 
    So that eu possa avaliar a melhor opção para mim

    Scenario: fazer uma busca de reservas sem login, encontrando reservas
        Given eu estou na página inicial 
        And eu não estou logado
        When eu preencho o campo "destino" com "Recife"
        And eu preencho o campo "checkin" com "2024-07-21"
        And eu preencho o campo "checkout" com "2024-07-22"
        And eu clico no campo "detalhes"
        And eu clico no campo de "adultos" "2" vezes
        And eu clico no campo de "quartos" "1" vez
        And eu clico em "pesquisar"
        Then eu sou redirecionado para a página "/search?city=Recife&checkin=2024-07-21&checkout=2024-07-22&num_adults=2&num_children=0&num_rooms=1"
        And eu vejo o "Quarto Outono" com o valor promocional de "1000"

    Scenario: fazer uma busca de reservas sem login, sem encontrar reservas
        Given eu estou na página inicial 
        And eu não estou logado
        When eu preencho o campo "destino" com "Recife"
        And eu preencho o campo "checkin" com "2024-07-23"
        And eu preencho o campo "checkout" com "2024-07-28"
        And eu clico no campo "detalhes"
        And eu clico no campo de "adultos" "2" vezes
        And eu clico no campo de "quartos" "1" vez
        And eu clico em "pesquisar"
        Then eu sou redirecionado para a página "/search?city=Recife&checkin=2024-07-23&checkout=2024-07-28&num_adults=2&num_children=0&num_rooms=1"
        And eu vejo que "Nenhuma reserva foi encontrada"

    Scenario: fazer uma busca de reservas sem login, colocando dados errados para quantidade de pessoas
        Given eu estou na página inicial
        And eu não estou logado
        When eu preencho o campo "destino" com "Recife"
        And eu preencho o campo "checkin" com "2024-07-23"
        And eu preencho o campo "checkout" com "2024-07-28"
        And eu clico no campo "detalhes"
        And eu clico no campo de "criancas" "2" vezes
        And eu clico no campo de "quartos" "1" vez
        And eu clico em "pesquisar"
        Then eu vejo um toast de erro com "Quantidade de pessoas está errada"
        And eu continuo na página de busca de reservas

    Scenario: fazer uma busca de reservas sem login, sem colocar a quantidade de quartos
        Given eu estou na página inicial
        And eu não estou logado
        When eu preencho o campo "destino" com "Recife"
        And eu preencho o campo "checkin" com "2024-07-23"
        And eu preencho o campo "checkout" com "2024-07-28"
        And eu clico no campo "detalhes"
        And eu clico no campo de "adultos" "2" vezes
        And eu clico em "pesquisar"
        Then eu vejo uma mensagem dizendo que o "Quantidade de quartos precisa ser maior que 0"
        And eu continuo na página de busca de reservas

    Scenario: fazer uma busca de reservas com login, sem preencher o campo de cidade
        Given eu estou na página inicial
        And eu estou logado como hoteleiro com username "viccesar" e senha "vic1234"
        When eu preencho o campo "checkin" com "2024-07-23"
        And eu preencho o campo "checkout" com "2024-07-28"
        And eu clico no campo "detalhes"
        And eu clico no campo de "adultos" "2" vezes
        And eu clico no campo de "quartos" "1" vez
        And eu clico em "pesquisar"
        Then eu vejo uma mensagem dizendo que o "Local não foi especificado"
        And eu continuo na página de busca de reservas
    


    Scenario: fazer uma busca de reservas com login, sem encontrar reservas
        Given eu estou na página inicial 
        And eu estou logado como hoteleiro com username "viccesar" e senha "vic1234"
        When eu preencho o campo "destino" com "Recife"
        And eu preencho o campo "checkin" com "2024-07-23"
        And eu preencho o campo "checkout" com "2024-07-28"
        And eu clico no campo "detalhes"
        And eu clico no campo de "adultos" "2" vezes
        And eu clico no campo de "quartos" "1" vez
        And eu clico em "pesquisar"
        Then eu sou redirecionado para a página "/search?city=Recife&checkin=2024-07-23&checkout=2024-07-28&num_adults=2&num_children=0&num_rooms=1"
        And eu vejo que "Nenhuma reserva foi encontrada"

    Scenario: fazer uma busca de reservas com login, encontrando reservas
        Given eu estou na página inicial 
        And eu estou logado como hoteleiro com username "viccesar" e senha "vic1234"
        When eu preencho o campo "destino" com "Recife"
        And eu preencho o campo "checkin" com "2024-07-21"
        And eu preencho o campo "checkout" com "2024-07-22"
        And eu clico no campo "detalhes"
        And eu clico no campo de "adultos" "2" vezes
        And eu clico no campo de "quartos" "1" vez
        And eu clico em "pesquisar"
        Then eu sou redirecionado para a página "/search?city=Recife&checkin=2024-07-21&checkout=2024-07-22&num_adults=2&num_children=0&num_rooms=1"
        And eu vejo o "Quarto Outono" com o valor promocional de "1000"

    Scenario: teste de data padrão em check-in
        Given eu estou na página inicial
        When eu vejo o campo "checkin"
        Then ele deve possuir como "value" a data de hoje