Feature: Sistema de Visibilidade de Vídeos

  As um usuário
  I want visualizar vídeos com uma interface de reprodução e interações
  So that eu possa assistir, curtir ou compartilhar os vídeos facilmente.

    Scenario: Compartilhar vídeo copiando a URL
      Given o usuário "Lucas Sales" está na página do vídeo "Stranger Things - Piloto"
      When "Lucas Sales" seleciona a opção "Compartilhar"
      And "Lucas Sales" seleciona a opção "Copiar URL"
      Then o sistema coloca a URL de "Stranger Things - Piloto" na área de transferência
      And exibe a mensagem "URL copiada com sucesso!"

    Scenario: Registrar visualização no histórico
      Given o usuário "Lucas Sales" está na página "Inicial"
      And "Lucas Sales" não possui o vídeo "The Office - Episódio 3" em seu histórico
      When "Lucas Sales" seleciona o vídeo "The Office - Episódio 3"
      Then "Lucas Sales" acessa a página "Histórico"
      And "Lucas Sales" vê "The Office - Episódio 3" no histórico
