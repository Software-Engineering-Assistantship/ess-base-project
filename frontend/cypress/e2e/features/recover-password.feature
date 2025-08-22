Feature: Recuperar Senha
As a Usuário "Cliente" ou "Hoteleiro"
I want to recuperar a senha da minha conta
So that eu possa resetar minha senha

  Scenario: Recuperação de Senha Bem-Sucedida de usuário Hoteleiro
    Given eu estou na página "/hotelier/login"
    When eu seleciono "esqueci-senha-h"
    And eu preencho o campo "email-rp-h" com "vbcf@cin.ufpe.br"
    And eu seleciono "enviar-rp-h"
    Then eu vejo um toast de sucesso com a mensagem "Token enviado para o seu e-mail! Verifique sua caixa de entrada."
    And eu sou redirecionado para a página "/hotelier/password/reset"

  Scenario: Recuperação de Senha Bem-Sucedida de usuário Cliente
    Given eu estou na página "/client/login"
    When eu seleciono "esqueci-senha-c"
    And eu preencho o campo "email-rp-c" com "biancaduarte1914@gmail.com"
    And eu seleciono "enviar-rp-c"
    Then eu vejo um toast de sucesso com a mensagem "Token enviado para o seu e-mail! Verifique sua caixa de entrada."
    And eu sou redirecionado para a página "/client/password/reset"

  Scenario: Recuperação de Senha Mal-Sucedida de usuário Hoteleiro com e-mail não-cadastrado
    Given eu estou na página "/hotelier/login"
    When eu seleciono "esqueci-senha-h"
    And eu preencho o campo "email-rp-h" com "vbcf@fakemail.com"
    And eu seleciono "enviar-rp-h"
    Then eu vejo um toast de erro com a mensagem "Falha ao enviar o e-mail de recuperação. Tente novamente."
    And eu continuo na página "/hotelier/password/recover"

  Scenario: Recuperação de Senha Mal-Sucedida de usuário Cliente com e-mail não-cadastrado
    Given eu estou na página "/client/login"
    When eu seleciono "esqueci-senha-c"
    And eu preencho o campo "email-rp-c" com "biancaduarte1914@fakemail.com"
    And eu seleciono "enviar-rp-c"
    Then eu vejo um toast de sucesso com a mensagem "Falha ao enviar o e-mail de recuperação. Tente novamente."
    And eu continuo na página "/client/password/recover"
