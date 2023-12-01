Feature: Cadastro e manutenção do cardápio
  As a usuário
  I want realizar operações com os itens do cardápio
  so that eu possa fazer a manutenção deles

Scenario: Criação de um item do cardápio
Given Estou na tela de gerenciamento de cardápio
When Seleciono a opção de adicionar um novo item
And Insiro os dados do novo item do cardápio
And Salvo as informações
Then Sou redirecionado de volta para a tela de listagem de itens
Then Vejo o novo item do cardápio na lista com todas as suas informações
Then final adjustments

Scenario: Leitura de todos os itens do cardápio de um restaurante
Given Estou na home do aplicativo
When Eu clico no restaurante desejado
When Visualizo a lista atual de itens do cardápio
Then Vejo a lista com informações resumidas de cada item, incluindo nome e outras informações relevantes
Then final adjustments

Scenario: Atualização de um item do cardápio
Given Estou na tela de editar um item com nome “Hambúrguer 02”
When Modifico a informação de nome para “Hambúrguer 03” 
And Seleciono para salvar as alterações
Then Sou redirecionado de volta para a tela de listagem de itens
And Vejo o item atualizado com o nome “Hambúrguer 03” com uma mensagem de confirmação
