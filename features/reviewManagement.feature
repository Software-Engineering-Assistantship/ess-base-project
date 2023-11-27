Feature: Gerenciar reviews

    Scenario: Acessar tela de avaliação 
	Given o usuário “Thiago” está logado e na página da cadeira “Cálculo”
	When o usuário aperta o botão “Avaliar”
	Then A tela de “review” é exibida