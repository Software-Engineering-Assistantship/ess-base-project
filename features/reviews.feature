Cenário 1 - Adicionar Review (completo)
Given Eu estou logado com o usuário “Pedro Monte”
And Eu estou na aba do restaurante “Casa dos Doces”
And Eu vejo a informação “11 reviews” com nota média de 4 estrelas
When Eu aperto em “Fazer review”
And Surge uma janela de preenchimento de review
And Eu preencho o título “O melhor bem casado da cidade!”
And Eu preencho o texto do review
And Eu dou a nota “5” para o restaurante “Casa dos Doces”
And Eu clico em “Enviar”
Then Aparece uma mensagem “Concluído”
And Volto para a página do restaurante
And Eu vejo a informação “12 reviews” com nota média de 4.1 estrelas
And Eu clico em “Reviews de Usuários”
And Eu vejo o review “O melhor bem casado da cidade!”

Cenário 2 - Adicionar Nota
Given Eu estou logado com o usuário “Pedro”
And Eu estou na aba do restaurante “Burger King”
And Eu vejo a informação “11 reviews” com nota média de 4 estrelas
And Eu vejo a região “Faça uma avaliação” com 5 estrelas cinzas
When Eu aperto em 4 estrelas
Then As 4 estrelas ficam amarelas
And O número de avaliações sobe para “11 reviews”
And A nota mantém em 4 estrelas

Cenário 3 - Visualização dos Reviews de um Restaurante
Given Eu estou logado com o usuário “Pedro”
And Eu estou na aba do restaurante “Casa dos DOces”
When Eu aperto em “Reviews de Usuários”
Then Abre uma aba com reviews de usuários
 
Cenário 4 - Visualização de um Review de um usuário
Given Eu estou logado com o usuário “Maria Letícia”
And Eu estou na aba de “Reviews de Usuários” do restaurante “Casa dos Doces”
And Eu vejo o review “Coxinha fria” escrito por “Maria Letícia”
And Eu clico em “Ver Mais”
Then Surge uma página com mais informações do review
And Eu vejo fotos do review
And Eu vejo a nota 5 estrelas dadas para “Sabor”

Cenário 5 - Visualização de um Review criado pelo mesmo usuário que visualiza
Given Eu estou logado com o usuário “Maria Letícia”
And Eu estou na aba de “Reviews de Usuários” do restaurante “Casa dos Doces”
And Eu vejo o review “Coxinha fria” escrito por “Maria Letícia”
And Eu clico em “Ver Mais”
Then Surge uma página com mais informações do review
And Eu vejo a opção “Editar Review”

Cenário 6 - Edição de Review (completo)
Given Eu estou logado com o usuário “Maria Letícia”
And Eu estou na página do review “Coxinha Fria” escrita por “Maria Letícia” do restaurante “Casa dos Doces”
When Eu clico na opção “Editar Review”
And Surge uma aba de editar review
And Eu mudo o título do review para “Coxinha Boa”
And Eu mudo a nota para 4 estrelas
And Eu clico em “Salvar”
Then Surge uma mensagem pop-up escrito “Concluído”
And Eu volto para a página do review e vejo as mudanças
Cenário 7 - Remoção de Review
Given Eu estou logado com o usuário “Maria Letícia”
And Eu estou na página do review “Coxinha Fria” escrita por “Maria Letícia” do restaurante “Casa dos Doces”
When Eu clico na opção “Editar Review”
And Eu clico no botão “Excluir”
Then Surge uma mensagem pop-up “Review excluído com sucesso”
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
And Eu vejo o review “Coxinha fria” escrito por “Pedro Monte”
And Eu vejo que o review tem 5 likes e 0 deslikes
When Eu clico no botão de like
Then O botão de like fica preto
And O número de likes sobe para 6

Cenário 10 - Visualizar Reviews de um Usuário pelo Perfil
Given Eu estou logado com o usuário “Guilherme Maranhão”
And Eu vejo que tenho 13 Reviews feitos
When Eu clico em “13 Reviews”
Then Eu vou para uma página contendo todos os reviews feitos pelo usuário “Guilherme Maranhão”
