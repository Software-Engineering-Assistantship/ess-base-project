Feature: Teste do Serviço de Envio de E-mails com Comprovante de Pedido

# Service
Scenario: Envio de e-mail com comprovante de pedido
    Given um e-mail foi enviado com sucesso
    When verifico se o e-mail foi entregue com sucesso com o id "123"
    Then o resultado deve ser true

Scenario: E-mail enviado para a caixa de spam
    Given um e-mail foi enviado para a caixa de spam com o id "123"
    When verifico se o e-mail foi enviado para a caixa de spam com o id "123"
    Then o resultado deve ser true

Scenario: E-mail não foi entregue
    Given um e-mail não foi entregue
    When lidar com casos em que o e-mail não foi entregue
    Then nenhuma exceção deve ser lançada

Scenario: Comprovante não está no e-mail enviado
    Given um e-mail foi enviado sem o comprovante
    When lidar com casos em que o comprovante não está no e-mail enviado
    Then nenhuma exceção deve ser lançada
