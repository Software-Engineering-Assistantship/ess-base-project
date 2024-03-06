Feature: Recuperação de senha
    As a usuário do Ecommerce
    I want to recuperar minha senha perdida
    So that Posso acessar minha conta

    Background: 
        Given os seguintes usuários existem no sistema: 
        | login            | senha    |
        | Breno_Miranda    | tufk90T! |
        | Rafael_Campos    | jfsalg1  |
        | Gabriela_Almeida | senha123 |
        And os seguintes administradores existem no sistema:
        | email                | cpf         | login           | senha      |
        | ju_marques@gmail.com | 11122233344 | Julia_marques   | farofa789  |
        | fcastor@hotmail.com  | 44433322211 | Fernando_castor | flamengogo |

    ## cenários de GUI
    Scenario: recuperação de senha bem sucedida
    Given estou na página "login"
    When preencho em "login" com o dado "<nome_de_usuario>"
    And pressiono "Esqueci senha"
    Then eu consigo ver uma mensagem contendo a minha "<senha>"
    And eu permaneço na página "login"

    Examples:
    | nome_de_usuario  | senha    |
    | Breno_Miranda    | 12345678 |
    | Rafael_Campos    | jfsalg1  |
    | Gabriela_Almeida | senha123 |

    Scenario: login não encontrado
    Given estou na pagina "login"
    When preencho em "login" com o dado "Freddie_Mercury"
    And pressiono "Esqueci senha"
    Then eu consigo ver a mensagem "login especificado incorreto ou não existe"
    And eu permaneço na página "login"

    Scenario: recuperação de senha de admin bem sucedida 
    Given estou na pagina "login"
    When preencho em "<campo>" com o dado "<valor>"
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

    #cenários de serviço
    Scenario: recuperação de senha bem sucedida
    Given o login "<login>" está armazenado no sistema com senha "<senha>"
    When eu peço ao sistema pela senha do login "<login>" com um método GET
    Then o sistema retorna o status code "200"
    And o sistema retorna a mensagem "login encontrado"
    And o sistema retorna o valor de senha "<senha>"

    Examples:
    | login            | senha     |
    | Breno_Miranda    | 12345678  |
    | Rafael_Campos    | jfsalg1   |
    | Gabriela_Almeida | senha123  |
    | Julia_marques    | farofa789 |

    Scenario: login não encontrado
    Given o login "<login>" não está armazenado no sistema
    When eu peço ao sistema pela senha do login "<login>" com um método GET
    Then o sistema retorna o status code "400"
    And o sistema retorna a mensagem "bad request: login não encontrado"

    Examples:
    | login          |
    | wesley1        |
    | ben10          |
    | guilherme888   |
    | juliaFarias    |