Scenario: Applying a “discount code”

Given: I am on the "Shopping Cart" page.
And: I have a discount code named “FOGOGRATIS”.
When: I enter “FOGOGRATIS” in the "Discount Code" field.
Then: The system verifies the discount code.
And: The system applies the discount to the current value of the shopping cart.
And: The new value is updated on the screen..



CORRECTED CHANGES OF THE SCENARIOS



Scenario: Changing the “discount code”
Given: I am on the "Shopping Cart" page. 
And: I have already applied a discount code “IANGABRIEL” to the cart. 
And: I have another code named “FELIPENEIVA”.
When: I decide to change the applied discount “IANGABRIEL” code to “FELIPENEIVA”. 
And: I locate the "Discount Code" input field. 
And: I enter the “FELIPENEIVA” discount code. 
Then: The system verifies the new discount code for validity and applicability to the items in my cart. 
And: If the new discount code is valid and meets the requirements, the system replaces the previous discount code with the new one. 
And: The updated total price reflecting the new discount code is displayed. 
