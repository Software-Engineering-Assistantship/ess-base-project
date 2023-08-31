from src.main import *
from pytest_bdd import scenario, given, when, then, parsers
import pytest


criar_banco()

@scenario(scenario_name="Updating a credit card in the system", feature_name="../features/updatingcreditcard.feature")
def test_updating_card():
    pass

@given(parsers.cfparse('There is a credit card in the system with "nome" equal to "{creditcard_name}", "numero_cartao" equal to {creditcard_number}, "cvv" equal to {creditcard_cvv} and "validade" equal to "{creditcard_validity}"'))
def card_in_system_put(client, creditcard_name: str, creditcard_number: str, creditcard_cvv: int, creditcard_validity: str):
    client.post("/cartoes", json={"nome": creditcard_name, "numero_cartao": creditcard_number, "cvv": creditcard_cvv, "validade": creditcard_validity})

@when(parsers.cfparse('I make a "PUT" request to "/cartoes/{creditcard_number}" with "nome" equal to "{creditcard_name}", "numero_cartao" equal to {creditcard_number}, "cvv" equal to {creditcard_cvv} and "validade" equal to "{creditcard_validity}"'), target_fixture="make_put_request_to_cartoes")
def make_put_request_to_cartoes(client, creditcard_name: str, creditcard_number: str, creditcard_cvv: int, creditcard_validity: str):
    response = client.put(f"/cartoes/{creditcard_number}", json={"nome": creditcard_name, "numero_cartao": creditcard_number, "cvv": creditcard_cvv, "validade": creditcard_validity})
    return response

@then(parsers.cfparse('I receive a response with status code "{status_code:d}"'))
def receive_response_with_status_code5(make_put_request_to_cartoes, status_code: int):
    assert make_put_request_to_cartoes.status_code == status_code

@then(parsers.cfparse('I receive a response with the message "{message}"'))
def receive_response_with_message5(make_put_request_to_cartoes, message: str):
    assert make_put_request_to_cartoes.json() == {"message": message}
    print(message)


