Feature: Histórico de Visualizações (Serviço)

  Scenario: Obter histórico com sucesso (não vazio)
    Given existe um usuário com id "1" cadastrado no sistema
    And esse usuário possui os vídeos "101" e "102" no histórico
    When faço uma requisição GET para "/users/1/history"
    Then o status da resposta é "200 OK"
    And o corpo da resposta (JSON) contém os vídeos "101" e "102"

  Scenario: Obter histórico vazio
    Given existe um usuário com id "2" cadastrado no sistema
    And esse usuário não possui nenhum vídeo no histórico
    When faço uma requisição GET para "/users/2/history"
    Then o status da resposta é "200 OK"
    And o corpo da resposta (JSON) contém uma lista vazia

  Scenario: Obter histórico de usuário inexistente
    Given não existe um usuário com id "999" no sistema
    When faço uma requisição GET para "/users/999/history"
    Then o status da resposta é "404 Not Found"
    And o corpo da resposta (JSON) indica "Usuário não encontrado"

  Scenario: Adicionar vídeo ao histórico
    Given existe um usuário com id "3" cadastrado no sistema
    And esse usuário não possui o vídeo "201" no histórico
    When faço uma requisição POST para "/users/3/history"
      And o corpo (JSON) contém:
        """
        {
          "videoId": "201",
          "titulo": "The Office - Episódio 3"
        }
        """
    Then o status da resposta é "201 Created"
    And o corpo da resposta (JSON) contém:
      """
      {
        "message": "Vídeo adicionado ao histórico",
        "history": [
          { "videoId": "201", "titulo": "The Office - Episódio 3", "ultimaVisualizacao": "nova-data" }
        ]
      }
      """
    And agora o histórico do usuário com id "3" possui o vídeo "201"
    
  Scenario: Atualizar data de visualização de um vídeo já existente
    Given existe um usuário com id "3" que já possui o vídeo "201" no histórico
    When faço uma requisição POST para "/users/3/history"
      And o corpo (JSON) contém:
        """
        {
          "videoId": "201",
          "titulo": "The Office - Episódio 3"
        }
        """
    Then o status da resposta é "200 OK"
    And o corpo da resposta (JSON) contém:
      """
      {
        "message": "Data de visualização atualizada",
        "history": [
          { "videoId": "201", "titulo": "The Office - Episódio 3", "ultimaVisualizacao": "nova-data" }
        ]
      }
      """
    And a data de visualização do vídeo "201" foi atualizada no banco de dados
