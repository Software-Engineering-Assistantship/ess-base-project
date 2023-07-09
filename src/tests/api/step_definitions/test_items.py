from src.schemas.response import HTTPResponses, HttpResponseModel
from pytest_bdd import parsers, given, when, then, scenario
from src.service.impl.item_service import ItemService
from src.tests.api.utils.utils import get_response_items_list, req_type_to_function

""" Scenario: Obter item por ID """

# This method is used to define the scenario name and feature file path
@scenario(scenario_name="Obter item por ID", feature_name="../features/items.feature")
def test_get_item():
    """ Get item by id """
 
"""
Note:
    In the following step definitions, the parsers.cfparse() method is used to parse 
    the step definition strings. It is important to know that without this parse, 
    the step definitions will not be recognized by pytest-bdd.
"""

# Step definitions for the "Obter item por ID" scenario
@given(parsers.cfparse('o ItemService retorna um item com id "{item_id}" e nome "{item_name}"'))
def mock_item_service_response(item_id: str, item_name: str):
    """
    Mock the ItemService.get_item() method to return an item with the given id and name
    """
    
    ItemService.get_item = lambda id : HttpResponseModel(
        message=HTTPResponses.ITEM_FOUND().message,
        status_code=HTTPResponses.ITEM_FOUND().status_code,
        data={"id": item_id, "name": item_name}
    )
    

@when(parsers.cfparse('uma requisição "{req_type}" for enviada para "{req_url}"'), target_fixture="context")
def send_get_item_request(client, context, req_type: str, req_url: str):
    """
    Send a request to the given URL using the given request type
    """
    
    response = req_type_to_function(client, req_type)(req_url)
    context["response"] = response
    return context

@then(parsers.cfparse('o status da resposta deve ser "{status_code}"'), target_fixture="context")
def check_response_status_code(context, status_code: str):
    """
    Check if the response status code is the expected
    """
    
    assert context["response"].status_code == int(status_code)
    return context

@then(parsers.cfparse('o JSON da resposta deve conter id "{item_id}" e nome "{item_name}"'), target_fixture="context")
def check_response_json_contains_item_data(context, item_id: str, item_name: str):
    """
    Check if the response JSON contains the item id and name
    """
    
    expected_data = {
        "id": item_id,
        "name": item_name
    }
    assert context["response"].json()["data"] == expected_data
    return context


""" Scenario: Obter todos os itens """

@scenario(scenario_name="Obter todos os itens", feature_name="../features/items.feature")
def test_get_items():
    """ Get all items """

# Step definitions for the "Obter todos os itens" scenario
@given(parsers.cfparse('o ItemService retorna uma lista de itens'))
def mock_item_service_response_list():
    """
    Mock the ItemService.get_items() method to return a list of items
    """
    ItemService.get_items = lambda: HttpResponseModel(
        message=HTTPResponses.ITEM_FOUND().message,
        status_code=HTTPResponses.ITEM_FOUND().status_code,
        data={
            'items': [
                {"id": "123", "name": "Exemplo de Item"},
                {"id": "456", "name": "Outro Item"}
            ]
        }
    )

@then(parsers.cfparse('o item com id "{item_id}" e nome "{item_name}" está na lista'), target_fixture="context")
@given(parsers.cfparse('o item com id "{item_id}" e nome "{item_name}" está na lista'), target_fixture="context")
def check_item_is_in_list(context, item_id: str, item_name: str):
    """
    Check if the item with the given id and name is in the response list
    """
    items = get_response_items_list(context["response"])

    assert {"id": item_id, "name": item_name} in items
    
    return context

@then(parsers.cfparse('o JSON da resposta deve ser uma lista de itens'), target_fixture="context")
def check_response_json_is_an_item_list(context):
    """
    Check if the response JSON is a list of items
    """

    items = get_response_items_list(context["response"])

    assert isinstance(items, list)
    for item in items:
        assert isinstance(item, dict)
        assert "name" in item and isinstance(item["name"], str)
        assert "id" in item and isinstance(item["id"], str)

    return context