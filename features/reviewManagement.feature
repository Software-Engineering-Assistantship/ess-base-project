Feature: gerenciamento de reviews

As a usuário comum logado
I want to adicionar, remover ou editar reviews
so that  outra pessoas possam ver minha opinião

Scenario: Acessar tela de avaliação 
	Given o usuário “Thiago” está logado e na página da cadeira “Cálculo”
	When o usuário aperta o botão “Avaliar”
	Then A tela de “review” é exibida

Scenario: Sair da tela de avaliação 
	Given o usuário “Thiago” está logado e na página da cadeira “Cálculo”
	And A tela de “review” está sendo exibida
	When o usuário aperta o botão “Sair”
	Then O usuário é levado para a página da cadeira “Cálculo”

Scenario: Adicionar uma avaliação completa
    Given que o usuário “Thiago” está na tela de “review” da cadeira “Cálculo”
    And  o usuário não cadastrou um review para essa cadeira ainda
    When o usuário preenche o campo “Nota”’ com o número “8,5” e o campo ”texto” com “muito boa”
    Then a avaliação do usuário é adicionada à lista de avaliações da cadeira
    And o usuário é levado para a página da cadeira
    And uma notificação de confirmação é exibida

Scenario: Adicionar uma avaliação sem nota
    Given que o usuário “Thiago” está na tela de “review” da cadeira “Cálculo”
    And  o usuário não cadastrou um review para essa cadeira ainda
    When o usuário não preenche o campo “Nota” e salva a análise
    Then uma notificação de erro é exibida
    And o usuário ainda está na mesma tela

Scenario: Adicionar uma avaliação sem texto
    Given que o usuário “Thiago” está na tela de “review” da cadeira “Cálculo”
    And  o usuário não cadastrou um review para essa cadeira ainda
    When  o usuário preenche o campo “Nota”’ com o número “8,5” e não preenche ”comentário”
    Then a avaliação do usuário é adicionada à lista de avaliações da cadeira
    And o usuário é levado para a página da cadeira
    And uma notificação de confirmação é exibida

Scenario: Remover uma avaliação
    Given que o usuário “Thiago” está na tela de “review” da cadeira “Cálculo”
    And há uma review feita por este usuário
    When o usuário clica no botão ‘Apagar’ 
    Then essa avaliação é removida da lista de avaliações da cadeira
    And o usuário é levado para a tela da cadeira

