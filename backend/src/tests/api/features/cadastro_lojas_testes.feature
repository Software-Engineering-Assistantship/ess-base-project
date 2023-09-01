-------------------------------------CENARIOS DE SERVIÇO

Scenario: Cadastrar uma nova loja

Given a loja com email "ianbraga@gmail.com" ainda não foi cadastrada
When uma solicitação POST é feita para "/lojas" com email "ianbraga@gmail.com", senha "1234", nome "ianbragainfo", localicazao "rua do matue" e cnpj "21. 123. 456/0001-55"
Then o código de status da resposta é "201"


Scenario: Tentar cadastrar uma loja ja cadastrada

Given a loja com email "ianbraga@gmail.com", senha "a1234", nome "ianbragainfo", localicazao "rua do matue" e cnpj "21. 123. 456/0001-55" ja foi cadastrada
When uma solicitação POST é feita para "/lojas" com email "ianbraga@gmail.com", senha "a1234", nome "ianbragainfo", localicazao "rua do matue" e cnpj "21. 123. 456/0001-55"
Then o codigo de status é "400"
And o JSON de resposta é "Loja já registrada"