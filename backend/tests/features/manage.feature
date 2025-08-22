Feature: Gerenciar Reservas 
As a usuário “Hoteleiro”
I want to gerenciar as reservas do meu hotel
So that posso visualizar, editar ou cancelar as reservas existentes

Scenario: Visualizar detalhes de uma reserva
  Given que estou logado como usuário “Hoteleiro” com login “thaisnevest” e senha “12345678”
  And estou na página de “Gerenciamento de Reservas”
  When eu seleciono a reserva “Bangalõ”
  Then devo ver campo “Cliente” preenchido com o nome “Thaís Neves”
  And vejo o campo “Tipo de Quarto” preenchido com “Grupo”
  And vejo o campo “Camas” preenchido com “8”
  And vejo o campo “Cama de casal” preenchido com “1”
  And vejo o campo “Cama de solteiro” preenchido com “3”
  And vejo o campo “Beliche” preenchido com “2”
  And vejo o campo “Acomoda” com “10”
  And vejo o campo “Espaço” com “60m²”
  And vejo o campo “Wi-Fi grátis” selecionado
  And vejo o campo “Estacionamento grátis” selecionado
  And vejo o campo “Valor” com “R$978/diária”
  And vejo o campo “Status” com “confirmada”

Scenario: Editar uma reserva existente
  Given que estou logado como usuário “Hoteleiro” com login “thaisnevest” e senha “12345678”
  And estou na página de “Gerenciamento de Reservas”
  And a reserva “Quarto Standard” está cadastrada
  And a reserva “Quarto Standard” possui o campo “Tipo de Quarto” com o   valor “Casal”
  And a reserva “Quarto Standard” possui o campo “Acomoda” com o valor “2”
  When eu seleciono a reserva “Quarto Standard”
  And clico para “Editar”
  And altero o campo “Tipo de Quarto” para “Suíte Tripla”
  And altero o campo “Acomoda” para “3”
  And clico para “Salvar”
  Then devo ver a seguinte mensagem “A reserva foi atualizada”
  And  sou redirecionado para a página “Reservas Publicadas”
  And as alterações devem ser salvas com sucesso
  And consigo ver as edições aplicadas


Scenario: Cancelar uma reserva existente
  Given que estou logado como usuário “Hoteleiro” com login “thaisnevest” e senha “12345678”
  And estou na página de “Gerenciamento de Reservas”
  When eu seleciono a reserva “Bangalô”
  And clico para “Cancelar Reserva”
  And confirmo o cancelamento
  Then devo ver a seguinte mensagem “A reserva foi cancelada”
  And  sou redirecionado para a página “Reservas Publicadas”
  And a reservada deve ser cancelada com sucesso 
  And consigo ver as edições aplicadas