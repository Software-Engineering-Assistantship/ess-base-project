#feature

Feature: Publicando Acomodação
  As a Pessoa Jurídica
  I want to publicar minha acomodação
  So that eu posso receber reservas para a minha acomodação

  #scenarios GUI

  Scenario: Acomodação Publicada com sucesso
    Given that estou na página "publicar reserva"
    When preencho os detalhes da propriedade com a opção "wifi" e "tv"
    And seleciono a opção "2" no número de pessoas acomodadas
    And preencho o preço da propriedade com 'R$100,00'
    And envio as fotos 'foto1.png' e 'photo2.png'
    And preencho a descrição da propriedade com 'Hotel confortável e relaxante beira-mar'
    And envio as informações preenchidas
    Then um alerta aparece informando  mensagem “A acomodação foi publicada com sucesso"


  Scenario: Acomodação não publicada com sucesso devido a campos incompletos
    Given that estou na página "publicar reserva"
    When preencho os detalhes da propriedade com a opção "wifi" e "tv"
    And seleciono a opção "2" no número de pessoas acomodadas
    And não preencho o preço da propriedade
    And envio as fotos "foto1.png" e "photo2.png"
    And preencho a descrição da propriedade com "Hotel confortável e relaxante beira-mar"
    And envio as informações preenchidas
    Then um alerta aparece com a mensagem: "Acomodação não foi publicada com sucesso.
  Por favor, preencha todos os campos antes de publicar a acomodação."


  Scenario: Acomodação não publicada devido à ausência de foto
    Given that que estou na página "publicar reserva"
    When eu preencho o detalhamento da propriedade com a opção "wifi" e "tv"
    And seleciono a opção "2" no número de pessoas acomodadas
    And preencho o preço da propriedade com "R$100,00"
    And preencho a descrição da propriedade com "Hotel confortável e relaxante beira-mar"
    And envio as informações preenchidas
    Then um alerta aparece com a mensagem: "Acomodação não foi publicada com sucesso.
  Por favor, envie pelo menos uma foto."

  Scenario: Acomodação não publicada devido a erro no preço
    Given that que estou na página "publicar reserva"
    When preencho os detalhes da propriedade com a opção "wifi" e "tv"
    And seleciono a opção "2" no número de pessoas acomodadas
    And preencho o preço da propriedade com "R$100,00"
    And envio as fotos "foto1.png" e "photo2.png"
    And preencho a descrição da propriedade com "Hotel confortável e relaxante beira-mar"
    And defino um preço inferior ao preço mínimo permitido pelo sistema
    And envio as informações preenchidas
    Then um alerta aparece com a mensagem: "Acomodação não foi publicada com sucesso.
  O preço inserido é inferior ao preço mínimo permitido pelo sistema."

  # Service Scenario
  Scenario: Tentativa de preenchimento do preço de uma acomodação com caracteres inválidos
    Given o usuário “Hotel Fazenda” com CNPJ apto está cadastrado no sistema como Pessoa Jurídica
    And o usuário “Hotel Fazenda” está na página “Publicar Acomodação”
    When o usuário “Hotel Fazenda” preenche o preço com o carácter "#"
    And o usuário tenta enviar as informações
    Then o sistema não permite o usuário enviar a publicação

  #new scenario

  Scenario: Acomodação não publicada com sucesso devido a campos incompletos
    Given that estou na página "publicar reserva"
    When preencho os detalhes da propriedade com a opção "wifi" e "tv"
    And seleciono a opção "2" no número de pessoas acomodadas
    And preencho o preço da propriedade com o valor "100"
    And envio as fotos "foto1.png" e "photo2.png"
    And envio as informações preenchidas
    Then um alerta aparece com a mensagem: "Acomodação não foi publicada com sucesso.
  Por favor, lembre-se de preencher todos os campos antes de publica-la."

  Scenario: Tentativa de selecionar uma foto em formato invalido
    Given o usuário “Hotel Fazenda” com CNPJ apto está cadastrado no sistema como Pessoa Jurídica
    And o usuário “Hotel Fazenda” está na página “Publicar Acomodação”
    When o usuário “Hotel Fazenda” tenta selecionar o documento "imagem.pdf"
    Then o sistema não permite o usuário selecionar esse documento

