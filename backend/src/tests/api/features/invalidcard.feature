Scenario: Adding an invalid credit card to the system
    Given I want to add a credit card with "nome" as "Invalid Card", "numero_cartao" as "1234567890123456", "cvv" as 123, and "validade" as "12/25"
    And There is a credit card in the system with "nome" equal to "Invalid Card", "numero_cartao" equal to 1234567890123456, "cvv" equal to 123 and "validade" equal to "12/25"
    When I make a "POST" request to "/cartoes" with name "Invalid Card", "numero_cartao" equal to 1234567890123456, "cvv" equal to 123 and "validade" equal to "12/25"
    Then I receive a response with status code "400"
    And I receive a response with the message "Cartão já registrado"


Scenario: Adding a valid credit card to the system
    Given I want to add a credit card with "nome" as "Invalid Card", "numero_cartao" as "1234567890123456", "cvv" as 123, and "validade" as "12/25"
    And There is a credit card in the system with "nome" equal to "Invalid Card", "numero_cartao" equal to 1234567890123456, "cvv" equal to 123 and "validade" equal to "12/25"
    When I make a "POST" request to "/cartoes" with name "Invalid Card", "numero_cartao" equal to 1234567890123456, "cvv" equal to 123 and "validade" equal to "12/25"
    Then I receive a response with status code "201"
    And I receive a response with the message "Cartão criado com sucesso"