Scenario: editar restaurante cadastrado
    Given o usuário está na página "restaurants/update/123"
    And o usuário vê "Macunaíma" no campo de nome do restaurante
    And o usuário vê "Confeitaria" no campo de tipo de comida
    When o usuário atualizo o tipo de comida para "Creperia"
    And o usuário clica em "#create-button"
    Then o usuário a mensagem "O restaurante foi editado com sucesso"
    When o usuário clica em "#cancelBtn"
    Then  o usuário é redirecionado para a página "restaurantse/123"
    And o usuário vê "Macunaíma" como nome do restaurante
    And o usuário vê "Creperia" como tipo de comida
