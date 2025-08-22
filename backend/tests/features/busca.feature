Feature: Busca de reservas com filtro (localidade, preço, reviews, etc.) 
    As a pessoa interessada em realizar uma reserva ou viajar
    I want to fazer uma busca por reservas 
    So that eu possa avaliar a melhor opção para mim
    
    Scenario: fazer uma busca de reservas sem login, encontrando reservas
    Given eu estou na página inicial 
    And eu não estou logado
    When eu seleciono o botão de buscas no site
    And eu preencho o filtro de local com “Recife”
    And eu preencho o filtro de data de check-in com “17/05/2024”
    And eu preencho o filtro de data de check-out com “19/05/2024”
    And eu preencho o filtro de quantidade de pessoas com “2 adultos” e “0 crianças”
    And eu preencho o filtro de quartos com “1 quarto”
    And eu clico em pesquisar
    Then eu sou redirecionado para a página “Resultados”
    And eu vejo opções de reservas com esses filtros

    Scenario: fazer uma busca de reservas sem login, sem encontrar reservas
    Given eu estou na página inicial 
    And eu não estou logado
    When eu seleciono o botão de buscas no site
    And eu preencho o filtro de local com “Recife”
    And eu preencho o filtro de data de check-in com “16/05/2024”
    And eu preencho o filtro de data de check-out com “21/05/2024”
    And eu preencho o filtro de quantidade de pessoas com “2 adultos” e “0 crianças”
    And eu preencho o filtro de quartos com “1 quarto”
    And eu seleciono para pesquisar
    Then eu vou para a página “resultados”
    And eu vejo que não existem resultados para minha busca

    Scenario: fazer uma busca de reservas sem login, colocando dados errados para quantidade de pessoas
    Given eu estou na página inicial
    And eu não estou logado
    When eu seleciono o botão de buscas no site
    And eu preencho o filtro de local com “Recife”
    And eu preencho o filtro de data de check-in com “17/05/2024”
    And eu preencho o filtro de data de check-out com “19/05/2024”
    And eu preencho o filtro de quantidade de pessoas com “0 adultos” e “2 crianças”
    And eu preencho o filtro de quartos com “1 quarto”
    Then eu vejo uma mensagem dizendo que a quantidade de pessoas está errada
    And eu continuo na página de busca de reservas

    Scenario: fazer uma busca de reservas com login, sem preencher todos os campos
    Given eu estou na página inicial
    And eu estou logado
    When eu seleciono o botão de buscas no site
    And eu não preencho o filtro de local
    And eu preencho o filtro de data de check-in com “17/05/2024”
    And eu preencho o filtro de data de check-out com “19/05/2024”
    And eu preencho o filtro de quantidade de pessoas com “0 adultos” e “2 crianças”
    And eu preencho o filtro de quartos com “1 quarto”
    And eu seleciono para pesquisar
    Then eu vejo uma mensagem dizendo que o local não foi especificado
    And eu continuo na página de busca de reservas

        Scenario: fazer uma busca de reservas com login, sem encontrar reservas
    Given eu estou na página inicial 
    And eu estou logado com o usuário “Maria” com senha "123"
    When eu seleciono o botão de buscas no site
    And eu preencho o filtro de local com “Recife”
    And eu preencho o filtro de data de check-in com “16/05/2024”
    And eu preencho o filtro de data de check-out com “21/05/2024”
    And eu preencho o filtro de quantidade de pessoas com “2 adultos” e “0 crianças”
    And eu preencho o filtro de quartos com “1 quarto”
    And eu clico em pesquisar
    Then eu vou para a página “resultados”
    And eu vejo que não existem resultados para minha busca

    Scenario: fazer uma busca de reservas com login, encontrando reservas
    Given eu estou na página inicial 
    And eu estou logado com o usuário “Maria” com senha "123"
    When eu seleciono o botão de buscas no site
    And eu preencho o filtro de local com “Recife”
    And eu preencho o filtro de data de check-in com “16/05/2024”
    And eu preencho o filtro de data de check-out com “21/05/2024”
    And eu preencho o filtro de quantidade de pessoas com “2 adultos” e “0 crianças”
    And eu preencho o filtro de quartos com “1 quarto”
    And eu clico em pesquisar
    Then eu sou redirecionado para a página “Resultados”
    And eu vejo opções de reservas com esses filtros

    Scenario: busca bem sucedida, encontrando reservas
        Given o banco de reservas publicadas possui uma reserva publicada com local "Recife", quantidade de pessoas "3" e quantidade de quartos "1"
        When uma requisição POST for enviada para "/reservations" com o corpo da requisição sendo um JSON com campo city preenchido com "Recife", campo num_adults preenchido com "2", campo num_children preenchido com "2", campo num_quartos preenchido com "1", checkin com "2024-06-18" e checkout com "2024-06-21"
        Then a busca deve ser bem sucedida
        And o JSON da resposta deve conter a reserva publicada com city "Recife", num_people "3" e num_rooms "1" 
