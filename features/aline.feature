Feature: Realizar reserva
	As a usuário do sistema
	I want to realizar a reserva de um local disponível
	So that eu possa gerenciá-la na minha conta


Scenario: Começar a reserva com Sucesso
	Given eu estou na página “Hotel CIN”
	When eu preencho “Check In” com “07/01/2025”
	And eu preencho “Checkout” com “17/01/2025”
	And eu preencho “Hóspedes” com “2”
	And eu seleciono “Reservar”
	Then eu mudo para página “Detalhes da reserva”

Scenario: Falha em começar a reserva por 
	Given eu estou na página “Hotel CIN”
	When eu preencho “Check In” com “07/01/2025”
	And eu preencho “Checkout” com “17/01/2025”
	And eu seleciono “Reservar”
	Then uma mensagem de erro é exibida “Selecione todos os campos para continuar com a reserva”


Scenario: Editar detalhes da Reserva
	Given eu estou na página “Detalhes da Reserva”
	When eu seleciono “editar datas”
	And eu preencho “Datas” com “10/01/2025 - 17/01/2025”
	And eu seleciono “Modificar”
	Then uma mensagem de confirmação é exibida “Você alterou sua Reserva”
And  eu continuo na página de “Detalhes da Reserva”

Scenario: Erro ao seguir para Confirmação
	Given eu estou na página “Detalhes da Reserva”
	And eu não estou logado
	When eu seleciono “Seguir”
	Then uma mensagem de erro é exibida “Você precisa logar para continuar”
And  eu continuo na página de “Detalhes da Reserva”

Scenario: Logar para seguir para Confirmação
	Given eu estou na página “Detalhes da Reserva”
	And eu não estou logado
	When eu seleciono “Logar”
	Then eu mudo para a página “Login”





Scenario: Seguir para Confirmação
	Given eu estou na página “Detalhes da Reserva”
	And eu estou logado
	When eu seleciono “Seguir”
	Then eu mudo para página de “Confirmar Reserva”

Scenario: Confirmar Reserva
	Given eu estou na página “Confirmar Reserva”
	When eu seleciono “Confirmar”
	Then uma mensagem de sucesso é exibida “Reserva enviada para aprovação com proprietário”


Scenario: Não confirmar Reserva
	Given eu estou na página “Confirmar Reserva”
	When eu seleciono “Voltar e Alterar”
	Then eu mudo para a página “Detalhes da Reserva”
