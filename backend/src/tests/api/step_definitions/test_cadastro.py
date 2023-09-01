from src.main import *
from pytest_bdd import scenario, given, when, then, parsers
import pytest


criar_banco()

#---------------------------teste1
@scenario(
    scenario_name="Cadastrar uma nova loja",
    feature_name="../features/cadastro_lojas_testes.feature"
)
def test_cadastro(): # testar o cadastro bem sucedido de uma loja
    pass

@given(
    parsers.cfparse(
        'a loja com email "{email}" ainda não foi cadastrada'
    )
)
def limpando_banco(client, email: str):#caso ela exista, apagando do banco de dados
    response = client.delete(f"/lojas/{email}")

@when(
    parsers.cfparse(
        'uma solicitação POST é feita para "{login_url}" com email "{email}", senha "{senha}", nome "{nome}", localicazao "{endereco}" e cnpj "{cnpj}"'
    ),
    target_fixture="context"
)
def cadastrando_no_banco(client, nome: str, email: str, senha: str, cnpj: str, endereco: str, context):
    response = client.post("/lojas", json={"nome": nome, "email": email, "senha": senha, "endereco": endereco, "cnpj": cnpj})
    context["response"] = response 
    return context


@then(parsers.cfparse('o código de status da resposta é "{status_code}"'
        ), 
    target_fixture="context"
      
)
def checandocodigodereposta(context, status_code: str):
    assert context["response"].status_code == int(status_code) # verifica se o código de status da resposta é 201
    return context

#--------------------------teste 2

@scenario(
    scenario_name="Tentar cadastrar uma loja ja cadastrada",
    feature_name="../features/cadastro_lojas_testes.feature"
)
def test_cadastro_malsucedido(): # testar o cadastro bem sucedido de uma loja
    pass

@given(
    parsers.cfparse(
        'a loja com email "{email}", senha "{senha}", nome "{nome}", localicazao "{endereco}" e cnpj "{cnpj}" ja foi cadastrada'
    )
)
def criandoessaloja(client, email:str, senha:str, nome:str, endereco:str, cnpj:str ):#criando ela no bd
    client.post("/lojas", json={"nome": nome, "email": email, "senha": senha, "endereco": endereco, "cnpj": cnpj})

@when(
    parsers.cfparse(
        'uma solicitação POST é feita para "{login_url}" com email "{email}", senha "{senha}", nome "{nome}", localicazao "{endereco}" e cnpj "{cnpj}"'
    ),
    target_fixture="context"
)
def cadastrandomaisumavez(client, nome: str, email: str, senha: str, cnpj: str, endereco: str, context):
    response = client.post("/lojas", json={"nome": nome, "email": email, "senha": senha, "endereco": endereco, "cnpj": cnpj})
    context["response"] = response
    return context


@then(parsers.cfparse('o codigo de status é "{status_code}"'
        ), 
    target_fixture="context"
)
def checandocodigodereposta(context, status_code: str):
    assert context["response"].status_code == int(status_code) # verifica se o código de status da resposta é 400
    return context

@then(parsers.cfparse('o JSON de resposta é "{mensagem}"'
        ), 
    target_fixture="context"
)
def checkmensagem(context, mensagem: str):
    assert context["response"].json() == {"detail": mensagem}
    return context
 