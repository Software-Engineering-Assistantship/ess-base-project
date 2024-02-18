Cenários de GUI:

Cenário 1 - Adicionar Review (completo)
Given Eu estou logado com o usuário “Pedro Monte”
And Eu estou na aba do restaurante “Casa dos Doces”
And Eu vejo a informação “11 reviews” com nota média de 4 estrelas
When Eu aperto em “Fazer review”
And Surge uma janela de preenchimento de review
And Eu preencho o título “O melhor bem casado da cidade!”
And Eu preencho o texto do review "Doces perfeitos. Coxinha nota 10"
And Eu dou a nota “5” para o restaurante “Casa dos Doces”
And Eu clico em “Enviar”
And Aparece uma mensagem “Concluído”
And Eu vejo a informação “12 reviews” com nota média de 4 estrelas
And Eu clico em "Reviews de Usuários"
Then Eu vejo o review "O melhor bem casado da cidade"

Cenário 2 - Adicionar Nota
Given Eu estou logado com o usuário “Pedro Monte”
And Eu estou na aba do restaurante “Casa dos Doces”
And Eu vejo a informação “11 reviews” com nota média de 4 estrelas
And Eu vejo a região “Faça uma avaliação” com 5 estrelas cinzas
When Eu aperto em 4 estrelas
Then As 4 estrelas ficam amarelas
And O número de avaliações sobe para “11 reviews”
And A nota mantém em 4 estrelas

Cenário 3 - Visualização dos Reviews de um Restaurante
Given Eu estou logado com o usuário “Maria Letícia”
And Eu estou na aba do restaurante “Casa dos Doces”
When Eu aperto em “Reviews de Usuários”
Then Abre uma aba com reviews de usuários
And Eu vejo o review "O melhor bem casado da cidade!" de Pedro Monte, com nota 5 e 5 likes
And Eu vejo o review "Coxinha Fria" de Maria Letícia, com nota 3 e 1 like e 3 deslikes
 
Cenário 4 - Visualização de um Review de um usuário
Given Eu estou logado com o usuário “Maria Letícia”
And Eu estou na aba de “Reviews de Usuários” do restaurante “Casa dos Doces”
And Eu vejo o review “Coxinha fria” escrito por “Maria Letícia”
And Eu clico em “Ver Mais”
Then Surge uma página com mais informações do review
And Eu vejo a nota 3 estrelas
And Eu vejo a foto de uma coxinha
And Eu vejo a nota 2 estrelas dadas para “Sabor”
And Eu vejo a nota 3 estrelas dadas para “Tempo de Espera”
And Eu vejo a nota 5 estrelas dadas para “Atendimento”
And Eu vejo 3 cifrões dados para “Preço”
And Eu vejo 5 likes

Cenário 5 - Visualização de um Review criado pelo usuário logado
Given Eu estou logado com o usuário “Maria Letícia”
And Eu estou na aba de “Reviews de Usuários” do restaurante “Casa dos Doces”
And Eu vejo o review "O melhor bem-casado da cidade!" por Pedro Monte
And Eu clico em "Ver Mais"
Then Surge uma página do review "O melhor bem-casado da cidade!"
And Eu vejo a nota 5 estrelas
And Eu vejo a foto de um bem casado
And Eu vejo a nota 5 estrelas dadas para “Sabor”
And Eu vejo a nota 5 estrelas dadas para “Tempo de Espera”
And Eu vejo a nota 5 estrelas dadas para “Atendimento”
And Eu vejo 3 cifrões dados para “Preço”
And Eu vejo 1 like e 3 deslikes
And Eu vejo a opção “Editar Review”

Cenário 6 - Edição de Review (completo)
Given Eu estou logado com o usuário “Maria Letícia”
And Eu estou na página do review “Coxinha Fria” escrita por “Maria Letícia” do restaurante “Casa dos Doces”
When Eu clico na opção “Editar Review”
And Surge uma aba de editar review
And Eu mudo o título do review para “Coxinha Boa”
And Eu mudo a nota para 4 estrelas
And Eu clico em “Salvar”
Then Surge uma mensagem escrito “Concluído”
And Eu volto para a página do review
And Eu vejo o título "Coxinha boa"
And Eu vejo a nota 4 estrelas

Cenário 7 - Remoção de Review
Given Eu estou logado com o usuário “Maria Letícia”
And Eu estou na página do review “Coxinha Fria” escrita por “Maria Letícia” do restaurante “Casa dos Doces”
When Eu clico na opção “Editar Review”
And Eu clico no botão “Excluir”
Then Surge uma mensagem “Review excluído com sucesso”
And Eu vejo o review "Brigadeiro belga delicioso" de Ana Sofia no lugar de "Coxinha fria"

