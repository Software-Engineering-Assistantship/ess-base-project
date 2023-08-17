from src.schemas.response import HTTPResponses, HttpResponseModel
from pytest_bdd import parsers, given, when, then, scenario
from src.service.impl.item_service import ItemService
from src.tests.api.utils.utils import get_response_items_list, req_type_to_function
from sqlalchemy.orm import Session
from src.main import criar_banco, RepositorioCartao, cartao_credito, SessionLocal
from fastapi import Depends, status, FastAPI

app = FastAPI()

# Function to create the database tables
criar_banco()

# Dependency to get a database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get('/cartoes', response_model=list[cartao_credito], status_code=status.HTTP_200_OK)
def acessar_cartoes(db: Session = Depends(get_db)):
    repo = RepositorioCartao(db)
    cartoes = repo.relatorio()
    return cartoes

""" Scenario: Obter item por ID """

# Step definitions for the "Read the full registry of credit cards" scenario
@given(parsers.cfparse('the "relatorio" method of RepositorioCartao is called and returns a list of credit cards'))
def mock_repositorio_cartao_relatorio_method():
    """
    Mock the relatorio method of RepositorioCartao to return a list of credit cards
    """
    session = SessionLocal()
    mock_cards = [
        cartao_credito(nome="Card 1", numero_cartao="1111-1111-1111-1111", cvv=123, validade="12/25"),
        cartao_credito(nome="Card 2", numero_cartao="2222-2222-2222-2222", cvv=456, validade="06/28")
    ]
    session.add_all(mock_cards)
    session.commit()

    RepositorioCartao.relatorio = lambda self: session.query(cartao_credito).all()


@when(parsers.cfparse('the "GET" request is made to "{req_url}"'))
def send_get_request_to_endpoint(client, req_url: str):
    """
    Send a "GET" request to the given endpoint
    """
    response = client.get(req_url)
    return {"response": response}


@then(parsers.cfparse('the server returns a list of credit cards'))
def check_server_response_is_list_of_credit_cards(context):
    """
    Check if the server response is a list of credit cards
    """
    response = context["response"]
    assert response.status_code == status.HTTP_200_OK
    assert isinstance(response.json(), list)

    # You can also add more detailed assertions here based on your response structure

    return context