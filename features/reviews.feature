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
Given Não existe review feito pelo usuário de ID "40" no restaurante de ID "30"
When Uma requisição POST é feita para /reviews/30/40 com título "Coxinha Boa"
Then O status da resposta deve ser OK (200)
And O review "Coxinha Boa" associada ao usuário "40" e restaurante "30" está no banco de dados

Cenário 2 - Adicionar Nota
Given Não existe nota dada para o restaurante de ID "30" pelo usuário de ID "40"
When Uma requisição POST é feita para /reviews/30/40 com a nota "5"
Then O status da resposta deve ser OK (200)
And A nota "5" associada ao usuário "40" e restaurante "30" está no banco de dados

Cenário 3 - Obter Média de Notas de um Restaurante
Given O restaurante de ID "30" contém três notas dadas em reviews "5", "4", "3"
When Uma requisição GET é feita para /reviews/30/40/avg
Then O status de resposta deve ser OK (200)
And O JSON da resposta deve conter o ID "30" do restaurante e a média "4" 

Cenário 4 - Obter lista de reviews de um restaurante
Given O restaurante de id "30" contém três reviews "Coxinha Boa", "Bom bem casado" e "Torta"
When é feita uma requisição GET para "/reviews/30"
Then O status da resposta deve ser OK (200)
And Deve ser retornado um JSON com os três reviews "Coxinha Boa", "Bom bem casado" e "Torta"

Cenário 5 - Visualização de um Review
Given O restaurante de ID "30" contém um review feito pelo usuário de ID "40" de título "Coxinha Boa"
When é feita uma requisição GET para "/reviews/30/40"
Then O status da resposta deve ser OK (200)
And Deve ser retornado um JSON com o review "Coxinha Boa"

Cenário 6 - Edição de Review
Given O restaurante de ID "30" contém um review feito pelo usuário de ID "40" e título "Coxinha Boa"
When é feita uma requisição PUT para "/reviews/30/40" alterando o título para "Coxinha Ruim"
Then O status da resposta deve ser OK (200)
And Deve ser retornado um JSON contendo o review "Coxinha Ruim"

Cenário 7 - Remoção de Review
Given O restaurante de ID "30" contém um review feito pelo usuário de ID "40" e título "Coxinha Boa"
When é feita uma requisição DELETE para "/reviews/30/40"
Then O status da resposta deve ser OK (200)
And Deve ser retornado um JSON vazio

Cenário 8 - Visualizar Reviews a partir de um user
Given O usuário de ID "40" contém dois reviews feitos "Coxinha Boa" e "Ótimo Sushi"
When É feita uma requisição GET para "/reviews/user/40"
Then O status da resposta deve ser OK (200)
And Deve retornar um JSON contendo os dois reviews "Coxinha Boa" e "Ótimo Sushi"

Cenário 9 - Criar review dado que uma nota já existe
Given O usuário de ID "40" deu a nota "4" para o restaurante de ID "30"
When É feita uma requisição POST para "/reviews/30/40" de título "Coxinha Boa" e nota "4.5"
Then O status da resposta deve ser OK (200)
And O JSON de retorno etornar o JSON do review "Coxinha Boa"
And Deve retornar o JSON com a nota atualizada "4.5"

Cenário 10 - Acessar Review Inexistente
Given Não há review feito pelo usuário de ID "40" no restaurante de ID "30"
When É feita uma requisição GET para "/reviews/30/40"
Then O status da resposta deve ser NOT FOUND (404)

Cenário 11 - Obter nota
Given O restaurante de ID "30" contém uma nota "5" dada pelo usuário de ID "40"
When é feita uma requisição GET para "/reviews/30/40"
Then O status da resposta deve ser OK (200)
And Deve ser retornado um JSON com a nota "5"