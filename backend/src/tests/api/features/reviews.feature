Scenario: Editar review
Given um review existente na base de dados com ID "Z"
And os novos dados do review: "title": "Great Song", "description": "This song is fantastic. I loved it!", "rating": 5, "author": "Reviewer Name", "song": "id"
When uma requisição "PUT" for enviada para "/reviews/Z" com os novos dados
Then o status da resposta deve ser "200"
And a resposta deve conter a mensagem "'title': 'Great Song', 'description': 'This song is fantastic. I loved it!', 'rating': 5, 'author': 'Reviewer Name', 'song': 'id'"

Scenario: Deletar review
Given um review existente na base de dados com ID "Y"
When uma requisição "DELETE" for enviada para "/reviews/Y"
Then o status da resposta deve ser "200"
And a resposta deve conter a mensagem "id: Y"

Scenario: Deletar review inexistente
Given um ID de review "Z" que não existe na base de dados
When uma requisição "DELETE" for enviada para "/reviews/Z"
Then o status da resposta deve ser "404"
And a resposta deve conter a mensagem "Item not found"
