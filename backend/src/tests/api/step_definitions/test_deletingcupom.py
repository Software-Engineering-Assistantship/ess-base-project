from src.main import *
from pytest_bdd import scenario, given, when, then, parsers
import pytest


criar_banco()

@scenario(scenario_name="Deleting a coupon from the system", feature_name="../features/deletingcoupon.feature")
def test_deleting_coupon():
    pass

@given(parsers.cfparse('There is a coupon in the system with "nome" equal to "{coupon_name}", "desconto" equal to {coupon_discount}'))
def coupon_in_system(client, coupon_name: str, coupon_discount: int):
    client.post("/cupom", json={"nome": coupon_name, "desconto": coupon_discount})

@when(parsers.cfparse('I make a "DELETE" request to "/cupom/{coupon_name}"'), target_fixture="make_delete_request_to_coupon")
def make_delete_request_to_coupon(client, coupon_name: str):
    response = client.delete(f"/cupom/{coupon_name}")
    return response

@then(parsers.cfparse('I receive a response with status code "{status_code:d}"'))
def receive_response_with_status_code3(make_delete_request_to_coupon, status_code: int):
    assert make_delete_request_to_coupon.status_code == status_code

@then(parsers.cfparse('I receive a response with the message "{message}"'))
def receive_response_with_message3(make_delete_request_to_coupon, message: str):
    assert make_delete_request_to_coupon.json() == {"message": message}
    print(message)


