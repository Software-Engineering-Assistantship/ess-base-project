Scenario: Review feita com sucesso
Given User esta preenchido com "Henrique Melo", Company esta prenchido com "30suplementos", Star esta prenchido com "1", Comment esta prenchido com "horrivel"
When Uma solicitação "POST" é feita para "/submit_review/", contendo "Henrique Melo","30suplementos","1","horrivel"
Then O servidor retorna uma mensagem contendo "Avaliação submetida com sucesso"
And Informa o código de status como sendo "200"

Scenario: Review feita com estrela inválida
Given User esta preenchido com "Henrique Melo", Company esta prenchido com "30suplementos", Star esta prenchido com "0", Comment esta prenchido com "horrivel"
When Uma solicitação "POST" é feita para "/submit_review/", contendo "Henrique Melo","30suplementos","0","horrivel"
Then O servidor retorna uma mensagem contendo "Avaliações devem ser entre 1 e 5 estrelas"
And Informa o código de status como sendo "400"

Scenario: Review feita com comentario inválido
Given User esta preenchido com "Henrique Melo", Company esta prenchido com "30suplementos", Star esta prenchido com "5", Comment esta prenchido com ""
When Uma solicitação "POST" é feita para "/submit_review/", contendo "Henrique Melo","30suplementos","5",""
Then O servidor retorna uma mensagem contendo "Comentários vazios não são permitidos"
And Informa o código de status como sendo "400"

Scenario: Get reviews
Given Existem "0" reviews que foram feitas anteriormente sobre a empresa "Jamef"
When Uma solicitação "GET" é feita para "/get_reviews/Jamef/"
Then O servidor retorna uma lista contendo "0" reviews
And Informa o código de status como sendo "200"
