Feature: Realizar login
    As a usuário do sistema
    I want to realizar login
    So that eu possa ter acesso as minhas informações no sistema

    Scenario: Login bem-sucedido
        Given eu estou na página de “Login”
        And eu preencho o campo "Email" com "usuario@exemplo.com"
        And eu preencho o campo "Senha" com "senha123"
        When eu seleciono “Entrar”
        Then eu sou redirecionado para a página "Tela inicial”"

    Scenario: Falha no login por credenciais inválidas
        Given eu estou na página de “Login”
        And eu preencho o campo "Email" com "usuario@exemplo.com"
        And eu preencho o campo "Senha" com "senhaIncorreta"
        When eu seleciono “Entrar”
        Then uma mensagem de erro é exibida “Email ou senha inválidos”

    Scenario: Falha no login por campos obrigatórios não preenchidos
        Given eu estou na página de “Login”
        And eu deixo o campo "Email" vazio
        And eu preencho o campo "Senha" com "senha123"
        When eu seleciono “Entrar”
        Then uma mensagem de erro é exibida “O campo Email é obrigatório”

Feature: Realizar cadastro de usuário pessoa física
    As a usuário do sistema
    I want to realizar cadastro
    So that eu possa reservar acomodações

    Scenario: Cadastro de Pessoa Física com sucesso
        Given eu estou na página de “Cadastro”
        And eu preencho o campo "Nome" com "João Silva"
        And eu preencho o campo "CPF" com "123.456.789-00"
        And eu preencho o campo "Data de Nascimento" com "01/01/1990"
        And eu preencho o campo "Telefone" com "(11) 98765-4321"
        And eu preencho o campo "Email" com "pfusuario@exemplo.com"
        And eu preencho o campo "Senha" com "Senha@123"
        And eu confirmo o campo "Senha" com "Senha@123"
        When eu seleciono em “Cadastrar”
        Then uma mensagem de sucesso é exibida “Cadastro realizado com sucesso”

    Scenario: Falha ao cadastrar Pessoa Física com CPF inválido
        Given eu estou na página de “Cadastro”
        And eu preencho o campo "Nome" com "João Silva"
        And eu preencho o campo "CPF" com "123456789"
        And eu preencho o campo "Data de Nascimento" com "01/01/1990"
        And eu preencho o campo "Telefone" com "(11) 98765-4321"
        And eu preencho o campo "Email" com "pfusuario@exemplo.com"
        And eu preencho o campo "Senha" com "Senha@123"
        And eu confirmo o campo "Senha" com "Senha@123"
        When eu seleciono em “Cadastrar”
        Then uma mensagem de erro é exibida “CPF inválido”

    Scenario: Falha ao cadastrar senha que não atende os critérios
        Given eu estou na página de “Cadastro”
        And eu preencho o campo "Nome" com "João Silva"
        And eu preencho o campo "CPF" com "123.456.789-00"
        And eu preencho o campo "Data de Nascimento" com "01/01/1990"
        And eu preencho o campo "Telefone" com "(11) 98765-4321"
        And eu preencho o campo "Email" com "pfusuario@exemplo.com"
        And eu preencho o campo "Senha" com "12345678"
        And eu confirmo o campo "Senha" com "12345678"
        When eu seleciono em “Cadastrar”
        Then uma mensagem de erro é exibida “A senha deve ter no mínimo 8 caracteres, incluindo maiúsculas, minúsculas e caracteres especiais”

    Scenario: Falha ao cadastrar por campos obrigatórios não preenchidos
        Given eu estou na página de “Cadastro”
        And eu deixo o campo "Nome" vazio
        And eu preencho o campo "CPF" com "123.456.789-00"
        And eu preencho o campo "Data de Nascimento" com "01/01/1990"
        And eu preencho o campo "Telefone" com "(11) 98765-4321"
        And eu preencho o campo "Email" com "pfusuario@exemplo.com"
        And eu preencho o campo "Senha" com "Senha@123"
        And eu confirmo o campo "Senha" com "Senha@123"
        When eu seleciono em “Cadastrar”
        Then uma mensagem de erro é exibida “O campo Nome é obrigatório”


Feature: Realizar cadastro de usuário pessoa jurídica
    As a usuário do sistema
    I want to realizar cadastro
    So that eu possa  disponibilizar minha acomodação para reserva


    Scenario: Cadastro de Pessoa Jurídica com sucesso
        Given eu estou na página de “Cadastro Pessoa Jurídica”
        And eu preencho o campo "Nome" com "Empresa Exemplo LTDA"
        And eu preencho o campo "Email" com "contato@exemplo.com"
        And eu preencho o campo "Estrelas" com "5"
        And eu preencho o campo "CNPJ" com "12.345.678/0001-90"
        And eu preencho o campo "Telefone" com "(11) 91234-5678"
        And eu preencho o campo "CEP" com "01000-000"
        And eu preencho o campo "Logradouro" com "Rua Exemplo"
        And eu preencho o campo "Número" com "123"
        And eu preencho o campo "UF" com "SP"
        And eu preencho o campo "Cidade" com "São Paulo"
        And eu preencho o campo "Bairro" com "Centro"
        And eu preencho o campo "Complemento" com "Sala 101"
        And eu envio a "Foto de perfil"
        And eu preencho o campo "Senha" com "Senha@123"
        And eu preencho o campo "Confirmar senha" com "Senha@123"
        When eu seleciono em “Cadastrar”
        Then uma mensagem de sucesso é exibida “Cadastro realizado com sucesso”


    Scenario: Falha no cadastro de Pessoa Jurídica por CNPJ inválido
        Given eu estou na página de “Cadastro Pessoa Jurídica”
        And eu preencho o campo "Nome" com "Empresa Exemplo LTDA"
        And eu preencho o campo "CNPJ" com "123456"
        And eu preencho os demais campos obrigatórios corretamente
        When eu seleciono em “Cadastrar”
        Then uma mensagem de erro é exibida “CNPJ inválido”


    Scenario: Falha no cadastro por senha não atender os critérios
        Given eu estou na página de “Cadastro Pessoa Jurídica”
        And eu preencho todos os campos obrigatórios corretamente
        And eu preencho o campo "Senha" com "12345678"
        And eu preencho o campo "Confirmar senha" com "12345678"
        When eu seleciono em “Cadastrar”
        Then uma mensagem de erro é exibida “A senha deve ter no mínimo 8 caracteres, incluindo maiúsculas, minúsculas e caracteres especiais”
