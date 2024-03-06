Feature: Disparo de e-mails para o usuário com o comprovante do pedido
    As a usuário do Ecommerce
    I want to visualizar o comprovante da minha compra
    So that posso visualizar informações do meu pedido

Scenario: E-mail enviado com sucesso
    Given Estou na caixa de entrada do e-mail
    And Visualizo que o e-mail com o comprovante está na caixa de entrada do e-mail
    When Abro o e-mail com o comprovante do pedido
    Then Consigo visualizar o comprovante com as informações do meu pedido

Scenario: E-mail foi para caixa de spam
    Given Estou na caixa de entrada do e-mail
    And Visualizo que o e-mail com o comprovante não está na caixa de entrada do e-mail
    When Abro aba de e-mails marcados como Spam
    Then Vou para a pasta de Spam
    And Visualizo que o e-mail está lá
    When Abro o e-mail com o comprovante do pedido
    Then Consigo visualizar o comprovante com as informações do meu pedido

Scenario: E-mail não foi enviado
    Given Estou na caixa de entrada do e-mail
    And Visualizo que o e-mail com o comprovante não está na caixa de entrada do e-mail
    When Abro aba de e-mails marcados como Spam
    Then Vou para a pasta de Spam
    And Visualizo que o e-mail com o comprovante do pedido não foi enviado

Scenario: E-mail foi enviado sem o comprovante 
    Given Estou na caixa de entrada do e-mail
    And Visualizo que o e-mail com o comprovante está na caixa de entrada
    When Abro o e-mail com o comprovante do pedido
    Then Percebo que o comprovante com as informações do pedido não está no e-mail