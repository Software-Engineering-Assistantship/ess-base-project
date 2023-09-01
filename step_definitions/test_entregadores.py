from src.main import *
from pytest_bdd import scenario, given, when, then, parsers
import pytest




#---------- teste1

criar_banco()


@scenario(
    scenario_name="Cadastrar um novo entregador",
    feature_name="../features/entregadores.feature"
)
def test_cadastro_entregador(): # testar o cadastro bem sucedido de um entregador
    pass

@given(
    parsers.cfparse(
        'um entregador com email "{email}" ainda não foi cadastrado'
    )
)

def limpando_banco_entregadores(client, email: str):#caso ela exista, apagando do banco de dados
    response = client.delete(f"/entregadores/{email}")

@when(
    parsers.cfparse(
        'uma solicitação POST é feita para "{cad_entregador}" com email "{email}", nome "{nome}", cpf "{cpf}", telefone "{telefone}", veiculo "{veiculo}" e placa "{placa}"'
    ),
    target_fixture="context"
)

def cadastrando_entregador_no_banco(client, email: str, nome:str, cpf:str, telefone:str, veiculo:str, placa:str, context):
    response = client.post("/entregadores", json={"email": email, "nome": nome, "cpf": cpf, "telefone": telefone, "veiculo": veiculo, "placa": placa})
    context["response"] = response 
    return context


@then(parsers.cfparse('o código de status da resposta é "{status_code}"'
        ), 
    target_fixture="context"
)
def checandocodigodereposta(context, status_code: str):
    assert context["response"].status_code == int(status_code) # verifica se o código de status da resposta é 400
    return context

@then(parsers.cfparse('o JSON da resposta deve conter "{mensagem}"'
        ), 
    target_fixture="context"
)
def checkmensagem(context, mensagem: str):
    assert context["response"].json() == {"message": mensagem}
    return context







#---------- teste2

@scenario(
    scenario_name="Tentar cadastrar um entregador ja cadastrado",
    feature_name="../features/entregadores.feature"
)
def test_cadastro_entregador_ja_cadastrado(): # testar o cadastro mal sucedido de um entregador
    pass

@given(
    parsers.cfparse(
        'um entregador com email "{email}", nome "{nome}", cpf "{cpf}", telefone "{telefone}", veiculo "{veiculo}" e placa "{placa}" já está cadastrado'
    )
)

def criando_entregador_no_banco(client, email: str, nome: str, cpf: str, telefone: str, veiculo: str, placa: str):
    response = client.post("/entregadores", json={"email": email, "nome": nome, "cpf": cpf, "telefone": telefone, "veiculo": veiculo, "placa": placa})

@when(
    parsers.cfparse(
        'uma solicitação POST é feita para "{cad_entregador}" com email "{email}", nome "{nome}", cpf "{cpf}", telefone "{telefone}", veiculo "{veiculo}" e placa "{placa}"'
    ),
    target_fixture="context"
)

def tentando_cadastrar_novamente(client, email: str, nome: str, cpf: str, telefone: str, veiculo: str, placa: str, context):
    response = client.post("/entregadores", json={"email": email, "nome": nome, "cpf": cpf, "telefone": telefone, "veiculo": veiculo, "placa": placa})
    context["response"] = response 
    return context


@then(parsers.cfparse('o código de status da resposta é "{status_code}"'
        ), 
    target_fixture="context"
)
def checandocodigodereposta(context, status_code: str):
    assert context["response"].status_code == int(status_code) # verifica se o código de status da resposta é 400
    return context

@then(parsers.cfparse('o JSON da resposta deve conter "{mensagem}"'
        ), 
    target_fixture="context"
)
def checkmensagem(context, mensagem: str):
    assert context["response"].json() == {"detail": mensagem}
    return context






# #---------- teste3

# @scenario(scenario_name="Deletar um cadastro de um entregador", feature_name="../features/entregadores.feature")

# def test_deletando_entregador():
#     pass

# @given(parsers.cfparse('um entregador com email "{email}", nome "{nome}", cpf "{cpf}", telefone "{telefone}", veiculo "{veiculo}" e placa "{placa}" já está cadastrado'))

# def entregador_em_bd(client, email: str, nome: str, cpf: str, telefone: str, veiculo: str, placa: str):
#     client.post("/entregadores", json={"email": email, "nome": nome, "cpf": cpf, "telefone": telefone, "veiculo": veiculo, "placa": placa})

# @when(parsers.cfparse('uma solicitação DELETE é feita para "/entregadores/{email}" com email "{email}", nome "{nome}", cpf "{cpf}", telefone "{telefone}", veiculo "{veiculo}" e placa "{placa}"'), target_fixture="deletar_entregador")
# def deletar_entregador(client, email: str):
#     response = client.delete(f"/entregadores/{email}")
#     return response

# @then(parsers.cfparse('o código de status da resposta é "{status_code:d}"'))
# def checandocodigodereposta3(deletar_entregador, status_code: int):
#     assert deletar_entregador.status_code == status_code

# @then(parsers.cfparse('o JSON da resposta deve conter "{message}"'))
# def checkmensagem3(deletar_entregador, message: str):
#     assert deletar_entregador.json() == {"detail": message}
#     Base.metadata.drop_all(bind=engine, tables=Base.metadata.tables.values(), checkfirst=True)
