Feature: Cadastro e manutenção de itens no menu

Scenario: Criar Item
    Given Eu não tenho nenhum item com nome "Blue Jeans"
    When Eu insiro um item com: nome "Blue Jeans", preço 100.00, categoria "Calça", descrição "Calça jeans azul", imagem "jeans.jpg", cores "Azul", tamanhos "P, M, G", quantidade 10
    Then Eu devo ter um item com nome "Blue Jeans"
    And Eu devo ter este item com id "1"
    
Scenario: Atualizar Item
    Given Eu tenho um item com id "1"
    When Eu atualizo o item com id "1" para: nome "Blue Jeans", preço 120.00, categoria "Calça", descrição "Calça jeans azul", imagem "jeans.jpg", cores "Azul", tamanhos "P, M, G", quantidade 10
    Then Eu devo ter um item id "1" 
    And Eu devo ter este item com preço 120.00

Scenario: Remover Item
    Given Eu tenho um item com id "1"
    When Eu removo o item com id "1"
    Then Eu não devo ter um item com id "1"

Scenario: Listar Itens
    Given Eu tenho um item com nome "Blue Jeans"
    When Eu listo os itens
    Then Eu devo ter uma lista com um item com nome "Blue Jeans"

Scenario: Tentar criar item com campos obrigatórios faltando
    Given Eu não tenho nenhum item com nome "Blue Jeans"
    When Eu insiro um item com: nome "Blue Jeans", categoria "Calça", descrição "Calça jeans azul", imagem "jeans.jpg", cores "Azul", tamanhos "P, M, G", quantidade 10
    Then Eu devo ter uma mensagem de erro "Missing required fields"
