Feature: Busca de hoteis 
    As a usuário comum
    I want to buscar hoteis em um local
    So that possa locar um quarto

Scenario: Busca de hoteis com sucesso
    Given um usuario esta na página "Busca de Hoteis"
    When preenche os campos:
    | Local         | Data de Chegada | Data de Saida | Número de pessoas |
    | Cairo - Egito | 22/11/2025      | 26/12/2025    | 3 pessoas         |
    And seleciona a opção  "Pesquisar"
    Then uma mensagem de confirmação é exibida indicando que "Estamos buscando as melhores estadias para você!"

Scenario: Busca de hoteis sem destino
    Given um usuario esta na página "Busca de Hoteis"
    When preenche os campos:
    | Data de Chegada | Data de Saida | Número de pessoas |
    | 22/11/2025      | 26/12/2025    | 3 pessoas         |
    And seleciona a opção "Pesquisar"
    Then uma mensagem de erro é exibida indicando que "Você precisa colocar o seu destino para realizar a busca"

Scenario: Busca de hoteis com alto numero de pessoas
    Given um usuario esta na página "Busca de Hoteis"
    When preenche os campos:
    | Local         | Data de Chegada | Data de Saida | Número de pessoas |
    | Cairo - Egito | 22/11/2025      | 26/12/2025    | 15 pessoas        |
    And seleciona a opção "Pesquisar"
    Then uma mensagem de erro é exibida indicando que "Parece que não existem quartos para a quantidade de pessoas que você digitou. O que acha de realizar uma busca com menos pessoas e locar mais de um quarto? "

Feature: Filtrar hoteis
    As a usuário comum
    I want to filtrar os hoteis da minha busca
    So that possa ver hoteis mais apropriados 

Scenario: Filtrar hoteis por Wifi com sucesso
    Given um usuario esta na página "Hoteis Disponíveis"
    When seleciona o campo "Wifi"
    And seleciona a opção "Buscar"
    Then aparecem na tela apenas os hoteis com "Wifi"

Scenario: Filtrar hoteis por Wifi com erro
    Given um usuario esta na página "Hoteis Disponíveis"
    When seleciona o campo "Wifi"
    And seleciona a opção  "Buscar"
    Then uma mensagem de erro é exibida indicando que "Não existem hoteis com essa comodidade disponíveis"

