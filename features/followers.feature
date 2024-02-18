Feature: seguidores/lista de seguidores

    As a usuário do site AlmoCIn
    I want to seguir outros usuários 
    And visualizar os seguidores de qualquer usuário
    So that eu ache outros usuários facilmente 
    And visualizar os reviews desses usuários
    And achar outros usuários que seguem e são seguidos por esse usuário

Cenários GUI 

    Cenário 1: Visualização seguidores na página do usuário
        Given eu estou cadastrado no sistema
        And estou na página do meu perfil 
        And vejo que tenho "7 seguidores"
        When eu seleciono “seguidores” 
        Then eu deveria ver a lista de todos os meus seguidores
        And eu posso "Ver perfil" de cada seguidor
        And posso "Seguir" seguidores que ainda não sigo 
        And posso "Deixar de seguir" usuários que já sigo

    Cenário 2: Seguir usuário a partir da lista de seguidores 
        Given eu estou logado na conta "Guilherme Maranhão" 
        And estou na minha página de perfil
        And vejo a lista com meus seguidores
        When eu sigo "Amanda Napolitano"
        Then eu deveria ver a mensagem de confirmação: 
            "Você agora segue Amanda Napolitano. Enviamos uma notificação sobre esta ação."
        And eu volto para minha lista de seguidores
        And eu posso "Deixar de seguir" "Amanda Napolitano" 

    Cenário 3: Acessar o perfil de um usuário a partir da página de outro
        Given estou logado como "Guilherme Maranhão"
        And estou na minha página de perfil
        And vejo uma lista com usuários que me seguem
        When eu seleciono "Ver perfil" de "Amanda Napolitano"
        Then eu estou na página de perfil de "Amanda Napolitano"

    Cenário 4: Seguir usuário a partir da página de perfil
        Given estou logado como "Guilherme Maranhão"
        And estou na página de perfil de "Amanda Napolitano"
        And eu não sigo "Amanda Napolitano"
        And "Amanda Napolitano" tem "97 seguidores"
        And eu posso "Seguir" "Amanda Napolitano"
        When eu seleciono "Seguir"
        And aparece a mensagem de confirmação:
            "Você agora segue Amanda Napolitano. Enviamos uma notificação sobre esta ação."
        And eu fecho a mensagem
        Then eu estou de volta na página de perfil de "Amanda Napolitano"
        And "Amanda Napolitano" tem "98 seguidores"
        And eu posso "Deixar de seguir"

    Cenário 5: Visualização de seguidores de outro usuário
        Given eu estou cadastrado no sistema
        And estou na página do meu perfil 
        And vejo que tenho "15 seguindo"
        When eu seleciono “seguindo” 
        Then eu deveria ver a lista de todos os usuários que eu sigo
        And eu posso "Ver perfil" de cada usuário 
        And posso "Deixar de seguir" todos da lista

    Cenário 6: Visualização "seguindo" na página do usuário 
        Given eu estou logado no sistema
        And estou na página do meu perfil
        And sigo 15 pessoas
        When eu seleciono "seguindo"
        Then eu deveria ver a lista com todos os usuários que sigo
        And eu posso "Ver perfil" de todos os usuários
        And eu posso "Deixar de seguir" todos os usuários da lista

    Cenário 7: Deixar de seguir um usuário a partir da lista de seguindo
        Given eu estou logado como "Guilherme Maranhão" 
        And estou na minha página de perfil
        And vejo a lista com os usuários que eu sigo
        And eu sigo "Ana Sofia"
        When eu deixo de seguir "Ana Sofia"
        And fecho a mensagem de confirmação:
            "Você deixou de seguir Ana Sofia."
        Then eu volto a ver a lista de usuários que sigo
        And "Ana Sofia" não está na lista

    Cenário 8: Deixar de seguir um usuário a partir da página de perfil
        Given estou logado como "Guilherme Maranhão"
        And estou na página de perfil de "Amanda Napolitano"
        And eu sigo "Amanda Napolitano"
        And "Amanda Napolitano" tem "98 seguidores"
        And eu posso "Deixar de seguir" "Amanda Napolitano"
        When eu deixo de seguir "Amanda Napolitano"
        And aparece a mensagem de confirmação:
            "Você deixou de seguir Amanda Napolitano."
        And eu fecho a mensagem
        Then eu estou de volta na página de perfil de "Amanda Napolitano"
        And "Amanda Napolitano" tem "97 seguidores"
        And eu posso "Seguir"

    Cenário 9: Deixar de seguir um usuário a partir da lista de seguidores
        Given eu estou logado na conta "Guilherme Maranhão" 
        And estou na minha página de perfil
        And vejo a lista com meus seguidores
        And "Amanda Napolitano" me segue
        And "Amanda Napolitano" tem 98 seguidores
        When deixo de seguir "Amanda Napolitano"
        And fecho a mensagem de confirmação:
            "Você deixou de seguir Amanda Napolitano."
        Then eu vejo minha lista de seguidores 
        And eu posso "Seguir" "Amanda Napolitano" 
        And "Amanda Napolitano" tem 97 seguidores

    Cenário 10: Visualização de lista de seguidores vazia 
        Given estou cadastrado no sistema
        And estou na minha página de perfil
        And tenho "0 seguidores"
        When eu seleciono "seguidores"
        Then eu deveria ver uma mensagem "Você ainda não tem nenhum seguidor"

    Cenário 11: Visualização de lista de seguindo vazia 
    Given estou cadastrado no sistema
    And estou na minha página de perfil
    And tenho "0 seguindo"
    When eu seleciono "seguindor"
    Then eu deveria ver uma mensagem "Você não segue nenhum usuário"

