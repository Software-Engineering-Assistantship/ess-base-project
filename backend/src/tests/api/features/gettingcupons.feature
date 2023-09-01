Scenario: Getting coupons from the system
    Given There is a coupon in the system with "nome" equal to "MAQUINADOAMOR", "desconto" equal to 83 and another coupon with "nome" equal to "MICHAELJACKSON", "desconto" equal to 30
    When I make a "GET" request to "/cupom"
    Then I receive a response with status code "200"
    And I receive a response with the message [{'nome': 'MAQUINADOAMOR', 'desconto': 83}, {'nome': 'MICHAELJACKSON', 'desconto': 30}]