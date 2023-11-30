Atualização, deleção, listagem e criação de itens do cardápio de um restaurante.

CENÁRIOS

Cenário: Atualização de um item do cardápio
Given Estou na tela de editar um item com nome “Hamburguer 02”
When Modifico a informação de nome para “Hamburguer 03” 
And Seleciono para salvar as alterações
Then Sou redirecionado de volta para a tela de listagem de itens
And Vejo o item atualizado com o nome “Hamburguer 03” com uma mensagem de confirmação

Cenário: Deleção de um item do cardápio
Given Estou na tela de gerenciamento do item com nome “Hamburguer 02”
When Seleciono a opção de deletar o item
And Recebo um modal de confirmação da deleção do item
And Aperto na opção de confirmar a deleção
Then sou redirecionado para a tela de listagem de itens
And Não vejo mais o item com o nome “Hamburguer 02” na listagem e obtenho uma uma mensagem de confirmação da deleção
And Adding specified step (Passo apenas para o roteiro)
