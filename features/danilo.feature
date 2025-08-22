Feature: Fazer avaliação   
    As a Usuário comum 
    I want to Publicar uma avaliação
    So that posso mostrar a qualidade do hotel para outros
 
Scenario:  Avaliação mal sucedida
    Given Que estou na página “publicar avaliação” 
    And posso ver os formulários de selecionar o número de estrelas para serem dadas e de escrever uma avaliação escrita
    And posso ver a opção de enviar a avaliação
    When não preencho uma quantidade de estrelas
    And envio os formulários
    Then uma mensagem de erro é exibida indicando que "mensagem!"
 
Scenario:  Avaliação bem sucedida
    Given estou na página “publicar avaliação” 
    And posso ver os formulários de selecionar o número de estrelas para serem dadas e de escrever uma avaliação escrita
    And posso ver a opção de enviar a avaliação
    When preencho uma quantidade de estrelas
    And envio os formulários
    Then uma mensagem de confirmação é exibida indicando que "mensagem!"
