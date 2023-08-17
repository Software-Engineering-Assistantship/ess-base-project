Scenario: removing a payment method.

Given: I am on the "Payment Methods" page.
And: I have a card that finishes with “0032” added at my payment methods.
When: I locate the payment card that finishes with "0032" that I want to remove.
And: I click on the "Remove" associated with that payment method.
Then: The system asks for confirmation.
And: I confirm the removal of the payment method.
And: The payment method is successfully removed.

Scenario: adding a new valid payment method.

Given: I am on the "Shopping Cart" page and I have a valid credit card.  
When: I select the "Add a new payment method" option. 
And: I enter "Ian Gabriel Braga Trinta" in the "Cardholder" field. 
And: I enter "753" in the "CVV" field. 
And: I enter "07/30" in the "Expiration date" field. 
And: I enter "4646 2600 0118 7816" in the "Card number" field. 
And: I select "Confirmar compra".  
Then: I remain on the "Shopping Cart" page. 
And: I can see the message "Adição confirmada" confirming the success of the operation.

Scenario: adding a new invalid payment method.

Given: I am on the "Shopping Cart" page and I have an invalid credit card.  
When: I select the "Add a new payment method" option. 
And: I enter "Ian Gabriel Braga Trinta" in the "Cardholder" field. 
And: I enter "753" in the "CVV" field. 
And: I enter "07/30" in the "Expiration date" field. 
And: I enter "4646 2600 0118 7816" in the "Card number" field. 
And: I select "Confirmar compra".  
Then: I remain on the "Shopping Cart" page. 
And: I can see the message "Operação não realizada" confirming the failure of the operation.


------------------------------ SERVICE SCENARIOS ---------------------------------------------------

 ****Payment*********

Funcionalidade: cadastrar/editar/deletar métodos de pagamento


Feature: Credit Card Service

Scenario: Add a valid credit card to the system
    Given the "criar" method of RepositorioCartao returns a credit card with "nome" as "Ian Gabriel Braga Trinta", "numero_cartao" as "4646260001187816", "cvv" as 753, and "validade" as "03/30"
    And there is no credit card in the system with "numero_cartao" equal to "4646260001187816"
    When the "POST" request is made to "/cartoes"
    Then the credit card is added to the system
    And a JSONResponse with "Cartão criado com sucesso" is received
    And the response status code is "201 Created"

Scenario: Fail to add a credit card due to an existing card
    Given: the "criar" method of RepositorioCartao returns a credit card with "nome" as "Ian Gabriel Braga Trinta", "numero_cartao" as "4646260001187816", "cvv" as 753, and "validade" as "03/30"
    And: there is a credit card in the system with "numero_cartao" equal to "4646260001187816"
    When: the "POST" request is made to "/cartoes"
    Then: the credit card is not added to the system
    And: a JSONResponse with "Cartão já registrado" is received
    And: the response status code is "400 Bad Request"

 Scenario: Obter todos os itens
    Given o ItemService retorna uma lista de itens
    When uma requisição "GET" for enviada para "/items"
    Then o status da resposta deve ser "200"
    And o JSON da resposta deve ser uma lista de itens 
    And o item com id "123" e nome "Exemplo de Item" está na lista
    And o item com id "456" e nome "Outro Item" está na lista

Scenario: Read the full registry of credit cards
    Given: the "relatorio" method of RepositorioCartao is called and returns a list of credit cards.
    When: the "GET" request is made to "/cartoes".
    Then: the server returns a list of credit cards.
    And: the response status code is "200 OK".
    And: The card with number "8123313214124214" is there.
    And: The card with number "3030303015158765" is there.

Scenario: Delete an existing credit card
    Given: the "check_card" method of RepositorioCartao is called with "4646260001187816" and returns True
    When: the "DELETE" request is made to "/cartoes/4646260001187816"
    Then: the credit card is removed from the system
    And: a JSONResponse with "Cartão removido" is received
    And: the response status code is "204 No Content"

Scenario: Delete a non-existing credit card
    Given the "remover" method of RepositorioCartao is called with "4646260001187816" and raises an HTTPException with status code 404 and detail "Cartão não encontrado"
    When the "DELETE" request is made to "/cartoes/4646260001187816"
    Then a JSONResponse with "Cartão não encontrado" is received
    And the response status code is "404 Not Found"


****Cupom*************

Scenario 1: Adding a valid discount coupon to the system
  Given: I want to add a discount coupon with "nome" as "BASEBALLBAT" and "desconto" as 25
  And: There is no coupon in the system with "nome" equal to "BASEBALLBAT"
  When: I make a "POST" request to "/cupom"
  Then: The coupon is added to the system
  And: I receive a JSONResponse with "Cupom criado com sucesso"
  And: The response status code is "201 Created"

Scenario 2: Failing to add a discount coupon to the system due to the existence of another coupon
  Given: I want to add a discount coupon with "nome" as "BASEBALLBAT" and "desconto" as 35
  And: There is a coupon in the system with "nome" equal to "BASEBALLBAT"
  When: I make a "POST" request to "/cupom"
  Then: The coupon is not added to the system
  And: I receive a JSONResponse with "Cupom já registrado"
  And: The response status code is "400 Bad Request"

Scenario 3: Reading the full registry of discount coupons
  Given: I want to see all the discount coupons added to the system.
  When: I make a "GET" request to "/cupom".
  Then: The server returns a list of discount coupons as the JSONResponse.
  And: The response status code is "200 OK".

Scenario 4: Changing the discount coupon to another valid coupon
  Given: I want to change a discount coupon with "nome" as "MEYNARMERCENARIO".
  And: The coupon is registered in the system.
  When: I make a "PUT" request to "/cupom/MEYNARMERCENARIO" containing the new information in the JSON file.
  Then: The coupon is updated in the system
  And: I receive a JSONResponse with the updated coupon details
  And: The response status code is "200 OK"

Scenario 5: Deleting a discount coupon that exists in the system
  Given: I want to delete a discount coupon with "nome" as "ANANDA"
  And: The coupon is registered in the system
  When: I make a "DELETE" request to "/cupom/ANANDA"
  Then: The coupon is removed from the system
  And: I receive a JSONResponse with "Cupom removido"
  And The response status code is "204 No Content"

Scenario 6: Deleting a discount coupon that does not exist in the system
  Given: I want to delete a discount coupon with "nome" as "LUIZNAOCLICA"
  And: The coupon is not registered in the system
  When: I make a "DELETE" request to "/cupom/LUIZNAOCLICA"
  Then: I receive a JSONResponse with "Cupom não encontrado"
  And: The response status code is "404 Not Found"






