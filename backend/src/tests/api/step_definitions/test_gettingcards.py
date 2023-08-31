from src.main import *
from pytest_bdd import scenario, given, when, then, parsers
import pytest

criar_banco()

@scenario(scenario_name="Getting cards from the system", feature_name="../features/gettingcreditcard.feature")
def test_getting_card():
    pass

@given(parsers.cfparse('There is a credit card in the system with "nome" equal to "{creditcard_name}", "numero_cartao" equal to {creditcard_number}, "cvv" equal to {creditcard_cvv} and "validade" equal to "{creditcard_validity}" and another credit card with "nome" equal to "{creditcard_name2}", "numero_cartao" equal to {creditcard_number2}, "cvv" equal to {creditcard_cvv2} and "validade" equal to "{creditcard_validity2}"'))
def getting_cards_in_system(client, creditcard_name: str, creditcard_number: str, creditcard_cvv: int, creditcard_validity: str, creditcard_name2: str, creditcard_number2: str, creditcard_cvv2: int, creditcard_validity2: str):
    client.post("/cartoes", json={"nome": creditcard_name, "numero_cartao": creditcard_number, "cvv": creditcard_cvv, "validade": creditcard_validity})
    client.post("/cartoes", json={"nome": creditcard_name2, "numero_cartao": creditcard_number2, "cvv": creditcard_cvv2, "validade": creditcard_validity2})

@when(parsers.cfparse('I make a "GET" request to "/cartoes"'), target_fixture="make_get_request_to_cartoes")
def make_get_request_to_cartoes(client):
    response = client.get(f"/cartoes")
    return response

@then(parsers.cfparse('I receive a response with status code "{status_code:d}"'))
def receive_response_with_status_code6(make_get_request_to_cartoes, status_code: int):
    assert make_get_request_to_cartoes.status_code == status_code

@then(parsers.cfparse('I receive a response with the message {message}'))
def receive_response_with_message6(make_get_request_to_cartoes, message: str):
    print(make_get_request_to_cartoes.json())
    print(message)
    assert f"{make_get_request_to_cartoes.json()}" == message

