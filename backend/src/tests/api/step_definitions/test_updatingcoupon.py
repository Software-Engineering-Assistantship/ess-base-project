from src.main import *
from pytest_bdd import scenario, given, when, then, parsers
import pytest

criar_banco()

@scenario(scenario_name="Updating a coupon in the system", feature_name="../features/updatingcoupon.feature")
def test_updating_coupon():
    pass

@given(parsers.cfparse('there is a coupon in the system with "nome" equal to "{coupon_name}", "desconto" equal to {coupon_discount}'))
def coupon_in_system_put(client, coupon_name: str, coupon_discount: int):
    client.post("/cupom", json={"nome": coupon_name, "desconto": coupon_discount})

@when(parsers.cfparse('I make a "PUT" request to "/cupom/{coupon_name}" with name "{coupon_name}" and discount "{coupon_discount}"'), target_fixture="make_put_request_to_coupon")
def make_put_request_to_coupon(client, coupon_name: str, coupon_discount: int):
    response = client.put(f"/cupom/{coupon_name}", json={"nome": coupon_name, "desconto": coupon_discount })
    return response

@then(parsers.cfparse('I receive a response with status code "{status_code:d}"'))
def receive_response_with_status_code4(make_put_request_to_coupon, status_code: int):
    assert make_put_request_to_coupon.status_code == status_code

@then(parsers.cfparse('I receive a response with the message "{message}"'))
def receive_response_with_message4(make_put_request_to_coupon, message: str):
    assert make_put_request_to_coupon.json() == {"message": message}
    print(message)