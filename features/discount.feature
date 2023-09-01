Scenario: Applying a valid “discount code”

Given: I am on the "Shopping Cart" page.
And: I have a valid discount code named “FOGOGRATIS”.
When: I enter “FOGOGRATIS” in the "Discount Code" field.
Then: The discount code meets all the requirements, so the system applies the discount to the current value of the shopping cart.
And: The new value is updated on the screen.

Scenario: Applying an Invalid "Discount Code"

Given: I am on the "Shopping Cart" page.
And: I have an invalid discount code named "MEYNARMERCENÁRIO."
When: I enter "MEYNARMERCENÁRIO" in the "Discount Code" field.
Then: The system does not apply the discount to the current value of the shopping cart.
And: I can see the message on the screen: "O cupom não é válido."

Scenario: Changing the “discount code” to another valid "discount code"
Given: I am on the "Shopping Cart" page. 
And: I have already applied a discount code “IANGABRIEL” to the cart. 
And: I have another valid code named “FELIPENEIVA”.
When: I decide to change the applied discount “IANGABRIEL” code to “FELIPENEIVA”. 
And: I locate the "Discount Code" input field. 
And: I enter the “FELIPENEIVA” discount code. 
Then: The discount code meets all the requirements, so the system replaces the previous discount code with the new one. 
And: The updated total price reflecting the new discount code is displayed.


Scenario: Changing the “discount code” to an invalid "discount code"
Given: I am on the "Shopping Cart" page. 
And: I have already applied a discount code “IANGABRIEL” to the cart. 
And: I have another an invalid code named “LUFFY”.
When: I decide to change the applied discount “IANGABRIEL” code to “LUFFY”. 
And: I locate the "Discount Code" input field. 
And: I enter the “LUFFY” discount code. 
Then: The system does not apply the discount to the current value of the shopping cart.
And: The system keeps the previous code enabled.
And: I can see the message on the screen: "O cupom não é válido."

