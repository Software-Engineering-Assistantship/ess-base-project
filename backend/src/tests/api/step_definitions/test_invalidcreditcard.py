from src.main import *
from pytest_bdd import scenario, given, when, then, parsers
import pytest


criar_banco()

@scenario(scenario_name="Adding an invalid credit card to the system", feature_name="../features/invalidcard.feature")
def test_adding_invalid_card():
    pass

@given(parsers.cfparse('I want to add a credit card with "nome" as "{creditcard_name}", "numero_cartao" as {creditcard_number}, "cvv" as {creditcard_cvv} and "validade" as "{creditcard_validity}"'))
def cartao_existente():
    pass

@given(parsers.cfparse('There is a credit card in the system with "nome" equal to "{creditcard_name}", "numero_cartao" equal to {creditcard_number}, "cvv" equal to {creditcard_cvv} and "validade" equal to "{creditcard_validity}"'))
def coupon_in_system(client, creditcard_name: str, creditcard_number: str, creditcard_cvv: int, creditcard_validity: str):
    client.post("/cartoes", json={"nome": creditcard_name, "numero_cartao": creditcard_number, "cvv": creditcard_cvv, "validade": creditcard_validity})
    
@when(parsers.cfparse('I make a "POST" request to "/cartoes" with name "{creditcard_name}", "numero_cartao" equal to {creditcard_number}, "cvv" equal to {creditcard_cvv} and "validade" equal to "{creditcard_validity}"'), target_fixture="make_post_request_to_cartoes")
def make_post_request_to_cartoes(client, creditcard_name: str, creditcard_number: str, creditcard_cvv: int, creditcard_validity: str):
    response = client.post("/cartoes", json={"nome": creditcard_name, "numero_cartao": creditcard_number, "cvv": creditcard_cvv, "validade": creditcard_validity})
    return response

@then(parsers.cfparse('I receive a response with status code "{status_code:d}"'))
def receive_response_with_status_code(make_post_request_to_cartoes, status_code: int):
    assert make_post_request_to_cartoes.status_code == status_code

@then(parsers.cfparse('I receive a response with the message "{message}"'))
def receive_response_with_message(make_post_request_to_cartoes, message: str):
    assert make_post_request_to_cartoes.json() == {"detail": message}