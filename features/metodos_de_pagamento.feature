Feature: Cadastro e manuntenção de usuários
    As a usuário
    I want to conseguir cadastrar, atualizar e remover meus métodos de pagamento no sistema
    So that eu possa confirmar o pagamento dos produtos

Scenario: Cadastro de cartão de crédito com sucesso
Given o usuário está logado com email "jorge123@gmail.com"
And está na tela "Página de pagamento"
When ele seleciona "Novo cartão de crédito"
And digita o número do cartão "9999 9999 9999 9999", nome do titular "Jorge Silva" e CVV "111" corretamente
And clica em "Cadastrar"
Then ele visualiza a mensagem "Cartão cadastrado com sucesso"
And ele pode efetuar suas compras

Scenario: Cadastro de cartão de crédito inválido
Given o usuário está logado com email "jorge123@gmail.com"
And está na tela "Página de pagamento"
When ele seleciona "Novo cartão de crédito"
And digita o número do cartão "9999 9999 9999 9999", nome do titular "Jorge Silva" e CVV "111" incorretamente
And clica em "Cadastrar"
Then ele visualiza a mensagem "Cartão inválido. Verifique as informações."

Scenario: Cadastro de cartão de crédito repetido
Given o usuário está logado com email "jorge123@gmail.com"
And está na tela "Página de pagamento"
When ele seleciona "Novo cartão de crédito"
And digita o número do cartão "9999 9999 9999 9999", nome do titular "Jorge Silva" e CVV "111" corretamente
And clica em "Cadastrar"
Then ele visualiza a mensagem "Cartão já cadastrado. Tente outro cartão."
And ele não pode efetuar suas compras

Scenario: Cadastro de pix com sucesso
Given o usuário está logado com email "jorge123@gmail.com"
And está na tela "Página de pagamento"
When ele seleciona "Pix"
And lê o QRCode e confirma o pagamento
Then ele visualiza a mensagem "Pagamento confirmado"
And ele pode efetuar suas compras

Scenario: Cadastro de boleto com sucesso
Given o usuário está logado com email "jorge123@gmail.com"
And está na tela "Página de pagamento"
When ele seleciona "Boleto"
And lê código de barras ou digita o código e confirma o pagamento
Then ele visualiza a mensagem "Pagamento confirmado"
And ele pode efetuar suas compras

Scenario: Cadastro de paypall com sucesso
Given o usuário está logado com email "jorge123@gmail.com"
And está na tela "Página de pagamento"
When ele seleciona "Paypall"
And confirma o pagamento com sua conta do paypall
Then ele visualiza a mensagem "Pagamento confirmado"
And ele pode efetuar suas compras