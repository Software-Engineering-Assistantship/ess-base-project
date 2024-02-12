Feature: Tests

# API
Scenario: Leitura de restaurantes do sistema
    Given existe um restaurante cadastrado no sistema com os dados "Quentinha refeições" "123321222", email "email_adm_restaurante" e senha "senha_adm_restaurante"
    And existe um restaurante cadastrado no sistema com os dados "Guloso Trincado" "40028922", email "email_adm_restaurante_2" e senha "senha_adm_restaurante_2"
    When uma requisição GET é enviada para "/restaurants"
    Then é retornada uma mensagem com o status "200"
    And a mensagem contém "Quentinha refeições", "123321222", "email_adm_restaurante"
    And a mensagem contém "Guloso Trincado", "40028922", "email_adm_restaurante_2"