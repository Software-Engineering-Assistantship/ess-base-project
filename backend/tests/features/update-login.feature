Feature: Atualizar Cadastro
  As a Usuário "Hoteleiro" ou "Cliente"
  I want to atualizar minhas informações de cadastro
  So that eu possa manter meus dados atualizados e garantir a segurança da minha conta

Scenario: Redefinição de Senha
  Given Eu estou na tela de Login
  And Eu não estou logado no sistema
  And Eu estou cadastrado no Sistema com o “E-mail”  “barbara.alencar@gmail.com”
  And a “Senha” “@AmoBolo123”
  When Eu seleciono a opção “Esqueci minha Senha”
  And eu preencho o campo “Digite o E-mail Cadastrado” com “barbara.alencar@gmail.com”
  And eu seleciono a opção “Confirmar”
  Then Eu recebo um E-mail com a senha  “@AmoBolo123”

Scenario: Atualização do E-mail e Senha
  Given Eu estou na página “Meu Perfil”
  And Eu estou logado no Sistema com o “E-mail”  “barbara.alencar@gmail.com”
  And a “Senha” “@AmoBolo123”
  When eu seleciono a opção “Editar minhas informações”
  And preencho o campo “E-mail” com “julia.sabino@gmail.com”
  And a senha “@NovaSenha123”
  Then Eu recebo uma mensagem de confirmação “Cadastro Atualizado com Sucesso”
  And continuo em “Meu Perfil”

Scenario: Falha na Atualização do Usuário por Senha em Branco
  Given Eu estou na página “Meu Perfil”
  And Eu estou logado no Sistema com o “E-mail”  “barbara.alencar@gmail.com”
  And a “Senha” “@AmoBolo123”
  When eu seleciono a opção “Editar minhas informações”
  And preencho o campo “E-mail” com “julia.sabino@gmail.com”
  And a senha “”
  Then Eu recebo uma mensagem de erro “Operação não concluída devido a ausência de preenchimento de campos obrigatórios.
  And continuo em “Meu Perfil”

Scenario: Falha na Atualização do Usuário por E-mail em Branco
  Given Eu estou na página “Meu Perfil”
  And Eu estou logado no Sistema com o “E-mail”  “barbara.alencar@gmail.com”
  And a “Senha” “@AmoBolo123”
  When eu seleciono a opção “Editar minhas informações”
  And preencho o campo “E-mail” com “”
  And a senha  “@AmoBolo123”
  Then Eu recebo uma mensagem de erro “Operação não concluída devido a ausência de preenchimento de campos obrigatórios”.
  And continuo em “Meu Perfil”
