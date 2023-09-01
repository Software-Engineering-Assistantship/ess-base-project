Scenario: Cadastrar uma nova entrega

Given uma entrega com id "111" ainda não foi cadastrada
When uma solicitação POST é feita para "/entregas" com id "111", nomeProduto "revolver 2", quantidade "3", marca "hyperx", tipoDoProduto "headset", enderecoDeEntrega "rua augusta", preco "63.89", status "aprovado" e emailEntregador "demon1@gmail.com"
Then o código de status da resposta é "201"
And o JSON da resposta deve conter "Entrega criada com sucesso"
