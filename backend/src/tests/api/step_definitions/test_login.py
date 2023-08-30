from src.main import *
from pytest_bdd import scenario, given, when, then, parsers
import pytest


#---------- teste1

criar_banco()


@scenario(
    scenario_name="Login bem sucedido de um usuário",
    feature_name="../features/login_lojas_testes.feature"
)
def test_login_sucedido(): # testar o login bem sucedido de uma loja
    pass

@given(
    parsers.cfparse(
        'um usuário com e-mail "{email}", senha "{senha}", nome "{nome}", endereco "{endereco}" e cpnj "{cnpj}" está cadastrado no sistema'
    )
)
def mock_user_in_database(client, nome: str, email: str, senha: str, cnpj: str, endereco: str):
    client.post("/lojas", json={"nome": nome, "email": email, "senha": senha, "endereco": endereco, "cpnj": cnpj})


@when(
    parsers.cfparse(
        'o usuário envia uma requisição POST para "{login_url}" com e-mail "{email}" e senha "{senha}"'
    ),
    target_fixture="context"
)
def send_login_request(client, login_url, email:str, senha: str, context):
    response = client.post(login_url, json= {"email": email, "senha": senha} ) # envia um post para a rota de login com o email e senha do usuário
    context["response"] = response
    return context

@then(parsers.cfparse('o status da resposta deve ser "{status_code}"'), target_fixture="context")
def check_login_response_status_code(context, status_code: str):
    assert context["response"].status_code == int(status_code) # verifica se o código de status da resposta é 200
    return context

@then(
    parsers.cfparse(
        'O JSON da reposta deve retornar o usuario com email "{email}"'
    ),
    target_fixture="context"
)
def check_login(context, email: str):
    
    expected_email = {"email": email} # verifica se o JSON da resposta contém o email do usuario
    assert context["response"].json() == {"detail": expected_email}
    return context


#------------- teste 2

@scenario(
    scenario_name="Falha no login por senha incorreta",
    feature_name="../features/login_lojas_testes.feature"
)
def test_login_falho(): # testar o login mal sucedido de uma loja
    pass

@given(
    parsers.cfparse(
        'um usuário com e-mail "{email}", senha "{senha}", nome "{nome}", endereco "{endereco}" e cpnj "{cnpj}" está cadastrado no sistema'
    )
)
def mock_user_in_database(client, nome: str, email: str, senha: str, cnpj: str, endereco: str):
    client.post("/lojas", json={"nome": nome, "email": email, "senha": senha, "endereco": endereco, "cpnj": cnpj})


@when(
    parsers.cfparse(
        'o usuário envia uma requisição POST para "{login_url}" com e-mail "{email}" e senha "{senha}"'
    ),
    target_fixture="context"
)
def send_login_request(client, login_url, email:str, senha:str , context):
    response = client.post(login_url, json= {"email": email, "senha": senha} ) # envia um post para a rota de login com o email e senha do usuário
    context["response"] = response
    return context

@then(parsers.cfparse('o status da resposta deve ser "{status_code}"'), target_fixture="context")
def check_login_response_status_code(context, status_code: str):
    assert context["response"].status_code == int(status_code) # verifica se o código de status da resposta é 400
    return context

@then(
    parsers.cfparse(
        'o JSON da resposta deve conter "{error_mensage}"'#verificar se a resposta é a mensagem de erro 'Email ou senha estão incorretos'
    ),
    target_fixture="context"
)
def check_login(context, error_mensage: str):
    assert context["response"].json() == {"detail": error_mensage}
    return context


#---------------------teste 3


@scenario(
    scenario_name="Falha no login por email não cadastrado",
    feature_name="../features/login_lojas_testes.feature"
)
def test_login_falho2(): # testar o login mal sucedido de uma loja
    pass

@given(
    parsers.cfparse(
        'um usuário com e-mail "{email}", senha "{senha}", nome "{nome}", endereco "{endereco}" e cpnj "{cnpj}" não está cadastrado no sistema'
    )
)
def limpando_bd(client, email: str):
    client.delete('/lojas/{email}')

@when(
    parsers.cfparse(
        'o usuário envia uma requisição POST para "{login_url}" com e-mail "{email}" e senha "{senha}"'
    ),
    target_fixture="context"
)
def send_login_request(client, login_url, email:str, senha: str, context):
    response = client.post(login_url, json= {"email": email, "senha": senha} ) # envia um post para a rota de login com o email e senha do usuário
    context["response"] = response
    return context



@then(parsers.cfparse('o status da resposta deve ser "{status_code}"'), target_fixture="context")
def check_login_response_status_code(context, status_code: str):
    assert context["response"].status_code == int(status_code) # verifica se o código de status da resposta é 400
    return context

@then(
    parsers.cfparse(
        'o JSON da resposta deve conter "{error_mensage}"'#verificar se a resposta é a mensagem de erro 'Email ou senha estão incorretos'
    ),
    target_fixture="context"
)
def check_login(context, error_mensage: str):
    assert context["response"].json() == {"detail": error_mensage}
    return context 
