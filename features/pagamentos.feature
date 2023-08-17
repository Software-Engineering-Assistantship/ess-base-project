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

Scenario
