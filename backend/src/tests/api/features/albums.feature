Scenario: Editar um álbum
Given um álbum existente na base de dados com ID "Y"
And os novos dados do álbum: título "Novo Título", artista "Novo Artista" e ano "2020"
When uma requisição "PUT" for enviada para "/albums/Y" com os novos dados do álbum
Then o status da resposta deve ser "200"
And a resposta deve conter a mensagem "'title': 'Novo Título', 'artist': 'Novo Artista', 'year': 2020"

Scenario: Deletar um álbum
Given um álbum existente na base de dados com ID "Y"
When uma requisição "DELETE" for enviada para "/albums/Y"
Then o status da resposta deve ser "200"
And a resposta deve conter a mensagem "'id': Y"

Scenario: Deletar um álbum que não existe
Given um ID de álbum que não existe na base de dados
When uma requisição "DELETE" for enviada para o endpoint correspondente
Then o status da resposta deve ser "404"
And a resposta deve conter a mensagem "Item não encontrado"

Scenario: Edição de um álbum com dados inválidos
Given uma álbum existente na base de dados com ID "X"
When uma requisição "PUT" for enviada para "/albums/X" com dados vazios
Then o status da resposta deve ser "400"
And a resposta deve conter a mensagem "Invalid data"
