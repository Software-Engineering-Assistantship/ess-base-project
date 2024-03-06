Feature: Histórico de Pagamentos
    As a usuário do Ecommerce
    I want to vizualiazar o histórico de pagamentos concluídos que realizei no Sistema
    So that posso acessar meu histórico de pagamentos e ver os da ultima mes, trimestre ou ano

    Scenario: Visualizar o Histórico de Pagamentos
        Given que o usuário de login "pedrocorreia" está na pagina "Home"
        And o usuário de login "pedrocorreia" tem os pagamentos de número '201', '202', '203','204', '205', '206' e '207'
        When o usuário de login "pedrocorreia" navega até a página de "Histórico de Pagamentos"
        Then o usuário de login "pedrocorreia" visualiza os pagemntos de número '201', '202', '203','204', '205', '206' e '207' na página de "Histórico de Pagamentos"

    Scenario: Falha na Visualização o Histórico de Pagamentos
        Given que o usuário de login "pedrocorreia" está na pagina "Home"
        And o usuário de login "pedrocorreia" não possui nenhum pagamento
        When o usuário de login "pedrocorreia" navega até a página de "Histórico de Pagamentos"
        And não aparece nenhum dado na página de "Histórico de Pagamentos"
        Then o usuário de login "pedrocorreia" visualiza uma mensagem "Nenhum Cadastro de Pagamentos ainda!"

    Scenario: Filtra o Histórico de Pagamentos para Último mês
        Given que o usuário de login "pedrocorreia" está na pagina "Histórico de Pagamentos" e data atual é "29/06/2023"
        And o usuário de login "pedrocorreia" tem os pagamentos
        de número '201' feito na data "20/05/2023", '202' feito na data "20/03/2023",
        '203' feito na data "20/04/2023" ,'204' feito na data "20/06/2023", '205' feito na data "20/06/2023",
        '206' feito na data "20/06/2023" e '207' feito na data "20/01/2023"
        When o usuário de login "pedrocorreia" "filtra por data" os pagamentos para o intervalo do "ultimo mes"
        Then o usuário de login "pedrocorreia" visualiza os pagamentos com numeros "204", "205" e "206"

    Scenario: Filtra o Histórico de Pagamentos para Último Trimestre
        Given que o usuário de login "pedrocorreia" está na pagina "Histórico de Pagamentos" e data atual é "29/06/2023"
        And o usuário de login "pedrocorreia" tem os pagamentos
        de número '201' feito na data "20/05/2023", '202' feito na data "20/03/2023",
        '203' feito na data "20/04/2023" ,'204' feito na data "20/06/2023", '205' feito na data "20/06/2023",
        '206' feito na data "20/06/2023" e '207' feito na data "20/01/2023"
        When o usuário de login "pedrocorreia" "filtra por data" os pagamentos para o intervalo do "ultimo trimestre"
        Then o usuário de login "pedrocorreia" visualiza os pagamentos com numeros "201", "203", "204", "205" e "206"

    Scenario: Filtra o Histórico de Pagamentos para Último Ano
        Given que o usuário de login "pedrocorreia" está na pagina "Histórico de Pagamentos" e data atual é "29/06/2023"
        And o usuário de login "pedrocorreia" tem os pagamentos
        de número '201' feito na data "20/05/2023", '202' feito na data "20/03/2023",
        '203' feito na data "20/04/2023" ,'204' feito na data "20/06/2023", '205' feito na data "20/06/2023",
        '206' feito na data "20/06/2023" e '207' feito na data "20/01/2023"
        When o usuário de login "pedrocorreia" "filtra por data" os pagamentos para o intervalo do "ultimo ano"
        Then o usuário de login "pedrocorreia" visualiza os pagamentos com numeros "201", "202", "203", "204", "205", "206" e "207"


    Scenario: Falha ao Filtrar de Pagamentos no Último mês
        Given que o usuário de login "pedrocorreia" está na pagina "Histórico de Pagamentos" e data atual é "29/06/2023"
        And o usuário de login "pedrocorreia" tem os pagamentos
        de número '201' feito na data "20/05/2023", '202' feito na data "20/03/2023",
        '203' feito na data "20/04/2023"  e '207' feito na data "20/01/2023"
        When o usuário de login "pedrocorreia" "filtra por data" os pagamentos para o intervalo do "ultimo mes"
        And não aparece nenhum dado na página de "Histórico de Pagamentos"
        Then o usuário de login "pedrocorreia" visualiza uma mensagem "Nenhum Cadastro de Pagamentos nesse intervalo de tempo!"

    Scenario: Falha ao Filtrar de Pagamentos no Último Trimestre
        Given que o usuário de login "pedrocorreia" está na pagina "Histórico de Pagamentos" e data atual é "29/06/2023"
        And o usuário de login "pedrocorreia" tem os pagamentos
        de número  '202' feito na data "20/03/2023" e '207' feito na data "20/01/2023"
        When o usuário de login "pedrocorreia" "filtra por data" os pagamentos para o intervalo do "ultimo trimestre"
        And não aparece nenhum dado na página de "Histórico de Pagamentos"
        Then o usuário de login "pedrocorreia" visualiza uma mensagem "Nenhum Cadastro de Pagamentos nesse intervalo de tempo!"

    Scenario: Falha ao Filtrar de Pagamentos no Último ano
        Given que o usuário de login "pedrocorreia" está na pagina "Histórico de Pagamentos" e data atual é "29/06/2023"
        And o usuário de login "pedrocorreia" tem o pagamento de número '208' feito na data "20/01/2022"
        When o usuário de login "pedrocorreia" "filtra por data" os pagamentos para o intervalo do "ultimo ano"
        And não aparece nenhum dado na página de "Histórico de Pagamentos"
        Then o usuário de login "pedrocorreia" visualiza uma mensagem "Nenhum Cadastro de Pagamentos nesse intervalo de tempo!"








