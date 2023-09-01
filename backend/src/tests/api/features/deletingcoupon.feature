Scenario: Deleting a coupon from the system
    Given there is a coupon in the system with "nome" equal to "SummerSale", "desconto" equal to 20
    When I make a "DELETE" request to "/cupom/SummerSale"
    Then I receive a response with status code "201"
    And I receive a response with the message "Cupom de nome SummerSale deletado com sucesso"