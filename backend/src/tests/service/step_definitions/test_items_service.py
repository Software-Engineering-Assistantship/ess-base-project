from src.schemas.response import HTTPResponses, HttpResponseModel
from pytest_bdd import parsers, given, when, then, scenario
from src.service.impl.item_service import ItemService

""" Scenario: Obter item por ID """
# This method is used to define the scenario name and feature file path
@scenario(scenario_name="Obter item por ID", feature_name="../features/items-service.feature")
def test_service_get_item():
    """ Get item by id """

# Step definitions for the "Obter item por ID" scenario
@given(parsers.cfparse(
    'o método getItem do ItemService retorna um item de nome "{item_name}" e id "{item_id}"'))
def mock_item_service(item_id: str, item_name: str):
    """
    Mock the ItemService.get_item() method to return an item with the given id and name
    """

    ItemService.get_item = lambda id : HttpResponseModel(
        message=HTTPResponses.ITEM_FOUND().message,
        status_code=HTTPResponses.ITEM_FOUND().status_code,
        data={"id": item_id, "name": item_name}
    )

@when(
    parsers.cfparse('o método getItem do ItemService for chamado com o id "{item_id}"'), 
    target_fixture="context"
)
def get_item(context, item_id: str):
    context['item'] = ItemService.get_item(item_id)
    return context

@then(
    parsers.cfparse('o item retornado deve ter o nome "{item_name}" e id "{item_id}"'), 
    target_fixture="context"
)
def check_received_item(context, item_name: str, item_id: str):
    assert context['item'].data.name == item_name
    assert context['item'].data.id == item_id

    return context

""" Scenario: Obter todos os itens """

@scenario(scenario_name="Obter todos os itens", feature_name="../features/items-service.feature")
def test_service_get_items():
    """ Get all items """

# Step definitions for the "Obter todos os itens" scenario
@given(parsers.cfparse(
    'o método getItems do ItemService retorna um array com o item de nome "{item_name}" e id "{item_id}"'))
def mock_item_service_list(item_name: str, item_id: str):

    ItemService.get_items = lambda: HttpResponseModel(
        message=HTTPResponses.ITEM_FOUND().message,
        status_code=HTTPResponses.ITEM_FOUND().status_code,
        data={
            'items': [{"id": item_id, "name": item_name}]
        }
    )

@when(
    parsers.cfparse('o método getItems do ItemService for chamado'),
    target_fixture="context"
)
def get_service_items(context):
    context['items'] = ItemService.get_items()
    return context

@then(
    parsers.cfparse('o item retornado deve ter o nome "{item_name}" e id "{item_id}"'), 
    target_fixture="context"
)
def check_service_list(context, item_id: str, item_name: str):
    """
    Check if the item with the given id and name is in the response list
    """

    assert [{"id": item_id, "name": item_name}] == context['items'].data['items']

    return context