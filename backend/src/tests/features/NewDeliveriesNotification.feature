Feature: Notificação de novas entregas
  Como uma pessoa entregadora
  Eu quero ser notificada quando uma nova entrega for solicitada
  Para que eu possa aceitá-la ou rejeitá-la e notificar o usuário

Scenario: Notificação de Nova Entrega para Pessoa Entregadora
  Given uma entrega com id "1" que possui os campos: status "Pendente"
  When o servidor recebe uma requisição POST na rota "/delivery-notifications/1" com campos: status "Solicitada", deliveryPersonEmail "ricardo@root.com.br"
  Then a entrega com id "1" atualizará o campo de status para "Solicitada"
  And a resposta deve retornar status "200"
  And a resposta deve conter os campos: deliveryPersonEmail "ricardo@root.com.br", category "new-delivery", title "Nova entrega 1 solicitada"

Scenario: Falha ao Notificar Nova Entrega
  Given uma entrega cadastrada com o id "1" e o campo status com valor "Em deslocamento"
  When uma requisição POST é feita para o endpoint "/delivery-notifications/1" com campos: status "Solicitada", deliveryPersonEmail "ricardo@root.com.br"
  Then o sistema deve retornar uma resposta com status "400" e a mensagem de erro "Não é possível notificar a entrega '1' para Ricardo pois já está com status 'Em deslocamento'"

Scenario: Notificação de Entrega Realizada para Pessoa Entregadora
  Given uma entrega com id "del_4527" que possui os campos: status "Em deslocamento"
  When o servidor recebe uma requisição PATCH na rota "/delivery-notifications/del_4527" com campos: status "Realizada", deliveryPersonEmail "ricardo@root.com.br"
  Then a entrega com id "del_4527" atualizará o campo de status para "Realizada"
  And a resposta deve conter os campos: deliveryPersonEmail "ricardo@root.com.br", category "delivery-status", title "Entrega del_4527 realizada com sucesso"

Scenario: Falha ao Atualizar Status de Entrega
  Given uma entrega cadastrada com o id "1" e o campo status com valor "Realizada"
  When uma requisição PATCH é feita para o endpoint "/delivery-notifications/1" com o campo status "Rejeitada", deliveryPersonEmail "ricardo@root.com.br"
  Then o sistema deve retornar uma resposta com status 400 e a mensagem de erro "Não é possível atualizar o status da entrega '1' para 'Rejeitada' pois já está com status 'Realizada'"
  And a entrega com id "1" não deve ter seu campo status atualizado para "Rejeitada"