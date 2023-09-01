from src.main import *
from pytest_bdd import scenario, given, when, then, parsers
import pytest

criar_banco()

#---------------------------teste1
@scenario(
    scenario_name="Review feita com sucesso",
    feature_name="../features/review.feature"
)
def test_review1():
    """Review feita com sucesso"""

@given(
    parsers.cfparse(
        'User esta preenchido com "{user}", Company esta prenchido com "{company}", Star esta prenchido com "{star}", Comment esta prenchido com "{comment}"'
    )
)
def limpando_banco(client, user: str):#caso ela exista, apagando do banco de dados
    response = client.delete(f"/submit_review/{user}")

@when(
    parsers.cfparse(
        'Uma solicitação "POST" é feita para "{review_url}", contendo "{user}","{company}","{star}","{comment}"'
    ),
    target_fixture="context"
)
def submitando_review(client,context, review_url:str, user: str, company: str, star: str, comment: str):
    response = client.post(review_url, json={
        "user": user,
        "company": company,
        "stars": int(star),
        "comment": comment
    })
    context["response"] = response
    return context
@then(
    parsers.cfparse(
        'O servidor retorna uma mensagem contendo "{msg_retorno}"'#verificar se a resposta é a mensagem de erro 'Avaliação submetida com sucesso'
    ),
    target_fixture="context"
)
def check_review(context, msg_retorno: str):
    resposta = context["response"].json()
    assert resposta == {"detail": msg_retorno}
    return context

@then(parsers.cfparse('Informa o código de status como sendo "{status_code}"'
        ), 
    target_fixture="context"
      
)
def checandocodigodereposta(context, status_code: str):
    assert context["response"].status_code == int(status_code) # verifica se o código de status da resposta é 200
    return context

#--------------------------teste 2

@scenario(
    scenario_name="Review feita com estrela inválida",
    feature_name="../features/review.feature"
)
def test_review2():
    """Review feita com estrela inválida"""

@given(
    parsers.cfparse(
        'User esta preenchido com "{user}", Company esta prenchido com "{company}", Star esta prenchido com "{star}", Comment esta prenchido com "{comment}"'
    )
)

def limpando_banco(client, user: str):#caso ela exista, apagando do banco de dados
    response = client.delete(f"/submit_review/{user}")

@when(
    parsers.cfparse(
        'Uma solicitação "POST" é feita para "{review_url}", contendo "{user}","{company}","{star}","{comment}"'
    ),
    target_fixture="context"
)
def submitando_review(client,context, review_url:str, user: str, company: str, star: str, comment: str):
    response = client.post(review_url, json={
        "user": user,
        "company": company,
        "stars": int(star),
        "comment": comment
    })
    context["response"] = response
    return context
@then(
    parsers.cfparse(
        'O servidor retorna uma mensagem contendo "{msg_retorno}"'#verificar se a resposta é a mensagem de erro 'Avaliações devem ser entre 1 e 5 estrelas'
    ),
    target_fixture="context"
)
def check_review(context, msg_retorno: str):
    resposta = context["response"].json()
    assert resposta == {"detail": msg_retorno}
    return context

@then(parsers.cfparse('Informa o código de status como sendo "{status_code}"'
        ), 
    target_fixture="context"
      
)
def checandocodigodereposta(context, status_code: str):
    assert context["response"].status_code == int(status_code) # verifica se o código de status da resposta é 400
    return context

#--------------------------teste 3

@scenario(
    scenario_name="Review feita com comentario inválido",
    feature_name="../features/review.feature"
)
def test_review3():
    """Review feita com comentario inválido"""

@given(
    parsers.cfparse(
        'User esta preenchido com "{user}", Company esta prenchido com "{company}", Star esta prenchido com "{star}", Comment esta prenchido com ""'
    )
)
def limpando_banco(client, user: str):#caso ela exista, apagando do banco de dados
    response = client.delete(f"/submit_review/{user}")

@when(
    parsers.cfparse(
        'Uma solicitação "POST" é feita para "{review_url}", contendo "{user}","{company}","{star}",""'
    ),
    target_fixture="context"
)
def submitando_review(client,context, review_url:str, user: str, company: str, star: str):
    response = client.post(review_url, json={
        "user": user,
        "company": company,
        "stars": int(star),
        "comment": ""
    })
    context["response"] = response
    return context
@then(
    parsers.cfparse(
        'O servidor retorna uma mensagem contendo "{msg_retorno}"'#verificar se a resposta é a mensagem de erro 'Comentários vazios não são permitidos'
    ),
    target_fixture="context"
)
def check_review(context, msg_retorno: str):
    resposta = context["response"].json()
    assert resposta == {"detail": msg_retorno}
    return context

@then(parsers.cfparse('Informa o código de status como sendo "{status_code}"'
        ), 
    target_fixture="context"
      
)
def checandocodigodereposta(context, status_code: str):
    assert context["response"].status_code == int(status_code) # verifica se o código de status da resposta é 400
    return context

#--------------------------teste 4
@scenario(
    scenario_name="Get reviews",
    feature_name="../features/review.feature"
)
def test_review4():
    """Get reviews"""

@given(
    parsers.cfparse(
        'Existem "{number}" reviews que foram feitas anteriormente sobre a empresa "{company}"'
    )
)

def tampa(client, company:str):
   response = ""

@when(
    parsers.cfparse(
        'Uma solicitação "GET" é feita para "{review_url}"'
    ),
    target_fixture="context"
)

def getando_review(client,context, review_url:str):
    response = client.get(review_url)
    context["response"] = response
    return context

@then(
    parsers.cfparse(
        'O servidor retorna uma lista contendo "{number}" reviews'
    ),
    target_fixture="context"
)
def check_len(context, number: str):
    resposta = context["response"].json()
    assert len(resposta) == int(number)
    return context

@then(parsers.cfparse('Informa o código de status como sendo "{status_code}"'
        ), 
    target_fixture="context"
      
)
def checandocodigodereposta(context, status_code: str):
    assert context["response"].status_code == int(status_code) # verifica se o código de status da resposta é 200
    return context

    