Feature: Cadastro de restaurante
    As a administrador de um restaurante
    I want to inserir o meu restaurante no sistema
    So that eu possa acompanhar os pedidos dos clientes

Scenario: Cadastro bem sucedido de restaurante
Given não existe nenhum restaurante com o CNPJ “123321222” nem com o email “quentinhas@gmail.com” cadastrado no sistema
When uma requisição “POST” é enviada para “/restaurants” com os valores “Quentinha refeições”,  “123321222”, email “adm_restaurante”, senha “adm_restaurante”
Then é retornada uma mensagem com status “201”
And retorna uma mensagem “o restaurante Quentinha refeições está salvo no banco de dados”
And mensagem “restaurante cadastrado com sucesso” 


Scenario: Remoção bem sucedida de um restaurante
Given existe um restaurante cadastrado no sistema com os dados “Quentinha refeições” “123321222”, email “adm_restaurante” e senha “adm_restaurante”
When uma requisição “DELETE” é enviada para “/restaurants/{id}”
Then o restaurante “Quentinha refeições” não está mais salvo no banco de dados
And é retornada uma mensagem com o status “200” e mensagem “restaurante excluído com sucesso”


Scenario: Cadastro mal sucedido de um restaurante (CNPJ já cadastrado)
Given existe um restaurante cadastrado no sistema com os dados “Quentinha refeições” “123321222”, email “adm_restaurante” e senha “adm_restaurante”
When uma requisição “POST” é enviada para “/restaurants” com os valores “Guloso Trincado”,  “123321222”, email “adm_restaurante_2”, senha “adm_restaurante_2”
Then é retornada uma mensagem com status "409"
And retorna uma mensagem "CPF já cadastrado"
And o restaurante "Guloso Trincado" não está salvo no banco de dados


Scenario: Cadastro mal sucedido de um restaurante (email já cadastrado)
Given existe um restaurante cadastrado no sistema com os dados “Quentinha refeições” “123321222”, email “adm_restaurante” e senha “adm_restaurante”
When uma requisição “POST” é enviada para “/restaurants” com os valores “Guloso Trincado”,  “40028922”, email “adm_restaurante”, senha “adm_restaurante_2”
Then é retornada uma mensagem com status "409"
And retorna uma mensagem "email já cadastrado"
And o restaurante "Guloso Trincado" não está salvo no banco de dados
