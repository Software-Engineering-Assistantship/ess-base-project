Scenario: Adding a valid discount coupon to the system
    Given There is no coupon in the system with "nome" equal to "LUIZ" and "desconto" equal to 25
    When I make a "POST" request to "/cupom with name "LUIZ" and discount "25"
    Then I receive a response with status code "201"
    And I receive a response with the message "Cupom criado com sucesso"