Feature: Restaurant registration

# API
Scenario: Cadastro bem sucedido de restaurante
        Given não existe nenhum restaurante com o CNPJ "71.381.185/0001-70" nem com o email "test@gmail.com" cadastrado no sistema
        When uma requisição POST é enviada para "/restaurants" com os valores "Quentinha refeições", "71.381.185/0001-70", email "test@gmail.com", senha "senha_adm_restaurante"
        Then é retornada uma mensagem com status "201"
        And a mensagem diz "Restaurant created" 

Scenario: Leitura de restaurantes do sistema
    Given existe um restaurante cadastrado no sistema com os dados id "1", nome "Quentinha refeições", cnpj "123321222", email "email_adm_restaurante" e senha "senha_adm_restaurante"
    And existe um restaurante cadastrado no sistema com os dados id "2", nome "Guloso Trincado", cnpj "40028922", email "email_adm_restaurante_2" e senha "senha_adm_restaurante_2"
    When uma requisição GET é enviada para "/restaurants"
    Then é retornada uma mensagem com status "200"
    And a mensagem contém "Quentinha refeições", "123321222", "email_adm_restaurante"
    And a mensagem contém "Guloso Trincado", "40028922", "email_adm_restaurante_2"

Scenario: Remoção bem sucedida de um restaurante
    Given existe um restaurante cadastrado no sistema com os dados id "1", nome "Quentinha refeições", cnpj "123321222", email "email_adm_restaurante" e senha "senha_adm_restaurante"
    When uma requisição DELETE é enviada para "/restaurants/1"
    Then é retornada uma mensagem com status "200"
    And a mensagem diz "Restaurant deleted"
    And o restaurante "Quentinha refeições" não está mais salvo no banco de dados


Scenario: Atualização bem sucedida de um restaurante
    Given existe um restaurante cadastrado no sistema com os dados id "1", nome "Quentinha refeições", cnpj "123321222", email "email_adm_restaurante" e senha "senha_adm_restaurante"
    When uma requisição PUT é enviada para "/restaurants/{id}" com o valor "Almir quentinhas" no campo "nome"
    Then é retornada uma mensagem com status "200"
    And a mensagem diz "Restaurant updated"
    And o restaurante com o nome "Almir quentinhas", CNPJ "123321222", email "email_adm_restaurante", senha "senha_adm_restaurante" está armazenado no sistema

Scenario: Cadastro mal sucedido de um restaurante (CNPJ já cadastrado)
        Given existe um restaurante cadastrado no sistema com os dados id "1", nome "Quentinha refeições", cnpj "71.381.185/0001-70", email "email_adm_restaurante" e senha "senha_adm_restaurante"
        When uma requisição POST é enviada para "/restaurants" com os valores "Guloso Trincado", "71.381.185/0001-70", email "test@gmail.com", senha "senha_adm_restaurante_2"
        Then é retornada uma mensagem com status "409"
        And a mensagem diz "Restaurant already registered"
        And o restaurante "Guloso Trincado" não está salvo no banco de dados

Scenario: Atualização bem sucedida de um restaurante (email)
        Given existe um restaurante cadastrado no sistema com os dados id "1", nome "Quentinha refeições", cnpj "123321222", email "test@gmail.com" e senha "senha_adm_restaurante"
        And não existe nenhum restaurante com o email "newrestaurant@gmail.com" cadastrado no sistema
        When uma requisição PUT é enviada para "/restaurants/{id}" com o valor "newrestaurant@gmail.com" no campo "email"
        Then é retornada uma mensagem com status "200"
        And a mensagem diz "Restaurant updated"
        And o restaurante com o nome "Quentinha refeições", CNPJ "123321222", email "newrestaurant@gmail.com", senha "senha_adm_restaurante" está armazenado no sistema

Scenario: Cadastro mal sucedido de um restaurante (email já cadastrado)
    Given existe um restaurante cadastrado no sistema com os dados id "1", nome "Quentinha refeições", cnpj "123321222", email "test@gmail.com" e senha "senha_adm_restaurante"
    When uma requisição POST é enviada para "/restaurants" com os valores "Guloso Trincado", "71.381.185/0001-70", email "test@gmail.com", senha "senha_adm_restaurante_2"
    Then é retornada uma mensagem com status "409"
    And a mensagem diz "Restaurant already registered"
    And o restaurante "Guloso Trincado" não está salvo no banco de dados
    And o restaurante "Quentinha refeições" está salvo no banco de dados

Scenario: Remoção mal sucedida de um restaurante (restaurante não encontrado)
    Given não existe nenhum restaurante com o id "1" cadastrado no sistema
    When uma requisição DELETE é enviada para "/restaurants/1"
    Then é retornada uma mensagem com status "404"
    And a mensagem diz "Restaurant not found"

Scenario: Atualização mal sucedida dos dados de um restaurante (CNPJ já cadastrado)
    Given existe um restaurante cadastrado no sistema com os dados id "1", nome "Quentinha refeições", cnpj "71.381.185/0001-70", email "email_adm_restaurante" e senha "senha_adm_restaurante"
    And existe um restaurante cadastrado no sistema com os dados id "2", nome "Guloso Trincado", cnpj "40028922", email "email_adm_restaurante_2" e senha "senha_adm_restaurante_2"
    When uma requisição PUT é enviada para "/restaurants/2" com o valor "71.381.185/0001-70" no campo "CNPJ"
    Then é retornada uma mensagem com status "409"
    And a mensagem diz "Restaurant already registered"
    And o restaurante "Quentinha refeições" está salvo no banco de dados com os dados id "1", nome "Quentinha refeições", cnpj "71.381.185/0001-70", email "email_adm_restaurante" e senha "senha_adm_restaurante"
    And o restaurante "Guloso Trincado" está salvo no banco de dados com os dados id "2", nome "Guloso Trincado", cnpj "40028922", email "email_adm_restaurante_2" e senha "senha_adm_restaurante_2"

Scenario: Atualização mal sucedida dos dados de um restaurante (email já cadastrado)
    Given existe um restaurante cadastrado no sistema com os dados id "1", nome "Quentinha refeições", cnpj "123321222", email "test@gmail.com" e senha "senha_adm_restaurante"
    And existe um restaurante cadastrado no sistema com os dados id "2", nome "Guloso Trincado", cnpj "40028922", email "email_adm_restaurante_2" e senha "senha_adm_restaurante_2"
    When uma requisição PUT é enviada para "/restaurants/2" com o valor "test@gmail.com" no campo "email"
    Then é retornada uma mensagem com status "409"
    And a mensagem diz "Restaurant already registered"
    And o restaurante "Quentinha refeições" está salvo no banco de dados com os dados id "1", nome "Quentinha refeições", cnpj "123321222", email "test@gmail.com" e senha "senha_adm_restaurante"
    And o restaurante "Guloso Trincado" está salvo no banco de dados com os dados id "1", nome "Guloso Trincado", cnpj "40028922", email "email_adm_restaurante_2" e senha "senha_adm_restaurante_2"
