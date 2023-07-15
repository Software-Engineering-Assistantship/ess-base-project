Scenario: Applying a “discount code”

Given: I am on the "Shopping Cart" page.
And: I have a discount code named “FOGOGRATIS”.
When: I enter “FOGOGRATIS” in the "Discount Code" field.
Then: The system verifies the discount code.
And: If the discount code is valid and meets the requirements, the system applies the discount to the current value of the shopping cart.
And: The new value is updated on the screen..