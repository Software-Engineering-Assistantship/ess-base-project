Feature: Salvar, gostar e compartilhar reservas
As a usuário “Cliente”
I want to salvar e compartilhar as reservas que eu gostar
So that eu posso salvar opções de reservas e ver depois e também mandar para contatos por meio das redes sociais

Scenario: Compartilhar uma reserva sem login
Given eu estou na página de “Hotel em Natal”
And eu não estou logado
When eu seleciono “Compartilhar” a reserva “Hotel em Natal”
Then eu  recebo uma mensagem de erro por falta de login
And sou redirecionado para a página do “Login”

Scenario: Compartilhar uma reserva estando logado
Given eu estou na página de “Hotel em Gramado”
And eu estou logado na página com com email “acfml@cin.ufpe.br”  e senha “8765”
When eu seleciono “Compartilhar” a reserva “Hotel em Gramado”
And eu seleciono opção “WhatsApp”
Then eu vejo a reserva compartilhada com a mensagem “Oportunidade imperdível : “Hotel em Gramado”  com o link da reserva

Scenario: Salvar reserva
Given eu estou na página de “Hotel em Porto de Galinhas”
And eu estou logado com email “acfml@cin.ufpe.br”  e senha “54321”
When eu salvo uma a reserva “Hotel  em Porto de Galinhas”
And eu vou para a página do “Perfil”
And eu seleciono “Reservas salvas”
Then eu vejo “Hotel em Porto de Galinhas” na página de “Reservas salvas”

Scenario: Excluir reserva salva
Given eu estou na página de “Reservas Salvas”
And a reserva “Hotel Maragogi” está salva
When eu seleciono “Remover “ abaixo de “Hotel  Maragogi”
And eu Seleciono “Confirmar”
Then eu estou na página de “Reservas Salvas”
And eu não consigo ver a reserva “Hotel  Maragogi”

