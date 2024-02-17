    ## Cenários de GUI
    
    Scenario: cadastrar restaurante novo
        Given eu estou na página "cadastro de restaurante"
        And o restaurante "Marcelinho Salgados" não está cadastrada no site
        When eu defino o nome do restaurante como "Marcelinho Salgados"
        And eu defino o endereço como "Av. Jorn. Aníbal Fernandes, 150 - Cidade Universitária, Recife"
        And eu defino tipo de comida como "salgados"
        And eu salvo o cadastro
        Then eu estou na página "visualização de conteúdo"
        And eu vejo a mensagem "Marcelinho Salgados foi cadastrado com sucesso"
        And eu vejo "Marcelinho Salgados" como nome do restaurante
        And eu vejo "salgados" como tipo de comida
        And eu vejo "Av. Jorn. Aníbal Fernandes, 150 - Cidade Universitária, Recife" como endereço


    Scenario: editar restaurante cadastrado
        Given eu estou na página "visualização de restaurante"
        And eu vejo "Domino's" como nome do restaurante
        And eu vejo "confeitaria" como tipo de comida
        When eu seleciono edição
        And eu atualizo o tipo de comida para "pizza"
        And salvo a edição
        Then eu vejo a mensagem "Edição realizada com sucesso"
        And eu vejo "Domino's" como nome do restaurante
        And eu vejo "pizza" como tipo de comida

    Scenario: deletar restaurante cadastrado
        Given eu estou na página "visualização de restaurante"
        And eu vejo "Almir refeições" como nome do restaurante
        And eu vejo "Recife, Cidade Universitária" como nome do restaurante
        When eu deleto "Almir refeições"
        Then eu vejo a mensagem "Almir refeições foi deletado com sucesso"
        And eu estou na página "restaurantes"
        And não vejo "Almir refeições" com localização "Recife, Cidade Universitária"

    Scenario: cadastrar restaurante repetido
        Given eu estou na página "cadastro de restaurante"
        And o restaurante "Brazzetus" com endereço "R. Profa. Argemira Rêgo Barros, 144 - Várzea, Recife" já está cadastrada no site
        And eu defino o nome do restaurante como "Brazzetus"
        And eu defino o endereço como "R. Profa. Argemira Rêgo Barros, 144 - Várzea, Recife"
        When eu salvo o cadastro
        Then eu vejo a mensagem "Brazzetus (R. Profa. Argemira Rêgo Barros, 144 - Várzea, Recife) já foi cadastrado por outro usuário"

    Scenario: visualizar restaurante
        Given eu estou na página "restaurantes"
        And vejo o restaurante "Brazzetus" com endereço "R. Profa. Argemira Rêgo Barros, 144 - Várzea, Recife"
        When eu seleciono "Brazzetus" com endereço "R. Profa. Argemira Rêgo Barros, 144 - Várzea, Recife"
        Then eu estou na página "visualização de restaurante"
        And eu vejo "Brazzetus" como nome do restaurante
        And eu vejo "R. Profa. Argemira Rêgo Barros, 144 - Várzea, Recife" como endereço


    Scenario: cadastrar restaurante sem nome
        Given eu estou na página "cadastro de conteúdo"
        And o campo "nome" está vazio
        And eu defino o endereço como "R. Setúbal, 1324, Boa Viagem - Recife"
        When eu salvo o cadastro
        Then eu vejo a mensagem "Restaurante sem título não pode ser cadastrado"


    Scenario: cadastrar restaurante sem localização
        Given eu estou na página "cadastro de restaurante"
        And o campo "bairro" está vazio
        And eu preencho defino o nome do restaurante como "Tay San"
        And eu defino tipo de comida como "asiática"
        When eu salvo o cadastro
        Then eu vejo a mensagem "Restaurante sem endereço não pode ser cadastrado"

## Cenários de Serviço

    Scenario: Obter restaurante por ID
        Given existe um restaurante cadastrado com id "1234" e nome "Marcelinho Salgado"
        When uma requisição "GET" foi enviada para "/restaurants/1234"
        Then o status de resposta é "200"
        And a resposta contém id "1234" e nome "Marcelinho Salgado"

    Scenario: Editar restaurante por ID
        Given existe um restaurante cadastrado com id "5432" e nome "Best Pizza"
        When uma requisição "PUT" foi enviada para "/restaurants/edit/5432"
        And o body da requisição contém nome "Worst Pizza"
        Then o status de resposta é "200"
        And existe um restaurante cadastrado com id "5432" e nome "Worst Pizza"
        And não existe restaurante cadastrado com id "5432" e nome "Best Pizza"

    Scenario: cadastrar novo restaurante
        Given não existe um restaurante cadastrado com nome "Marcelinho Salgado" e endereço "Rua dos Reitores, 220 - Várzea, Recife"
        When uma requisição "POST" foi enviada para "/restaurants"
        And o body da requisição contém nome "Marcelinho Salgado", endereço "Rua dos Reitores, 220 - Várzea, Recife" e tipo de comida "Salgados"
        Then o status de resposta é "200"
        And um restaurante é cadastrado com nome "Marcelinho Salgado", endereço "Rua dos Reitores, 220 - Várzea, Recife" e tipo de comida "Salgados"

    Scenario: erro ao cadastrar restaurante existente
        Given existe um restaurante cadastrado com nome "Marcelinho Salgado" e endereço "Rua dos Reitores, 220 - Várzea, Recife"
        When uma requisição "POST" foi enviada para "/restaurants"
        And o body da requisição contém nome "Marcelinho Salgado", endereço "Rua dos Reitores, 220 - Várzea, Recife" e tipo de comida "Salgados"
        Then o status de resposta é "400"
        And a resposta é "Restaurante já cadastrado"
    
