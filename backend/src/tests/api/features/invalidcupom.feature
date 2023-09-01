Scenario: Adding an invalid discount coupon to the system
    Given I want to add a discount coupon with "nome" as "LUIZ" and "desconto" as 25
    And There is a coupon in the system with "nome" equal to "LUIZ" and "desconto" equal to 25
    When I make a "POST" request to "/cupom with name "LUIZ" and discount "25"
    Then I receive a response with status code "400"
    And I receive a response with the message "Cupom já registrado"

