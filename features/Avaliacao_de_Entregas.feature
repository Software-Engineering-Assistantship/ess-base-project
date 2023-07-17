Feature: Avaliacao de Entregas
    As a Usuario
    I want to ser capaz de atribuir notas e comentarios a entregas realizadas
    So that eu possa informar os demais usuarios e futuros compradores

Cenário: Avaliação de Entrega Bem sucedida
    Given eu “cliente” recentemente recebi uma compra de um “HyperX alloy fps pro”
    And eu estou na area de realizar avaliação do "HyperX alloy fps pro"
    When eu selecionp "5" estrelas
    And adciono um comentário "muito bom"
    And confirmo
    Them minha avaliação é publicada
    Them eu vejo minha avaliação na área de avaliações do "HyperX alloy fps pro"

Cenário: Avaliação de Entrega Mal sucedida
    Given eu “cliente” recentemente recebi uma compra de um “HyperX alloy fps pro”
    And eu estou na area de realizar avaliação do "HyperX alloy fps pro"
    And os campos necessários não estão preenchidos
    When eu confirmo
    Them vejo uma mensagem que nao foi possivel realizar a avaliação
    And volto para area de avaliacao do "HyperX alloy fps pro"
