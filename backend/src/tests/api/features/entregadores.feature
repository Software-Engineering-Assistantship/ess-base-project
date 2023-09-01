Scenario: Cadastrar um novo entregador

Given um entregador com email "aspinhas@gmail.com" ainda não foi cadastrado
When uma solicitação POST é feita para "/entregadores" com email "aspinhas@gmail.com", nome "aspinhas", cpf "143. 283. 984-03", telefone "97412-2374", veiculo "fiat uno" e placa "MVP-3271"
Then o código de status da resposta é "201"
And o JSON da resposta deve conter "Entregador criado com sucesso"


Scenario: Tentar cadastrar um entregador ja cadastrado

Given um entregador com email "demon1@gmail.com", nome "demon1", cpf "413. 534. 768-89", telefone "93245-6453", veiculo "Ford Ka" e placa "BOM-1342" já está cadastrado
When uma solicitação POST é feita para "/entregadores" com email "demon1@gmail.com", nome "demon1", cpf "413. 534. 768-89", telefone "93245-6453", veiculo "Ford Ka" e placa "BOM-1342"
Then o código de status da resposta é "400"
And o JSON da resposta deve conter "Erro no cadastro do email demon1@gmail.com"


Scenario: Deletar um cadastro de um entregador

Given um entregador com email "less@gmail.com", nome "less", cpf "876. 132. 534-16", telefone "93245-7654", veiculo "Kia Cerato" e placa "GOD-6532" já está cadastrado
When uma solicitação DELETE é feita para "/entregadores/'less@gmail.com'" com email "less@gmail.com", nome "less", cpf "876. 132. 534-16", telefone "93245-7654", veiculo "Kia Cerato" e placa "GOD-6532"
Then o código de status da resposta é "200"
And o JSON da resposta deve conter "Entregador removido"




