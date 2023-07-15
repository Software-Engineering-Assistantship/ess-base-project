Scenario: removing a payment method.

Given: I am on the "Payment Methods" page.
And: I have a card that finishes with “0032” added at my payment methods.
When: I locate the payment card that finishes with "0032" that I want to remove.
And: I click on the "Remove" associated with that payment method.
Then: The system asks for confirmation.
And: I confirm the removal of the payment method.
And: The payment method is successfully removed.



Scenario: adding a new payment method.

Given: I am on the "Shopping Cart" page.
When: I select "Add a new payment method".
And: I fill all my payment details.
Then: I am still at the “Shopping Cart” page.
And: I receive a message about the success of the operation.
And: I can see the added card on the screen.