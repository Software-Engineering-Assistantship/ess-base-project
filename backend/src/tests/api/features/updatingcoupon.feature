Scenario: Updating a coupon in the system
    Given there is a coupon in the system with "nome" equal to "SummerSale", "desconto" equal to 20
    When I make a "PUT" request to "/cupom/SummerSale" with name "SummerSale" and discount "20"
    Then I receive a response with status code "201"
    And I receive a response with the message "Cupom de nome SummerSale teve seu desconto alterado para 20"