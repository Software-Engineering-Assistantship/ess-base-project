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
    And a mensagem contém um link seguro para o perfil de "Guilherme Mergulhão"
