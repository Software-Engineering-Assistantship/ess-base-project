Feature: Edição de conteúdo

    É possível editar um conteúdo já existente. Para isso, basta clicar no botão "Editar" na página de conteúdos. O usuário será redirecionado para a página de edição do conteúdo, onde poderá realizar alterações e clicar no botão "Salvar" para salvá-las.

Given que “Ana” está logada na aplicação
And “Ana” tem permissão de “edição/remoção”
And “Ana” está na aba “músicas” da página de conteúdos
When “Ana” localiza uma música de ID “123” que deseja editar
And “Ana” clica no botão de edição próximo à música de ID “123”
Then uma modal com a informação original da música “123” é exibida
When “Ana” edita o campo “descrição” da música conforme desejado
And clica no botão de “editar” para salvar as alterações
Then a música “123” é atualizado com o novo conteúdo editado
And as alterações são visíveis na página de conteúdos
MODIFICANDO UMA LINHDA