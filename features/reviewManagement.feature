Feature: Gerenciar reviews

    Scenario: Acessar tela de avaliação 
	Given o usuário “Thiago” está logado e na página da cadeira “Cálculo”
	When o usuário aperta o botão “Avaliar”
	Then A tela de “review” é exibida

    Scenario: Adicionar uma avaliação
    Given que o usuário “Thiago” está na tela de “review” da cadeira “Cálculo”
    And  o usuário não cadastrou um review para essa cadeira ainda
    When o usuário preenche o campo “Nota” com um número entre 0 e 10 e clica no botão “Enviar”
    Then a avaliação do usuário é adicionada à lista de avaliações da cadeira
    And o usuário é levado para a página da cadeira
    And uma notificação de confirmação é exibida

    Scenario: Adicionar uma avaliação sem nota
    Given que o usuário “Thiago” está na tela de “review” da cadeira “Cálculo”
    And  o usuário não cadastrou um review para essa cadeira ainda
    When o usuário não preenche o campo “Nota” com um número entre 0 e 10 e clica no botão “Enviar”
    Then uma notificação de erro é exibida
    And o usuário ainda está na mesma tela
    And a avaliação do usuário não é adicionada à lista de avaliações da cadeira

    Scenario: Remover uma avaliação
    Given que o usuário “Thiago” está na tela de “review” da cadeira “Cálculo”
    And há uma review feita por este usuário
    When o usuário clica no botão "Apagar"
    Then essa avaliação é removida da lista de avaliações da cadeira
    And o usuário é levado para a tela da cadeira

    Scenario: Sair da tela de avaliação 
	Given que o usuário “Thiago” está na tela de “review” da cadeira “Cálculo”
	When o usuário aperta o botão "Sair"
    Then o usuário é levado para a página da cadeira

