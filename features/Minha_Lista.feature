Feature: Minhas listas
As a usuário do sistema
I want to criar, deletar e editar listas (adição e remoção de itens)
So that eu possa organizar meus conteúdos de forma personalizada

Scenario: Criar lista
Given o usuário "José" está na página "Minhas listas"
And o usuário "José" não tem a lista "Favoritos" cadastrada
When o usuário "José" adiciona a lista "Favoritos"
Then o usuário "José" ainda está na página "Minhas listas"
And a lista "Favoritos" é exibida na página

Scenario: Falha ao criar lista duplicada
Given o usuário "José" está na página "Minhas listas"
And o usuário "José" tem a lista "Favoritos" cadastrada
When o usuário "José" tenta adicionar a lista "Favoritos"
Then o usuário "José" recebe uma mensagem de erro informando que a lista já existe

Scenario: Deletar lista
Given o usuário "José" está na página "Minhas listas"
And o usuário "José" tem a lista "Favoritos" cadastrada
When o usuário "José" remove a lista "Favoritos"
Then o usuário "José" ainda está na página "Minhas listas"
And a lista "Favoritos" não é mais exibida

Scenario: Adicionar item na lista
Given o usuário "José" tem a lista "Favoritos" cadastrada
And o usuário "José" está na página "Favoritos"
And o usuário "José" não tem o item "The Batman" na lista "Favoritos"
When o usuário "José" tenta adicionar o item "The Batman"
Then o usuário "José" ainda está na página "Favoritos"
And o item "The Batman" é exibido na lista

Scenario: Falha ao adicionar item duplicado na lista
Given o usuário "José" tem a lista "Favoritos" cadastrada
And o usuário "José" está na página "Favoritos"
And o usuário "José" tem o item "The Batman" na lista "Favoritos"
When o usuário "José" tenta adicionar o item "The Batman"
Then o usuário "José" recebe uma mensagem de erro informando que o item já existe na lista

Scenario: Remover item da lista
Given o usuário "José" tem a lista "Favoritos" cadastrada
And o usuário "José" está na página "Favoritos"
And o usuário "José" tem o item "The Batman" na lista "Favoritos"
When o usuário "José" tenta remover o item "The Batman"
Then o usuário "José" ainda está na página "Favoritos"
And o item "The Batman" não é mais exibido na lista