Scenario: Editar uma música
Given uma música existente na base de dados com ID "X"
And os novos dados da música: title "Novo Nome", artist "Novo Cantor", genre "Novo Gênero", release_year "2019", popularity "10" e available_on "{}"
When uma requisição "PUT" for enviada para "/songs/X" com os novos dados da música
Then o status da resposta deve ser "200"
And a resposta deve conter "'title': 'Novo Nome', 'artist': 'Novo Cantor', 'genre': 'Novo Gênero', 'release_year': '2019', 'popularity': '10', 'available_on': {}"


Scenario: Deletar uma música
Given uma música existente na base de dados com ID "Y"
When uma requisição "DELETE" for enviada para "/songs/Y"
Then o status da resposta deve ser "200"
And a resposta deve conter a mensagem "id: Y"


Scenario: Deletar uma música que não existe
Given um ID de música "Z" que não existe na base de dados
When uma requisição "DELETE" for enviada para "/songs/Z"
Then o status da resposta deve ser "404"
And a resposta deve conter a mensagem "Item not found"


Scenario: Editar uma música com dados inválidos
Given uma música existente na base de dados com ID "X"
And os novos dados da música: title "", artist "Novo Cantor", genre "Novo Gênero", release_year "abcd", popularity "10" e available_on "{}"
When uma requisição "PUT" for enviada para "/songs/X" com os novos dados da música inválidos
Then o status da resposta deve ser "400"
And a resposta deve conter a mensagem "Invalid data"
