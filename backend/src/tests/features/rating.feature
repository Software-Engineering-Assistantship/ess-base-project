Feature: Avaliação de entrega

Scenario: Tentativa de criação de uma avaliação sem o campo rating
Given a API solicita o argumento rating como obrigatório para a criação da avaliação
When envio uma requisição POST para a rota /rating sem o campo rating
Then o status da resposta deve ser "400"
And o corpo da resposta deve conter a mensagem "Missing required field" 

Scenario: Tentativa de criação de uma avaliação com o status da entrega pendente
Given a API exige que o status do delivery indicado pelo campo deliveryId seja "entregue" como obrigatório para a criação da avaliação
When envio uma requisição POST para a rota /rating com o rating "5" e o delivery de id igual ao deliveryId tem o status "pendente"
Then o status da resposta deve ser "400"
And o corpo da resposta deve conter a mensagem "Rating not allowed yet" 

Scenario: Criação de uma avaliação com sucesso
Given a API solicita o argumento rating e o status do delivery indicado pelo campo deliveryId "entregue" como obrigatório para a criação da avaliação
When envio uma requisição POST para a rota /rating com o rating "5" e o delivery de id igual ao deliveryId tem o status "entregue"
Then o status da resposta deve ser "201"
And o corpo da resposta deve conter a mensagem "Rating created" 
