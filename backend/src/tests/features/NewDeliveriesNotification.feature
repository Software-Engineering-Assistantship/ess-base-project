Feature: Notificação de novas entregas
  Como uma pessoa entregadora
  Eu quero ser notificada quando uma nova entrega for solicitada
  Para que eu possa aceitá-la ou rejeitá-la e notificar o usuário

Scenario: Notificação de Nova Entrega para Pessoa Entregadora
  Given uma entrega com id "1" que possui os campos: status "pendente"
  When o servidor recebe uma requisição POST na rota "/delivery-notifications/1" com campos: status "solicitada", deliveryPersonEmail "ricardo@root.com.br"
  Then a entrega com id "1" atualizará o campo de status para "solicitada"
  And a resposta deve retornar status "200"
  And a resposta deve conter os campos: deliveryPersonEmail "ricardo@root.com.br", category "new-delivery", title "Nova entrega 1 solicitada"

Scenario: Falha ao Notificar Nova Entrega
  Given uma entrega cadastrada com o id "1" e o campo status com valor "deslocamento"
  When uma requisição POST é feita para o endpoint "/delivery-notifications/1" com campos: status "solicitada", deliveryPersonEmail "ricardo@root.com.br"
  Then o sistema deve retornar uma resposta com status "400" e a mensagem de erro "Status inválido para notificação de nova entrega"

Scenario: Notificação de Entrega Realizada para Pessoa Entregadora
  Given uma entrega com id "1" que possui os campos: status "deslocamento"
  When o servidor recebe uma requisição PATCH na rota "/delivery-notifications/1" com campos: status "entregue", deliveryPersonEmail "ricardo@root.com.br"
  Then a entrega com id "1" atualizará o campo de status para "entregue"
  And a resposta deve conter os campos: deliveryPersonEmail "ricardo@root.com.br", category "delivery-status", title "Entrega 1 realizada com sucesso"

Scenario: Falha ao Atualizar Status de Entrega
  Given uma entrega cadastrada com o id "1" e o campo status com valor "entregue"
  When uma requisição PATCH é feita para o endpoint "/delivery-notifications/1" com o campo status "deslocamento", deliveryPersonEmail "ricardo@root.com.br"
  Then o sistema deve retornar uma resposta com status "400" e a mensagem de erro "Status inválido para notificação de entrega finalizada"
  And a entrega com id "1" não deve ter seu campo status atualizado para "deslocamento"