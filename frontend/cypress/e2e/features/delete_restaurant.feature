Scenario: deletar restaurante cadastrado
        Given  o usuário está na página "restaurants/update/123"
        And o usuário vê "Ta San Yuen" no campo de nome do restaurante
        And o usuário vê "Quarenta e Oito, 144 - Cidade Universitária, recife" nos campos de endereço
        When o usuário clica em "#delete-button"
        Then o usuário vê a mensagem "Restaurante foi deletado com sucesso"
        When o usuário clica em "#cancelBtn"
        And  o usuário está na página "restaurants"
        And  o usuário não vê "Ta San Yuen" com localização "Quarenta e Oito, 144 - Cidade Universitária, recife"