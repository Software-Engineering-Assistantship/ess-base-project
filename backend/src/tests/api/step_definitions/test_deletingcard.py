from src.main import *
from pytest_bdd import scenario, given, when, then, parsers
import pytest


criar_banco()

@scenario(scenario_name="Deleting a credit card from the system", feature_name="../features/deletingcard.feature")
def test_deleting_credit_card():
    pass

@given(parsers.cfparse('There is a credit card in the system with "nome" equal to "{creditcard_name}", "numero_cartao" equal to "{creditcard_number}", "cvv" equal to {creditcard_cvv} and "validade" equal to "{creditcard_validity}"'))
def credit_card_in_system(client, creditcard_name: str, creditcard_number: str, creditcard_cvv: int, creditcard_validity: str):
    client.post("/cartoes", json={"nome": creditcard_name, "numero_cartao": creditcard_number, "cvv": creditcard_cvv, "validade": creditcard_validity})
    print(creditcard_name)
    print(creditcard_number)
    print(creditcard_cvv)
    print(creditcard_validity)

@when(parsers.cfparse('I make a "DELETE" request to "/cartoes/{creditcard_number}"'), target_fixture="make_delete_request_to_cartoes")
def make_delete_request_to_cartoes(client, creditcard_number: str):
    response = client.delete(f"/cartoes/{creditcard_number}")
    return response

@then(parsers.cfparse('I receive a response with status code "{status_code:d}"'))
def receive_response_with_status_code3(make_delete_request_to_cartoes, status_code: int):
    assert make_delete_request_to_cartoes.status_code == status_code

@then(parsers.cfparse('I receive a response with the message "{message}"'))
def receive_response_with_message3(make_delete_request_to_cartoes, message: str):
    assert make_delete_request_to_cartoes.json() == {"message": message}
    print(message)
    