Cenário 8 - Dar Like num review
Given Eu estou logado com o usuário “Maria Letícia”
And Eu estou na aba de “Reviews de Usuários” do restaurante “Casa dos Doces”
And Eu vejo o review “O melhor bem casado da cidade!” escrito por “Pedro Monte”
And Eu vejo que o review tem 5 likes e 0 deslikes
When Eu clico no botão de like
Then O botão de like fica preto
And O número de likes sobe para 6

Cenário 9 - Dar Deslike num review
Given Eu estou logado com o usuário “Maria Letícia”
And Eu estou na aba de “Reviews de Usuários” do restaurante “Casa dos Doces”
And Eu vejo o review “Coxinha fria” escrito por “Maria Leticia”
And Eu vejo que o review tem 1 like e 3 deslikes
When Eu clico no botão de deslike
Then O botão de deslike fica preto
And O número de deslikes sobe para 4

Cenário 10 - Visualizar Reviews de um Usuário pelo Perfil
Given Eu estou logado com o usuário “Guilherme Maranhão”
And Eu vejo a opção Reviews(13)
When Eu clico em “Reviews(13)”
Then Eu vou para uma página contendo todos os reviews feitos pelo usuário “Guilherme Maranhão”
And Eu vejo o review "Torta perfeita!!" para o restaurante Casa dos Doces
And Eu vejo o review "Melhores salgados da vida" para o restaurante Marcelinho dos Salgados

Cenários de Serviço:

Cenário 1 - Criar Review
Given Não existem reviews feitos para o restaurante de ID "30"
And O usuário de ID "40" deseja criar um review de título "Coxinha Boa"
When Uma requisição POST é feita para /review/ associada ao restaurante de ID "30" e usuário de ID "40"
Then O status da resposta deve ser OK (200)
And Uma requisição GET para /review/restaurant/30 deve retornar uma lista contendo apenas o review "Coxinha Boa"

Cenário 2 - Adicionar Nota
Given Não existem notas dadas para o restaurante de ID "30"
And O usuário de ID "40" deseja dar a nota 5 para o restaurant de ID "30"
When Uma requisição POST é feita para /ratings/ associada ao restaurante de ID "30" e usuário de ID "40"
Then O status da resposta deve ser OK (200)
And Uma requisição GET para /ratings/restaurant/30 deve retornar uma lista contendo apenas 

Cenário 3 - Obter Média de Notas de um Restaurante
Given O restaurante de ID "30" contém três notas dadas em reviews "5", "4", "3"
When Uma requisição GET é feita para /ratings/restaurant/30/avg
Then O status de resposta deve ser OK (200)
And O JSON da resposta deve conter o ID "30" do restaurante e a média "4" 

Cenário 4 - Obter lista de reviews de um restaurante
Given O restaurante de id "30" contém três reviews
When é feita uma requisição GET para "/reviews/restaurant/30"
Then O status da resposta deve ser OK (200)
And Deve ser retornado um JSON com três reviews
And O review de id "5" e nome "Coxinha Boa" deve estar presente
And O review de id "6" e nome "Bom bem casado" deve estar presente
And O review de id "7" e nome "Torta" deve estar presente

Cenário 5 - Visualização de um Review
Given O restaurante de id "30" contém um review de ID "123"
When é feita uma requisição GET para "/reviews/123"
Then O status da resposta deve ser OK (200)
And Deve ser retornado um JSON com o review de ID "123"

Cenário 6 - Edição de Review
Given O restaurante de id "30" contém um review de ID "123" e título "Coxinha Boa"
When é feita uma requisição PUT para "/reviews/123" alterando o título para "Coxinha Ruim"
Then O status da resposta deve ser OK (200)
And Uma requisição GET para /review/123 retorna um JSON contendo o review "Coxinha Ruim"

Cenário 7 - Remoção de Review
Given O restaurante de id "30" contém um review de ID "123" e título "Coxinha Boa"
When é feita uma requisição DELETE para "/reviews/123"
Then O status da resposta deve ser OK (200)
And Uma requisição GET para /review/123 deve ter como status de resposta "404"

Cenário 8 - Visualizar Reviews a partir de um user
Given O usuário de ID "123" contém dois reviews feitos
When é feita uma requisição GET para "/reviews/user/123"
Then O status da resposta deve ser OK (200)
And Deve retornar um JSON contendo dois reviews
And O review de id "5" e nome "Coxinha Boa" deve estar presente
And O review de id "6" e nome "Ótimo Sushi" deve estar presente

Cenário 9 - Criar review dado que uma nota já existe
Given O usuário de ID "123" deu a nota "4" para o restaurante de ID "30"
When É feita uma requisição POST para /reviews/ com ID do restaurante "30", ID do usuário "123", título "Coxinha Boa" e nota "4.5"
Then O status da resposta deve ser OK (200)
And Uma requisição get para /reviews/30 deve retornar um JSON que contém o review "Coxinha Boa" feito pelo usuário de ID "123"
And Uma requisição get para /ratings/30 deve retornar um JSON que contém a nota atualizada "4.5" dada pelo usuário de ID "123"