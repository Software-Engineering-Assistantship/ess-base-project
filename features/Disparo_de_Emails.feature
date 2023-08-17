Feature: Disparo de Emails de Confirmacao
    As Usuario
    I want to receber emails de Confirmacao de compras
    So that eu saiba que minha compra foi realizda com sucesso e receber as informacoes sobre minha compra

Scenario: confirmacao no email
    Given estou logado como "cliente" com email "pca@cin.ufpe.br" com nome de usario "NoobMaster69"
    When eu realizo uma compra de um "HyperX alloy fps pro" no "PIX" com sucesso
    Then o sistema envia um email para "pca@cin.ufpe.br" contendo "HyperX alloy fps pro", "NoobMaster69" e "PIX"
