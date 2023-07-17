Feature: Mostrar onde está disponível

    A feature em questão lista as plataformas de streaming onde uma música específica pode ser encontrada. Os usuários podem clicar nas plataformas listadas para serem redirecionados diretamente ao aplicativo correspondente, facilitando o acesso à música desejada.

Scenario: Exibir informações sobre a disponibilidade da música
GIVEN que o usuário “Ana” está na página de “Em alta”
WHEN o usuário “Ana’ clicar na música desejada
THEN o usuário “Ana” é redirecionado à página de detalhes sobre a música
AND o usuário “Ana” deve ver na tela informações sobre a música e ícones clicáveis para redirecionar para os serviços externos onde a música está disponível

Scenario: Tratamento de música indisponível em serviços externos
GIVEN que o usuário “Ana” está na página de “Em alta”
AND a música desejada não está disponível em nenhum serviço externo
WHEN o usuário “Ana’ clicar na música desejada
THEN o usuário “Ana” é redirecionado à página de detalhes sobre a música 
AND a página deve exibir uma mensagem informando “Faixa não encontrada em nenhuma plataforma de streaming”

Scenario: Exibição do preço da música em serviços pagos
GIVEN que o usuário “Ana” está na página de “Em alta”
AND a música "123" está disponível apenas no serviço "Apple Music" no valor de "5" reais
WHEN o usuário “Ana’ clicar na música "123"
THEN o usuário “Ana” é redirecionado à página de  detalhes sobre a música
AND a página deve exibir o preço no valor de "5" reais
AND uma mensagem “a música desejada está disponível apenas em serviços de streaming pagos”

Scenario: Opções de busca para encontrar a música
GIVEN que o usuário “Ana” está na página de “Em alta”
AND o sistema possui a música "123"
WHEN o usuário “Ana’ clicar em “buscar”
AND o usuário “Ana” digitar no campo de busca a música "123"
THEN a página deve exibir todos os resultados correspondentes à busca, incluindo a música de título "123"