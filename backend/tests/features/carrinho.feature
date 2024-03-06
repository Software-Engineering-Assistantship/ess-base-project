Feature: Carrinho de compras
    As a usuário do Ecommerce
    I want to guardar no carrinho os itens que desejo comprar
    So that posso compra-los em uma única operação

Scenario: Adicionar item ao carrinho
    Given Estou na página do item de id "12346" cujo item está presente no sistema com os campos
        | nome         | id    | quantidade | valor | Local de venda |
        | Piada Mortal | 12346 | 7          | 20,00 | São Paulo      |
    When eu o adiciono ao carrinho
    Then apenas o item adicionado estará presente na lista do carrinho

# Scenario: Adicionar item ao carrinho com outros itens
#     Given o item "Utopia" está presente no sistema com os campos
#         | nome   | id    | quantidade | valor | Local de venda | Cupom |
#         | Utopia | 12347 | 9          | 16,00 | Recife         | NA    |
#     And os seguintes itens estão no carrinho
#         | nome                | id    | valor | Local de venda | Cupom |
#         | Utilitarismo        | 13347 | 25,00 | Salvador       | 10%   |
#         | Riqueza das nações  | 39827 | 45,00 | Campina Grande | NA    |
#         | Diario de um banana | 10101 | 35,00 | São Paulo      | NA    |
#         | Dracula             | 64626 | 12,00 | São Paulo      | 5%    |
#     When eu o adiciono ao carrinho 
#     Then o sistema adiciona o item "Utopia" ao carrinho
#     And a lista do carrinho estará na seguinte configuração
#         | nome                | id    | valor | Local de venda | Cupom |
#         | Utilitarismo        | 13347 | 25,00 | Salvador       | 10%   |
#         | Riqueza das nações  | 39827 | 45,00 | Campina Grande | NA    |
#         | Diario de um banana | 10101 | 35,00 | São Paulo      | NA    |
#         | Dracula             | 64626 | 12,00 | São Paulo      | 5%    |
#         | Utopia              | 12347 | 16,00 | Recife         | NA    |
        

# Scenario: Adicionar item ao carrinho que não está presente no estoque
#     Given o item "Dicionario Aurelio" está presente no sistema com os campos
#         | nome               | id    | quantidade | valor | Local de venda |
#         | Dicionario Aurelio | 12946 | 0          | 10,00 | São Paulo      |
#     When eu tento o adicionar ao carrinho 
#     Then o sistema me retorna a mensagem "Item fora de estoque"
#     And o carrinho permanece inalterado

# # interface scenarios
# Scenario: Adicionar item ao carrinho
#     Given estou na página "de intem" do item "Livro 1984" que está presente no estoque 
#     When seleciono uma quantidade válida
#     And clico em "comprar"
#     Then estou na página "carrinho"
#     And "Livro 1984" está presente no carrinho de compras com os campos:
#         | nome       | id    | tempo de entrega | quantidade | valor | 
#         | Livro 1984 | 12345 | 0 meses e 6 dias | 1          | 35,00 |

# Scenario: Comprar item no carrinho
#     Given estou na página "carrinho" com o item "" listado
#     When clico em "finalizar compra"
#     Then vejo uma janela de confirmação de compra listando o ítem "Livro 1984"

# Scenario: Remover item do carrinho
#     Given estou na página "carrinho" com o item "Livro 1984" listado
#     When clico em "remover"
#     Then o item "Livro 1984" não está mais presente no carrinho
#     And o valor total do carrinho foi atualizado

# Scenario: Alterar quantidade de item no carrinho
#     Given estou na página "carrinho" com o item "Livro 1984" listado
#     When altero a quantidade para 2
#     Then a quantidade do item "Livro 1984" foi atualizada
#     And o valor total do carrinho foi atualizado

# Scenario: Consultar valor total do carrinho
#     Given estou na página "carrinho" com os seguintes itens listados
#         | nome       | id    | tempo de entrega | quantidade | valor | 
#         | Livro 1984 | 12345 | 0 meses e 6 dias | 1          | 35,00 |
#         | Livro 1984 | 12345 | 0 meses e 6 dias | 1          | 35,00 |
#     When consulto o valor total do carrinho
#     Then o valor total do carrinho é 70,00

# Scenario: Consultar tempo de entrega do carrinho
#     Given estou na página "carrinho" com os seguintes itens listados
#         | nome       | id    | tempo de entrega | quantidade | valor | 
#         | Livro 1984 | 12345 | 0 meses e 6 dias | 1          | 35,00 |
#         | Livro 1984 | 12345 | 0 meses e 6 dias | 1          | 35,00 |
#     When consulto o tempo de entrega do carrinho
#     Then o tempo de entrega do carrinho é 0 meses e 6 dias

    