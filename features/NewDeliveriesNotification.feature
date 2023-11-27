Feature: Notificação de novas entregas
    As a delivery company
    I want to be notified when a new delivery is requested
    So that I can accept or reject it and notify the customer

Scenario: Notificação em Tempo Real de Nova Entrega Atribuída
    Given não há entrega cadastrada com o id "del_1234"
    When uma nova requisição POST é feita para o endpoint "/deliveries" com o body: id "del_1234", title "Livro", name "João", address "Avenida Agamenon Magalhães, 12, Recife-PE", deadline "2021-10-10T10:00:00.000Z", deliveryCompany "log_7563"
    Then a empresa de entregas "log_7563" deve receber uma notificação com os parâmetros: category "new-deliver", title "Nova requisição de Livro", message "João solicitou uma nova entrega", address "Avenida Agamenon Magalhães, 12, Recife-PE", deadline "2021-10-10T10:00:00.000Z"

Scenario: Notificação de Entrega Realizada para Empresa de Logística
	Given a tabela de banco de dados de entregas
	And a entrega com id "del_4527" possui os campos: status "Em deslocamento", id da empresa "log_7563"
	When o servidor recebe uma requisição PATCH na rota "/entrega/del_4527" com campos: status "Realizada", deliverymanName "Ricardo"
	Then a entrega com id "del_4527" atualizará o campo de status para "Realizada" e adicionará o campo deliverymanName com valor "Ricardo"
	And uma notificação será enviada para a empresa "log_7563" com campos: category "delivery-status", title "Entrega del_4527 realizada com sucesso por Ricardo"