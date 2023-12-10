Feature: Recuperação de senha
    As a usuário do Ecommerce
    I want to recuperar minha senha perdida
    So that Posso recupera-la

    ## cenários de GUI
    Scenario: recuperação de senha bem sucedida
    Given estou na página "login"
    When preencho em "login" com o dado "<nome_de_usuario>"
    And pressiono "Esqueci senha"
    Then eu consigo ver uma mensagem contendo a minha senha