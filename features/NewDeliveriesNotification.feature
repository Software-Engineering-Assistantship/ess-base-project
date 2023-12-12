Feature: Notificação de novas entregas
    Como uma empresa de entregas
    Eu quero ser notificada quando uma nova entrega for solicitada
    Para que eu possa aceitá-la ou rejeitá-la e notificar o usuário

Scenario: Notificação de Entrega Realizada para Empresa de Logística
	Given uma entrega com id "del_4527" que possui os campos: acceptedByCompany "true", status "Em deslocamento", id da empresa "log_7563"
	When o servidor recebe uma requisição PATCH na rota "/delivery/del_4527" com campos: status "Realizada"
	Then a entrega com id "del_4527" atualizará o campo de status para "Realizada"
	And uma notificação será enviada para a empresa "log_7563" com campos: category "delivery-status", title "Entrega del_4527 realizada com sucesso por Ricardo"

Scenario: Falha ao Atualizar Status de Entrega
    Given uma entrega cadastrada com o id "del_1234" e o campo status com valor "Realizada"
    When uma requisição PATCH é feita para o endpoint "/delivery/del_1234" com o campo status "Rejeitada"
    Then o sistema deve retornar uma resposta com status 400 e a mensagem de erro "Não é possível atualizar o status da entrega 'del_1234' para 'Rejeitada' pois já está com status 'Realizada'"
    And a entrega com id "del_1234" não deve ter seu campo status atualizado para "Rejeitada" 