from src.main import *
from pytest_bdd import scenario, given, when, then, parsers
import pytest

criar_banco()

@scenario(scenario_name="Getting coupons from the system", feature_name="../features/gettingcupons.feature")
def test_getting_coupons():
    pass

@given(parsers.cfparse('There is a coupon in the system with "nome" equal to "{coupon_name}", "desconto" equal to {coupon_discount} and another coupon with "nome" equal to "{coupon_name2}", "desconto" equal to {coupon_discount2}'))
def getting_coupon_in_system(client, coupon_name: str, coupon_discount: int, coupon_name2: str, coupon_discount2: int):
    client.post("/cupom", json={"nome": coupon_name, "desconto": coupon_discount})
    client.post("/cupom", json={"nome": coupon_name2, "desconto": coupon_discount2})

@when(parsers.cfparse('I make a "GET" request to "/cupom"'), target_fixture="make_get_request_to_cupom")
def make_get_request_to_cupom(client):
    response = client.get("/cupom")
    return response

@then(parsers.cfparse('I receive a response with status code "{status_code:d}"'))
def receive_response_with_status_code7(make_get_request_to_cupom, status_code: int):
    assert make_get_request_to_cupom.status_code == status_code

@then(parsers.cfparse('I receive a response with the message {message}'))
def receive_response_with_message7(make_get_request_to_cupom, message: str):
    assert f"{make_get_request_to_cupom.json()}" == message
