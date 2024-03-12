Scenario: cadastrar restaurante repetido
        Given o usuário está na página "restaurants/create"
        And o restaurante "Rainha da Várzea" com endereço "Av. Afonso Olindense, 2088 - Várzea, Recife" já está cadastrada no site
        And o usuário define o nome do restaurante como "Rainha da Várzea"
        And o usuário define o endereço como "Av. Afonso Olindense, 2088 - Várzea, Recife"
        And o usuário define o tipo de comida como "Panificação"
        When o usuário clica em "#create-button"
        Then eu vejo a mensagem "Há um restaurante com mesmo endereço e nome já cadastrado no sistema"
