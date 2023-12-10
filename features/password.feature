Feature: Recuperação de senha
    As a usuário do Ecommerce
    I want to recuperar minha senha perdida
    So that Posso recupera-la

    Background: 
        Given os seguintes usuários existem no sistema: 
        | login            |
        | Breno_Miranda    |
        | Rafael_Campos    |
        | Gabriela_Almeida |
        And os seguintes administradores existem no sistema:
        | email                | cpf         | login           |
        | ju_marques@gmail.com | 11122233344 | Julia_marques   |
        | fcastor@hotmail.com  | 44433322211 | Fernando_castor |

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

    Scenario: recuperação de senha de admin bem sucedida 
    Given estou na pagina "login"
    When preencho em "<campo>" com o dado "<dado>"
    And pressiono "Esqueci senha"
    Then eu consigo ver uma mensagem contendo a minha senha
    And eu permaneço na página "login"

    Examples:
    | campo | valor            |
    | login | Breno_Miranda    |
    | login | Rafael_Campos    |
    | login | Gabriela_Almeida |
    | login | Julia_marques    |
    | email | fcastor@hotmail.com |
    | cpf   | 11122233344      |

    Scenario: dado de admin não encontrado
    Given estou na pagina "login"
    When preencho em "login" com o dado "Bruno_Ferreira"
    And pressiono "Esqueci senha"
    Then eu consigo ver a mensagem "email/cpf/login especificado incorreto ou não existe"
    And eu permaneço na página "login"