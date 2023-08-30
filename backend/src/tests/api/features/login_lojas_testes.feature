-----------------------------------------CENARIOS DE SERVIÇO

Scenario: Login bem sucedido de um usuário

Given um usuário com e-mail "lefvs@gmail.com", senha "batata123", nome "ianbragatec", endereco "rua do matue" e cpnj "21. 123. 456/0001-55" está cadastrado no sistema
When o usuário envia uma requisição POST para "/loginlojas" com e-mail "lefvs@gmail.com" e senha "batata123"
Then o status da resposta deve ser "200"
And O JSON da reposta deve retornar o usuario com email "lefvs@gmail.com"

Scenario: Falha no login por senha incorreta 

Given um usuário com e-mail "lefvs@gmail.com", senha "batata123", nome "ianbragatec", endereco "rua do matue" e cpnj "21. 123. 456/0001-55" está cadastrado no sistema
When o usuário envia uma requisição POST para "/loginlojas" com e-mail "joao@gmail.com" e senha "picles123"
Then o status da resposta deve ser "400"
And o JSON da resposta deve conter "Email ou senha estão incorretos"

Scenario: Falha no login por email não cadastrado 

Given um usuário com e-mail "lefvs@gmail.com", senha "batata123", nome "ianbragatec", endereco "rua do matue" e cpnj "21. 123. 456/0001-55" não está cadastrado no sistema
When o usuário envia uma requisição POST para "/loginlojas" com e-mail "joao@gmail.com" e senha "batata123"
Then o status da resposta deve ser "400"
And o JSON da resposta deve conter "Email ou senha estão incorretos"

