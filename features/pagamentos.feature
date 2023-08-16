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


Funcionalidade: Cadastro e manutenção de itens no menu(Vitor)
Scenario 1: Adicionar um Produto ao menu geral com um ID ainda não utilizado
Given:  Sou um Usuário Logado no sistema com o cpf igual a "12345678910” e email 123@gmail.com
And: Quero adicionar o produto com ID 3, com a loja de cnpj 56789012345678, com o nome igual a “camisa de linho”, da marca “ciao”, preço “500” e especificações “100% Linho” 
And: Não existe um produto com ID 3
And: Existe uma loja com cnpj 56789012345678
When: Faço uma Requisição POST para a rota /produtos/3, usando o ID do produto que quero inserir como parâmetro path
Then: O produto é adicionado a entidade “produto” 
And: É retornado o produto criado

class cartao_credito(Base):
    __tablename__ = 'cartao_credito'
    nome = Column(String)
    numero_cartao = Column(String, primary_key=True, index=True)
    cvv = Column(Integer)
    validade = Column(String)

Scenario 1: Adding a valid credit card to the system

Given: I want to add an credit card with "nome" as "Ian Gabriel Braga Trinta", "numero_cartao" as "4646 2600 0118 7816", "cvv" as "753" and "validade" as 03/30.
And: There is no card in the system with "numero_cartao" equal to "4646 2600 0118 7816".
When: I make a "POST" request to "/cartoes".
Then: The card is added to the system.
And: I receive a JSONResponse with "cartão criado com sucesso"
And: The response status code is 201 Created.

Scenario 2: Failing to add a credit card to the system due to the existance of another card

Given: I want to add an credit card with "nome" as "Ian Gabriel Braga Trinta", "numero_cartao" as "4646 2600 0118 7816", "cvv" as "753" and "validade" as 03/30.
And: There is a card in the system with "numero_cartao" equal to "4646 2600 0118 7816".
When: I make a "POST" request to "/cartoes".
Then: The card is not added to the system.
And: I receive a JSONResponse with "cartão criado com sucesso"
And: The response status code is 201 Created.


Scenario 3: Reading the full registry of credit cards

Given: I want to see all the credit cards added to the system.
When: I make a "GET" request to "/cartoes".
Then: The server returns a list of credit cards.
And: The response status code is 200 OK.

Scenario 3: Changing 

