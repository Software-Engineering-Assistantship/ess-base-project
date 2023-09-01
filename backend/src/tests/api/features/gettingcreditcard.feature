Scenario: Getting cards from the system
    Given There is a credit card in the system with "nome" equal to "Luiz Mamals", "numero_cartao" equal to 3030 6969 1234 9232, "cvv" equal to 753 and "validade" equal to "05/32" and another credit card with "nome" equal to "Brendinha", "numero_cartao" equal to 9321 4242 9123 4432, "cvv" equal to 342 and "validade" equal to "01/32"
    When I make a "GET" request to "/cartoes"
    Then I receive a response with status code "200"
    And I receive a response with the message [{'nome': 'Luiz Mamals', 'numero_cartao': '3030 6969 1234 9232', 'cvv': 753, 'validade': '05/32'}, {'nome': 'Brendinha', 'numero_cartao': '9321 4242 9123 4432', 'cvv': 342, 'validade': '01/32'}]
    