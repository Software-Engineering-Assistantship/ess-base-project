Scenario: cadastrar restaurante novo GUI

    Given o usuário está na página "restaurants/create"
    And o restaurante "Marcelinho Salgados" não está cadastrado no site
    And o usuário define o nome do restaurante como "Marcelinho Salgados"
    And o usuário define o endereço como "Av. Jorn. Aníbal Fernandes, 150 - Cidade Universitária, Recife"
    And o usuário define o tipo de comida como "salgados"
    When o usuário clica em "#create-button"
    Then o usuário vê a mensagem "O restaurante foi cadastrado com sucesso"
    When o usuário clica em "#cancelBtn"
    Then o usuário vê "Marcelinho Salgados" como nome do restaurante
    And o usuário vê "salgados" como tipo de comida
    And o usuário vê "Av. Jorn. Aníbal Fernandes, 150 - Cidade Universitária, Recife" como endereço
