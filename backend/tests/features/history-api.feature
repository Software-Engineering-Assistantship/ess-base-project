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
    When faço uma requisição PUT para "/users/3/history" com o corpo:
      """
      {
        "videoId": "201",
        "titulo": "The Office - Episódio 3"
      }
      """
    Then o status da resposta deve ser "201 Created"
    And o corpo da resposta (JSON) contém "Vídeo adicionado ao histórico"
    And agora o histórico do usuário com id "3" possui o vídeo "201"

  Scenario: Atualizar histórico para um usuário
    Given existe um usuário com id "3" que já possui o vídeo "201" no histórico
    When faço uma requisição PUT para "/users/3/history" com o corpo:
      """
      {
        "videoId": "201",
        "titulo": "The Office - Episódio 3"
      }
      """
    Then o status da resposta deve ser "200 OK"
    And o corpo da resposta (JSON) contém "Data de visualização atualizada"
