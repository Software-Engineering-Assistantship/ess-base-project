Feature: Recuperação de senha
    As a usuário do Ecommerce
    I want to recuperar minha senha perdida
    So that Posso recupera-la

    Background: 
        Given os seguintes usuários existem no sistema: 
        | login            | email             |
        | Breno_Miranda    | bafm@cin.ufpe.br  |
        | Rafael_Campos    | rcmg@cin.ufpe.br  |
        | Gabriela_Almeida | gasly@cin.ufpe.br |

    ## cenários de GUI
    Scenario: recuperação de senha bem sucedida
    Given estou na página "login"
    When preencho em "login" com o dado "<nome_de_usuario>"
    And pressiono "Esqueci senha"
    Then eu consigo ver uma mensagem contendo a minha senha
    And eu permaneço na página "login"

    Scenario: login não encontrado
    Given estou na pagina "login"
    When preencho em "login" com o dado "Freddie_Mercury"
    And pressiono "Esqueci senha"
    Then eu consigo ver a mensagem "login especificado incorreto ou não existe"
    And eu permaneço na página "login"