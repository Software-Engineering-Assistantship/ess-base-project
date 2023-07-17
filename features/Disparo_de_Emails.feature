Feature: Disparo de Emails de Confirmacao
    As Usuario
    I want to receber emails de Confirmacao de compras
    So that eu saiba que minha compra foi realizda com sucesso e receber as informacoes sobre minha compra

Scenario: confirmacao no email
    Given eu “cliente” estou na página de ”finalizar pagamento”
    And todos os campos estão devidamente preenchidos
    When eu confirmo o pagamento
    Them Eu vejo uma confirmação que meu pagamento foi bem sucedido
    And o sistema envia um email para o meu email
