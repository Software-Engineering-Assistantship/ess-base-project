Feature: Cadastro de restaurante
    As a administrador de um restaurante
    I want to inserir o meu restaurante no sistema
    So that eu possa acompanhar os pedidos dos clientes

Scenario: Cadastro bem sucedido de restaurante
Given não existe nenhum restaurante com o CNPJ “123321222” nem com o email “quentinhas@gmail.com” cadastrado no sistema
When uma requisição “POST” é enviada para “/restaurants” com os valores “Quentinha refeições”,  “123321222”, email “email_adm_restaurante”, senha “senha_adm_restaurante”
Then é retornada uma mensagem com status “201”
And retorna uma mensagem “o restaurante Quentinha refeições está salvo no banco de dados”
And mensagem “restaurante cadastrado com sucesso” 


Scenario: Remoção bem sucedida de um restaurante
Given existe um restaurante cadastrado no sistema com os dados “Quentinha refeições” “123321222”, email “email_adm_restaurante” e senha “senha_adm_restaurante”
When uma requisição “DELETE” é enviada para “/restaurants/{id}”
Then o restaurante “Quentinha refeições” não está mais salvo no banco de dados
And é retornada uma mensagem com o status “200” e mensagem “restaurante excluído com sucesso”


Scenario: Cadastro mal sucedido de um restaurante (CNPJ já cadastrado)
Given existe um restaurante cadastrado no sistema com os dados “Quentinha refeições” “123321222”, email “email_adm_restaurante” e senha “senha_adm_restaurante”
When uma requisição “POST” é enviada para “/restaurants” com os valores “Guloso Trincado”,  “123321222”, email “email_adm_restaurante_2”, senha “senha_adm_restaurante_2”
Then é retornada uma mensagem com status "409"
And retorna uma mensagem "Erro! CPF já cadastrado"
And o restaurante "Guloso Trincado" não está salvo no banco de dados


Scenario: Cadastro mal sucedido de um restaurante (email já cadastrado)
Given existe um restaurante cadastrado no sistema com os dados “Quentinha refeições” “123321222”, email “email_adm_restaurante” e senha “senha_adm_restaurante”
When uma requisição “POST” é enviada para “/restaurants” com os valores “Guloso Trincado”,  “40028922”, email “senha_adm_restaurante”, senha “senha_adm_restaurante_2”
Then é retornada uma mensagem com status "409"
And retorna uma mensagem "Erro! email já cadastrado"
And o restaurante "Guloso Trincado" não está salvo no banco de dados
And o restaurante "Quentinha refeições" está salvo no banco de dados


Scenario: Atualização bem sucedida de um restaurante
Given existe um restaurante cadastrado no sistema com os dados “Quentinha refeições” “123321222”, email “email_adm_restaurante” e senha “senha_adm_restaurante”
When uma requisição "PUT" é enviada para "/restaurants/{id}" com o valor "Almir quentinhas" no campo "nome"
Then é retornada uma mensagem com status "200"
And retorna uma mensagem "Dados do restaurante atualizado com sucesso"
And o restaurante com o nome "Almir quentinhas",  CNPJ “123321222”, email “email_adm_restaurante”, senha “senha_adm_restaurante” está armazenado no sistema


Scenario: Cadastro bem sucedido de restaurante (GUI)
Given estou na página de “Cadastrar restaurante”
And não existe nenhum restaurante com o CNPJ “123321222” nem com o email “email_adm_restaurante” cadastrado no sistema
When o campo de “nome” é preenchido com “Quentinha refeições”
And o campo de “CNPJ” é preenchido com “123321222”
And o campo de “email” é preenchido com “email_adm_restaurante”
And o campo de senha é preenchido com “12345678”
And seleciono a opção “Cadastrar”
Then consigo ver uma mensagem dizendo “Cadastro bem sucedido! Você será redirecionado para a página de login”
And sou encaminhado para a página “login”


Scenario: Remoção bem sucedida de um restaurante (GUI)
Given existe um restaurante cadastrado no sistema com os dados “Quentinha refeições” “123321222” “email_adm_restaurante” e “senha_adm_restaurante”
And estou na página de “Meu perfil”
When eu tento excluir o restaurante
Then o restaurante é excluído do sistema
And sou encaminhado para a página “login”