In this feature, I should create a system that allows the users to rate the deliveries bases on their experience.

Cenários:

Cenário 1: Avaliação de uma entrega
Dado que eu já tenha recebido o meu pedido realizado pelo site.
E eu entro no site logando como usuário comum.
E eu vejo a opção “pedidos”
Quando eu clico na aba pedidos
E eu vejo um  pop up pedindo a avaliação do pedido baseado em um número de estrelas de 0 a 5
E eu preencho as estrelas de acordo com a minha satisfação com o pedido
Então eu vejo uma mensagem de “sucesso”
E eu sou redirecionado novamente a loja para, caso queira, realizar novos pedidos.

Cenário 2: Notificação de que a entrega já está a caminho
Dado que eu tenha realizado um pedido pelo site
E eu entro no site logando como usuário comum
E eu vejo aparecer na parte superior da minha tela uma notificação avisando que o pedido está em trânsito
Quando eu clico em cima da notificação
E eu sou redirecionado para uma outra tela 
Então eu posso ver, nesta tela, o quão próximo o produto está de mim através de uma linha que vai se preenchendo à medida que o produto se aproxima.

Cenário 3: Notificação de que o pedido não foi enviado
Dado que eu tenha realizado um pedido pelo site
E eu entro no site logando como usuário comum
E eu vejo aparecer na parte superior da minha tela uma notificação avisando que houve um erro no envio do meu pedido
Quando eu clico em cima da notificação
E eu sou redirecionado para uma outra tela 
E eu vejo uma mensagem explicando o que ocorreu com o meu pedido
E eu vejo duas checkbox com a opção de, ou manter o pedido, porém com um maior tempo de entrega, ou cancelar o pedido.
E eu clico na opção desejada
Então aparece uma mensagem de sucesso
E eu sou redirecionado para a página inicial

Cenário 4: Notificação de que o pedido chegou
Dado que eu tenha realizado um pedido pelo site
E eu entro no site logando como usuário comum
E eu vejo aparecer na parte superior da minha tela uma notificação avisando que o meu pedido chegou
Quando eu clico em cima da notificação
E eu sou redirecionado para uma outra tela 
E eu vejo uma mensagem pedindo para eu confirmar o recebimento do meu pedido
E eu confirmo
Então eu vejo uma mensagem de sucesso
E eu sou redirecionado para a tela de pedidos

Cenário 5: Notificação de que a entrega já está a caminho(2)
Dado que eu tenha realizado um pedido pelo site
E eu entro no site logando como usuário comum
E eu vejo aparecer na parte superior da minha tela uma notificação avisando que o pedido está em trânsito
Quando eu clico em cima da notificação
E eu sou redirecionado para uma outra tela 
Então eu posso ver, nesta tela, o quão próximo o produto está de mim através de uma linha que vai se preenchendo à medida que o produto se aproxima.

Cenário 6: Notificação de que o pedido não foi enviado(2)
Dado que eu tenha realizado um pedido pelo site
E eu entro no site logando como usuário comum
E eu vejo aparecer na parte superior da minha tela uma notificação avisando que houve um erro no envio do meu pedido
Quando eu clico em cima da notificação
E eu sou redirecionado para uma outra tela 
E eu vejo uma mensagem explicando o que ocorreu com o meu pedido
E eu vejo duas checkbox com a opção de, ou manter o pedido, porém com um maior tempo de entrega, ou cancelar o pedido.
E eu clico na opção desejada
Então aparece uma mensagem de sucesso
E eu sou redirecionado para a página inicial