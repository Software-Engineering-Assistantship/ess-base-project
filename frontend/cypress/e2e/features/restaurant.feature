Feature: Restaurant

## Cenários de GUI
    
    Scenario: cadastrar restaurante novo GUI
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

