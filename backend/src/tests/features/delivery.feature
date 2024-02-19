Feature: Pedido e entrega de itens da loja

Scenario: Tentativa de criação de um pedido sem nenhum item
Given a API solicita o argumento item como obrigatório para a criação do pedido
When envio uma requisição POST para a rota /delivery sem nenhum item
Then o status da resposta deve ser "400"
And o corpo da resposta deve conter a mensagem "Missing required item" 


Scenario: Criação de um pedido com sucesso
Given a API solicita o argumento item como obrigatório para a criação do pedido
Given existe um item com id "32", nome "Blusa Florida", quantidade "13", descrição "Blusa em Algodão", preço "50,00", imagem "link.com", cores "Azul, Rosa, Branco", tamanhos "P, M, G", categoria "Blusa"
When envio uma requisição POST para a rota /delivery com o item de id "32"
Then o status da resposta deve ser "201"
And o corpo da resposta deve conter a mensagem "Delivery created" 