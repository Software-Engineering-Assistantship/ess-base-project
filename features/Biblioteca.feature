Cenários - Biblioteca do usuário
As a usuário cadastrado no sistema de reviews
I want to armazenar cadeiras do sistema em pastas de uma biblioteca
So that eu possa me organizar melhor

- Criação bem-sucedida de pasta
	Given o usuário de login "maa5" e senha "12345" está na página "Biblioteca"
	And a biblioteca não possui uma pasta de nome "1o período"
	When ele tenta criar a pasta de nome "1o período"
	Then a pasta "1o período" é criada com sucesso
	
- Criação mal-sucedida de pasta
	Given o usuário de login "maa5" e senha "12345" está na página "Biblioteca"
	And a biblioteca já possui uma pasta de nome "1o período"
	When ele tenta criar a pasta de nome "1o período"
	Then um aviso de erro aparece na tela
	And nenhuma pasta nova é criada
	
- Inserção bem-sucedida de cadeira em pasta
	Given o usuário de login "maa5" e senha "12345" está na página da cadeira "Física 1"
	And a pasta "2o Período" da biblioteca do usuário não possui uma cadeira de nome "Física 1"
	When ele tenta adicionar a cadeira de nome "Física 1" à pasta de nome "2o período"
	Then a cadeira "Física 1" é adicionada com sucesso à pasta "2o Período"
	
- Inserção mal-sucedida de cadeira em pasta
	Given o usuário de login "maa5" e senha "12345" está na página da cadeira "Física 1"
	And a pasta "2o Período" da biblioteca do usuário já possui uma cadeira de nome "Física 1"
	When ele tenta adicionar a cadeira de nome "Física 1" à pasta de nome "2o período"
	Then um aviso de erro aparece na tela
	And a cadeira "Física 1" não é adicionada à pasta "2o período"

- Remoção de uma cadeira da pasta
	Given o usuário de login "maa5" e senha "12345" está na página da pasta "2o Período"
	And a pasta possui uma cadeira de nome "Física 1"
	When ele tenta remover a cadeira de nome "Física 1" da pasta de nome "2o período"
	Then a cadeira "Física 1" é removida com sucesso da pasta "2o Período"
	
- Remoção de pasta da biblioteca
	Given o usuário de login "maa5" e senha "12345" está na página "Biblioteca"
	And a biblioteca possui uma pasta de nome "1o Período"
	When ele tenta remover a pasta de nome "1o período"
	Then a pasta "1o Período" é removida com sucesso da página "Biblioteca" do usuário 'maa5"
