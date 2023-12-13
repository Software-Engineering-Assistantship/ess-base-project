Scenario: Edição de nome do perfil

    Given estou na tela de “Edição do perfil”
    When eu preencho o campo “Nome de usuário” com “Guilherme”
    And eu clico no botão “Confirmar”
    Then o pop-up “Alteração realizada com sucesso!” aparece
    And o meu nome estará alterado para “Guilherme”


Scenario: Edição de foto de perfil

    Given estou na tela de “Edição do perfil”
    When eu aperto o botão  “Trocar Ícone”
    And eu seleciono a foto “smiling.png” 
    Then o pop-up “Alteração realizada com sucesso!” aparece
    And a minha foto estará alterada para “smiling.png”


Scenario: Edição de bio de perfil

    Given estou na tela de “Edição do perfil”
    When eu preencho o campo  “Bio”
    And eu escrevo “new person. stopped judging” 
    Then o pop-up “Alteração realizada com sucesso!” aparece
    And o minha bio estará alterada para “new person. stopped judging”


Scenario: Edição de capa do perfil

    Given estou na tela de “Edição do perfil”
    When eu aperto o botão  “Trocar Capa”
    And eu seleciono a foto “ratatouille.png” 
    Then o pop-up “Alteração realizada com sucesso!” aparece
    And a minha capa estará alterada para “ratatouille.png”


Scenario: Edição de senha do perfil

    Given estou na tela de “Trocar senha” e minha senha é “!Abc1234”
    When eu preencho o campo “Senha atual” com “!Abc1234”
    And eu preencho o campo “Nova senha” com “qwertYy@123a”
    And eu preencho o campo “Confirmar nova senha” com “qwertYy123a” 
    Then o pop-up “Alteração realizada com sucesso!” aparece
    And a minha senha estará alterada para “qwerty123a”
    Scenario: Remoção de perfil


Given estou na tela “Menu de Edição” e minha senha é “qwerty123a”
    And aperto o botão “Avançado”
    And o pop-up “Alerta” aparece
    And aperto o botão “Confirmar”
    When eu preencho o campo “Digite sua senha” com “qwerty123a”
    And eu preencho o campo “Confirme sua senha” com “qwerty123a”
    And aperto o botão “Confirmar”
    Then o pop-up “Conta removida com sucesso!” aparece
    And minha conta estará removida