Cenários de Serviço

    Cenário 12: Notificação de novo seguidor
        Given "Guilherme Maranhão" está cadastrado no sistema
        And "Amanda Napolitano" está cadastrada no sistema com o e-mail "amanda@email.com"
        When "Guilherme Maranhão" segue "Amanda Napolitano"
        And o servidor retorna o e-mail "amanda@email.com"
        Then o sistema envia uma mensagem para "amanda@email.com"
        And a mensagem contém um link seguro para o perfil de "Guilherme Maranhão"

    Cenário 13: Pegar lista de seguidores
        Given o usuário "Guilherme Maranhão" está armazenado no sistema
        And o id "147" está vinculado ao usuário "Guilherme Maranhão"
        And tem como lista de seguidores "123, 456, 789"
        When eu peço ao sistema pela lista de seguidores do usuário com id "147"
        Then o sistema retorna a lista "123, 456, 789"
        And o usuário "Guilherme Maranhão" está armazenado no sistema com o id "147" 
        And com a lista "123, 456, 789" com os ids dos seguidores
        And o status do sistema é "200 OK"

    Cenário 14: Pegar lista de seguidores vazia
        Given o usuário "Carla Marinho" está armazenado no sistema com o id "258"
        And a lista de seguidores está vazia
        When eu peço ao sistema a lista de seguidores do usuário com id "258"
        Then o sistema retorna a mensagem "error: 'Usuário não possui seguidores'"
        And o usuário "Carla Marinho" está armazenado no sistema com o id "258"
        And a lista de seguidores está vazia
        And o status do sistema é "404 Not Found"

    Cenário 15: Seguir um usuário
        Given o usuário "Carla Marinho" está armazenado no sistema com o id "258"
        And a lista de usuários que "Carla Marinho" segue é "123, 789"
        And o usuário "Guilherme Maranhão" está armazenado no sistema com o id "147"
        And a lista de seguidores de "Guilherme Maranhão" é "123, 456, 789"
        When eu peço ao sistema que "Carla Marinho" siga "Guilherme Maranhão"
        Then sistema retorna a mensagem "mensagem: Seguir usuário com sucesso"
        And o usuário "Guilherme Maranhão" está armazenado no sistema com a lista de 
            seguidores "123, 456, 789, 258"
        And o usuário "Carla Marinho" está armazenado no sistema com a lista de usuários 
            que segue "123, 789, 147"
        And o status do sistma é "200 OK"

    Cenário 16: Pegar lista de usuários que segue
        Given o usuário "Carla Marinho" está armazenado no sistema com o id "258"
        And tem a lista "123, 789, 147" de usuários que segue
        When eu peço ao sistema pela lista de usuários que o usuário com id "258" segue
        Then o sistema retorna a lista "123, 789, 147"
        And o usuário "Carla Marinho" está armazenado no sistema com o id "258"
        And a lista de usuários que segue é "123, 789, 147"
        And o status do sistema é "200 OK"

    Cenário 17: Pegar lista de usuários que segue vazia
        Given o usuário "Guilherme Maranhão" está armazenado no sistema com o id "147"
        And a lista de usuários que segue está vazia
        When eu peço ao sistema a lista de usuários que segue do usuário com id "147"
        Then o sistema retorna a mensagem "error: 'Usuário não está seguindo outros usuários'"
        And o usuário "Guilherme Maranhão" está armazenado no sistema com o id "147"
        And a lista de usuários que segue está vazia
        And o status do sistema é "404 Not Found"

    Cenário 18: Seguir um usuário que já segue
        Given o usuário "Carla Marinho" está armazenado no sistema com o id "258"
        And a lista de usuários que "Carla Marinho" segue é "123, 789, 147"
        And o usuário "Guilherme Maranhão" está armazenado no sistema com o id "147"
        And a lista de seguidores de "Guilherme Maranhão" é "123, 456, 789, 258"
        When eu peço ao sistema que "Carla Marinho" siga "Guilherme Maranhão"
        Then sistema retorna a mensagem "error: Usuário já segue Guilherme Maranhão"
        And o usuário "Guilherme Maranhão" está armazenado no sistema com a lista de 
            seguidores "123, 456, 789, 258"
        And o usuário "Carla Marinho" está armazenado no sistema com a lista de usuários 
            que segue "123, 789, 147"
        And o status do sistma é "409 Conflict"

    Cenário 19: Deixar de seguir um usuário
        Given o usuário "Carla Marinho" está armazenado no sistema com o id "258"
        And a lista de usuários que "Carla Marinho" segue é "123, 789, 147"
        And o usuário "Guilherme Maranhão" está armazenado no sistema com o id "147"
        And a lista de seguidores de "Guilherme Maranhão" é "123, 456, 789, 258"
        When eu peço ao sistema que "Carla Marinho" deixe de seguir "Guilherme Maranhão"
        Then sistema retorna a mensagem "mensagem: Deixar de seguir usuário com sucesso"
        And o usuário "Guilherme Maranhão" está armazenado no sistema com a lista de 
            seguidores "123, 456, 789"
        And o usuário "Carla Marinho" está armazenado no sistema com a lista de usuários 
            que segue "123, 789"
        And o status do sistma é "200 OK"

    Cenário 20: Deixar de seguir um usuário que não segue
        Given o usuário "Carla Marinho" está armazenado no sistema com o id "258"
        And a lista de usuários que "Carla Marinho" segue é "123, 789"
        And o usuário "Guilherme Maranhão" está armazenado no sistema com o id "147"
        And a lista de seguidores de "Guilherme Maranhão" é "123, 456, 789"
        When eu peço ao sistema que "Carla Marinho" deixe de seguir "Guilherme Maranhão"
        Then sistema retorna a mensagem "error: Usuário não segue Guilherme Maranhão"
        And o usuário "Guilherme Maranhão" está armazenado no sistema com a lista de 
            seguidores "123, 456, 789"
        And o usuário "Carla Marinho" está armazenado no sistema com a lista de usuários 
            que segue "123, 789"
        And o status do sistma é "409 Conflict"

    Cenário 21: Deletar lista de seguidores e seguidos de um usuário na deleção do usuário
        Given o usuário "Caio Lins" está armazenado no sistema com id "123"
        And tem a lista de seguidores "258"
        And tem a lista de usuários que segue "147"
        And o usuário "Carla Marinho" está armazenado no sistema com o id "258"
        And a lista de usuários que "Carla Marinho" segue é "123, 789"
        And o usuário "Guilherme Maranhão" está armazenado no sistema com o id "147"
        And a lista de seguidores de "Guilherme Maranhão" é "123, 456, 789"
        When eu peço ao sistema para deletar o usuário "Caio Lins" com id "123"
        Then o sistema retorna a mensagem "mensagem: Usuário deletado com sucesso"
        And o usuário "Carla Marinho" está armazenado no sistema com o id "258"
        And a lista de usuários que "Carla Marinho" segue é "789"
        And o usuário "Guilherme Maranhão" está armazenado no sistema com o id "147"
        And a lista de seguidores de "Guilherme Maranhão" é "456, 789"
        And o usuário "Caio Lins" não está armazenado no sistema
        And o status do sistema é "200 OK"
