Scenario: Deleting a credit card from the system
    Given there is a credit card in the system with "nome" equal to "John Doe", "numero_cartao" equal to "1234567890123456", "cvv" equal to 123 and "validade" equal to "12/25"
    When I make a "DELETE" request to "/cartoes/1234567890123456"
    Then I receive a response with status code "200"
    And I receive a response with the message "Cartão de número '1234567890123456' removido"