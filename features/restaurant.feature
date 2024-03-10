Atualização, deleção, listagem e criação de um restaurante

Feature: Gerenciamento de Restaurante
As a Gerente do restaurante
I want Conseguir gerenciar as informações do meu restaurante.

Cenário: Criação de um restaurante
Given Estou na tela de criação de restaurante
When Insiro as informações de nome "Carlos Burguer", endereço "Rua 123", hora de fechamento "1970-01-01T00:00:00.000Z"
e tipo "Hamburgueria"
And Clico para salvar as informações inseridas
Then Sou redirecionado para a tela de visualização de restaurante
And Vejo as informações já inseridas do restaurante

Cenário: Atualização de um restaurante
Given Estou na tela de edição de um restaurante com nome “Carlos Burguer”
When Modifico a informação de nome para “Carlos Burguer Updated” 
And Seleciono para salvar as alterações
Then Sou redirecionado de volta para a tela de visualização de restaurante
And E vejo o restaurante com o nome "Carlos Burguer Updated" e uma mensagem de confirmação

Cenário: Deleção de um restaurante
Given Estou na tela de edição de um restaurante
When Seleciono a opção de deletar um restaurante
And E recebo um modal de confirmação de deleção do restaurante
And E seleciono a opção de confirmar a deleção
Then Sou redirecionado para a tela de criação de um restaurante com uma mensagem de confirmação

Cenário: Listagem de todos os restaurantes
Given Estou na home do aplicativo
When Clico na opção "ver todos"
Then Visualizo a lista atual de restaurantes com informações de nome e tipo

Cenário: Atualização de um item do cardápio mal sucedida
Given O usuário "Marcos" está na tela de editar um item com nome “Hamburguer 02”
And O item com nome "Hamburguer 02" foi deletado
When O usuário modifica a informação de nome para “Hamburguer 03” 
And Seleciona para salvar as alterações
Then Ele é redirecionado de volta para a tela de listagem de itens
And E recebe uma mensagem de erro informando que o item "Hamburguer 02" não existe


Cenários de Serviço

Scenario: Criação de um restaurante bem sucedida
Given O sistema está sendo executado normalmente
When uma requisição "POST" for enviada a partir da rota /restaurants/ com as informações nome “Carlos Burguer”, endereço “Rua 123”, tipo “Hamburgueria”, e horário de fechamento "1970-01-01T00:00:00.000Z"
Then O status da resposta dever ser "201"
And o JSON de resposta deve conter nome “Carlos Burguer”, endereço “Rua 123”, tipo “Hamburgueria”, e horário de fechamento "1970-01-01T00:00:00.000Z"

Scenario: Criação de um restaurante com nome já existente
Given O sistema tem a informação de um restaurante guardada com nome “Carlos Burguer”, endereço “Rua 123”, tipo “Hamburgueria”, ID “2” e horário de fechamento "1970-01-01T00:00:00.000Z"
When uma requisição "POST" for enviada a partir da rota /restaurants/ com as informações nome “Carlos Burguer”, endereço “Rua 123”, tipo “Hamburgueria”, e horário de fechamento "1970-01-01T00:00:00.000Z"
Then O status da resposta dever ser "400"
And uma mensagem com "Restaurant name already taken" deve vir no JSON da resposta

Scenario: Atualização de um restaurante bem sucedida
Given O sistema tem a informação de um restaurante guardada com nome “Carlos Burguer”, endereço “Rua 123”, tipo “Hamburgueria”, ID “2” e horário de fechamento "1970-01-01T00:00:00.000Z"
When Uma requisição "PATCH" for enviada a partir da rota "/restaurants/2" com a informação de nome “Jonas Burguer”
Then O status da resposta deve ser "200"
And o JSON de resposta deve conter nome “Jonas Burguer”, endereço “Rua 123”, tipo “Hamburgueria”, ID “2” e horário de fechamento "1970-01-01T00:00:00.000Z"

Scenario: Atualização de um restaurante com nome já existente
Given O sistema tem a informação de um restaurante guardada com nome “Carlos Burguer”, endereço “Rua 123”, tipo “Hamburgueria”, ID “2” e horário de fechamento "1970-01-01T00:00:00.000Z"
When Uma requisição PATCH for enviada a partir da rota /restaurants/2 com a informação de nome “Carlos Burguer”
Then o status da resposta deve ser "400"
And uma mensagem com "Restaurant name already taken" deve vir no JSON da resposta

Scenario: Atualização de um restaurante com ID não existente
Given O sistema não tem a informação de um restaurante com ID "3" guardada
When Uma requisição PATCH for enviada a partir da rota "/restaurants/3" com a informação de nome “Carlos Burguer”
Then o status da resposta deve ser "404"
And uma mensagem com "Restaurant not found" deve vir no JSON da resposta

Scenario: Obter um restaurante por ID
Given O sistema tem a informação de um restaurante guardada com nome “Carlos Burguer”, endereço “Rua 123”, tipo “Hamburgueria”, ID “2” e horário de fechamento "1970-01-01T00:00:00.000Z"
When uma requisição "GET" é enviada para "/restaurants/2"
Then o status da resposta deve ser "200"
And o JSON da resposta deve conter nome “Carlos Burguer”, endereço “Rua 123”, tipo “Hamburgueria”, ID “2” e horário de fechamento "1970-01-01T00:00:00.000Z"

Scenario: Obter todos os restaurantes
Given O sistema tem a informação de um restaurante guardada com nome “Carlos Burguer”, endereço “Rua 123”, tipo “Hamburgueria”, ID “2” e horário de fechamento "1970-01-01T00:00:00.000Z"
And a informação de outro restaurante guardada com nome "Jose Burguer", endereço "Rua 124", tipo "Hamburgueria", ID "1" e horário de fechamento "12:00:00"
When uma requisição "GET" é enviada para "/restaurants/"
Then o status da resposta deve ser "200"
And o JSON da resposta deve ser uma lista de restaurantes
And O Restaurante com nome “Carlos Burguer”, endereço “Rua 123”, tipo “Hamburgueria”, ID “2” e horário de fechamento "1970-01-01T00:00:00.000Z" deve estar na lista
And O restaurante com nome "Jose Burguer", endereço "Rua 124", tipo "Hamburgueria", ID "1" e horário de fechamento "1970-01-01T00:00:00.000Z" deve estar na lista

Scenario: Deleção de um restaurante
Given O sistema tem a informação de um restaurante guardada com nome nome “Carlos Burguer”, endereço “Rua 123”, tipo “Hamburgueria”, ID “2” e horário de fechamento "1970-01-01T00:00:00.000Z"
When Uma requisição de DELETE para a rota /restaurants/2
Then O item com ID “2” é deletado do sistema
And uma resposta com status 200 é retornada



