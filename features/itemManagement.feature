Atualização, deleção, listagem e criação de itens do cardápio de um restaurante

Feature: Gerenciamento de itens de cardápio
As a Gerente do restaurante
I want Conseguir fazer as mudanças necessárias nos itens do meu cardápio.

Cenário: Atualização de um item do cardápio bem sucedida
Given O usuário "Marcos" está na tela de editar um item com nome “Hamburguer 02”
When O usuário modifica a informação de nome para “Hamburguer 03” 
And Seleciona para salvar as alterações
Then Ele é redirecionado de volta para a tela de listagem de itens
And E vê o item atualizado com o nome “Hamburguer 03” e uma mensagem de confirmação

Cenário: Deleção de um item do cardápio bem sucedida
Given O usuário "Marcos" está na tela de gerenciamento do item com nome “Hamburguer 03”
When Ele seleciona a opção de deletar o item
And E recebe um modal de confirmação da deleção do item
And E seleciona a opção de confirmar a deleção
Then Ele é redirecionado para a tela de listagem de itens
And E não vê mais o item com o nome “Hamburguer 02” na listagem, obtendo uma mensagem de confirmação da deleção

Cenário: Criação de um item do cardápio
Given Estou na tela de gerenciamento de cardápio
When Seleciono a opção de adicionar um novo item
And Insiro um item com nome “Hamburguer 03”, categoria “Hamburguer” e valor “30” no cardápio
And Clico para salvar as informações inseridas
Then  Sou redirecionado de volta para a tela de listagem de itens
And Vejo o novo item do cardápio na lista com todas as suas informações

Cenário: Leitura de todos os itens do cardápio de um restaurante
Given Estou na home do aplicativo
When Clico no restaurante “Hamburgueria Tchobers”
Then Visualizo a lista atual de itens do cardápio
And Vejo a lista com informações resumidas de cada item, como preço, descrição e nome
And Ajuste no cenário



