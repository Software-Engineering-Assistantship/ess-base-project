from src.main import *
from pytest_bdd import scenario, given, when, then, parsers
import pytest




#---------- teste6
criar_banco()

@scenario(
    scenario_name="Cadastrar uma nova entrega",
    feature_name="../features/entregas.feature"
)
def test_cadastro_entrega(): # testar o cadastro bem sucedido de um entregador
    pass

@given(
    parsers.cfparse(
        'uma entrega com id "{id}" ainda não foi cadastrada'
    )
)

def test_enchendobatata(client, id: str):#caso ela exista, apagando do banco de dados
    pass

@when(
    parsers.cfparse(
        'uma solicitação POST é feita para "{cad_entrega}" com id "{id}", nomeProduto "{nomeProduto}", quantidade "{quantidade}", marca "{marca}", tipoDoProduto "{tipoDoProduto}", enderecoDeEntrega "{enderecoDeEntrega}", preco "{preco}", status "{status}" e emailEntregador "{emailEntregador}"'
    ),
    target_fixture="context"
)

def cadastrando_entrega_no_banco(client, id: str, nomeProduto: str, quantidade: str, marca: str, tipoDoProduto: str, enderecoDeEntrega: str, preco: str, status: str, emailEntregador: str, context):
    response = client.post("/entregas", json={"id": id, "nomeProduto": nomeProduto, "quantidade": quantidade, "marca": marca, "tipoDoProduto": tipoDoProduto, "enderecoDeEntrega": enderecoDeEntrega, "preco": preco, "status": status, "emailEntregador":emailEntregador})
    context["response"] = response 
    return context


@then(parsers.cfparse('o código de status da resposta é "{status_code}"'
        ), 
    target_fixture="context"
)

def checandocodigodereposta(context, status_code: str):
    assert context["response"].status_code == int(status_code) # verifica se o código de status da resposta é 201
    return context

@then(parsers.cfparse('o JSON da resposta deve conter "{mensagem}"'
        ), 
    target_fixture="context"
)
def checkmensagem(context, mensagem: str):
    assert context["response"].json() == {"detail": mensagem}
    return context