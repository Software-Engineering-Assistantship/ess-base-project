from src.main import *
from pytest_bdd import scenario, given, when, then, parsers
import pytest


criar_banco()


@scenario(scenario_name="Adding an invalid discount coupon to the system", feature_name="../features/invalidcupom.feature")
def test_adding_invalid_coupon():
    pass

@given(parsers.cfparse('I want to add a discount coupon with "nome" as "{cupom_nome}" and "desconto" as {cupom_desconto}'))
def erro_encontrado():
    pass

@given(parsers.cfparse('There is a coupon in the system with "nome" equal to "{cupom_nome}" and "desconto" equal to {cupom_desconto}'))
def coupon_in_system(client, cupom_nome: str, cupom_desconto: int):
    client.post("/cupom", json={"nome": cupom_nome, "desconto": cupom_desconto})
    
@when(parsers.cfparse('I make a "POST" request to "/cupom with name "{cupom_nome}" and discount "{cupom_desconto}"'), target_fixture="make_post_request_to_coupon")
def make_post_request_to_coupon(client, cupom_nome: str, cupom_desconto: int):
    response = client.post("/cupom", json={"nome": cupom_nome, "desconto": cupom_desconto})
    client.delete(f"/cupom/{cupom_nome}")
    return response

@then(parsers.cfparse('I receive a response with status code "{status_code:d}"'))
def receive_response_with_status_code(make_post_request_to_coupon, status_code: int):
    assert make_post_request_to_coupon.status_code == status_code

@then(parsers.cfparse('I receive a response with the message "{message}"'))
def receive_response_with_message(make_post_request_to_coupon, message: str):
    assert make_post_request_to_coupon.json() == {"detail": message}
    