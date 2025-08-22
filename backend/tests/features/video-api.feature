Feature: Sistema de Visibilidade de Vídeos (Serviço)

  Scenario: Obter dados de vídeo com sucesso
    Given existe um vídeo com id "101" no sistema
    And esse vídeo tem título "Stranger Things - Piloto"
    And duração "45 minutos"
    When faço uma requisição GET para "/videos/101"
    Then o status da resposta é "200 OK"
    And o corpo da resposta (JSON) contém:
      """
      {
        "videoId": "101",
        "titulo": "Stranger Things - Piloto",
        "duracao": "45 minutos",
        "videoLink": "https://youtube.com/watch?v=101"
      }
      """

  Scenario: Vídeo não encontrado
    Given não existe um vídeo com id "999"
    When faço uma requisição GET para "/videos/999"
    Then o status da resposta é "404 Not Found"
    And o corpo da resposta (JSON) indica "Vídeo não encontrado"

  Scenario: Registrar visualização de vídeo com sucesso
    Given existe um vídeo com id "101" no sistema
    And existe um usuário com id "1"
    When faço uma requisição POST para "/videos/101/visualizacao" com o corpo:
      """
      {
        "userId": "1"
      }
      """
    Then o status da resposta é "201 Created"
    And o corpo da resposta (JSON) contém:
      """
      {
        "message": "Visualização registrada com sucesso",
        "videoId": "101",
        "userId": "1"
      }
      """
