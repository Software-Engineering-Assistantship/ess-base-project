Feature: Avaliacao de Entregas
    As a Usuario
    I want to ser capaz de atribuir notas e comentarios a empresas de entrega
    So that eu possa informar os demais usuarios e futuros compradores

Cenário: Avaliação de Entrega Bem sucedida
    Given eu "cliente" recentemente recebi uma compra de um "HyperX alloy fps pro" pela empresa "JAMEF"
    And eu estou na area de realizar avaliação da empresa de entregas "JAMEF" 
    When eu seleciono "5" estrelas
    And adciono um comentário "muito bom"
    And confirmo
    Then minha avaliação é publicada
    Then eu vejo minha avaliação na área de avaliações da "JAMEF"

Cenário: Avaliação de entrega mal sucedida sem estrela
    Given eu "cliente" recentemente recebi uma compra de um "HyperX alloy fps pro" pela empresa "JAMEF"
    And eu estou na area de realizar avaliação da empresa de entregas "JAMEF"
    And o campo das estrelas não esta preenchido
    When adciono um comentário "otimo"
    And eu confirmo
    Then vejo uma mensagem que nao foi possivel realizar a avaliação
    And volto para area de avaliacao da "JAMEF"

Cenário: Avaliação de Entrega Mal sucedida sem comentario
    Given eu "cliente" recentemente recebi uma compra de um "HyperX alloy fps pro" pela empresa "JAMEF"
    And eu estou na area de realizar avaliação da empresa de entregas "JAMEF"
    And o campo de comentario não esta preenchido
    When eu seleciono "3" estrelas
    And eu confirmo
    Then vejo uma mensagem que nao foi possivel realizar a avaliação
    And volto para area de avaliacao da "JAMEF"
