Scenario: Edição de nome do perfil

    Given estou na tela de “Edição do perfil” e logado como "gmsmr@cin.ufpe.br"
    When eu preencho o campo “Nome de usuário” com “Guilherme”
    And eu salvo minha alteração
    Then uma mensagem de confirmação aparece
    And o meu nome estará alterado para “Guilherme”


Scenario: Edição de foto de perfil

    Given estou na tela de “Edição do perfil” e logado como "gmsmr@cin.ufpe.br"
    When eu aperto o botão  “Trocar Ícone”
    And eu seleciono a foto “smiling.png” 
    And eu salvo minha alteração
    Then uma mensagem de confirmação aparece
    And a minha foto estará alterada para “smiling.png”


Scenario: Edição de bio de perfil

    Given estou na tela de “Edição do perfil” e logado como "gmsmr@cin.ufpe.br"
    When eu preencho o campo  “Bio" com “new person. stopped judging”
    And eu salvo minha alteração
    Then uma mensagem de confirmação aparece
    And o minha bio estará alterada para “new person. stopped judging”


Scenario: Edição de capa do perfil

    Given estou na tela de “Edição do perfil” e logado como "gmsmr@cin.ufpe.br"
    When eu aperto o botão  “Trocar Capa”
    And eu seleciono a foto “ratatouille.png” 
    And eu salvo minha alteração
    Then uma mensagem de confirmação aparece
    And a minha capa estará alterada para “ratatouille.png”


Scenario: Edição de senha do perfil

    Given estou na tela de “Trocar senha” logado como “gmsmr@cin.ufpe.br“ e minha senha é “!Abc1234”
    When eu preencho o campo “Senha atual” com “!Abc1234”
    And eu preencho o campo “Nova senha” com “qwertYy@123a”
    And eu preencho o campo “Confirmar nova senha” com “qwertYy123a” 
    And salvo minha mudança
    Then uma mensagem de confirmação aparece
    And a minha senha estará alterada para “qwerty123a”


Scenario: Remoção de perfil

    Given estou na tela “Menu de Edição” e logado como "gmsmr@cin.ufpe.br" e minha senha é “qwerty123a”
    And aperto o botão “Avançado”
    And uma mensagem de alerta aparece
    And confirmo o alerta
    When eu preencho o campo “Digite sua senha” com “qwerty123a”
    And eu preencho o campo “Confirme sua senha” com “qwerty123a”
    And eu salvo minha alteração
    Then uma mensagem de confirmação aparece
    And minha conta estará removida


Scenario: Edição de senha inválida do perfil

    Given estou na tela de “Trocar senha” e logado como "gmsmr@cin.ufpe.br" e minha senha é “qwertYy@123a”
    When eu preencho o campo “Senha atual” com “qwertYy@123a”
    And eu preencho o campo “Nova senha” com “123456789”
    And eu preencho o campo “Confirmar nova senha” com “123456789” 
    Then uma mensagem de falha aparece
    And sou redirecionado para tela "Trocar senha"


Scenario: Remoção de perfil com falha

    Given estou na tela "Avançado" logado como "gmsmr@cin.ufpe.br" e minha senha é “qwertYy@123a”
    And uma mensagem de alerta aparece
    And confirmo o alerta
    When eu preencho o campo "Digite sua senha" com "qwertYy@123a"
    And eu preencho o campo "Confirme sua senha" com "qwertYy@123"
    And confirmo minha decisão
    Then uma mensagem de falha aparece
    And sou redirecionado para tela "Avançado"
