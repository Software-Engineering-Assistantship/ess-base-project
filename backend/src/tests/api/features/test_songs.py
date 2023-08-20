from fastapi.testclient import TestClient
from src.db import database as db
from unittest.mock import patch

def test_get_top_rated_songs(client: TestClient):
    # Iremos supor que temos 5 músicas no banco de dados, cada uma com uma avaliação média.
    mock_top_rated_songs = ["Song1", "Song2", "Song3", "Song4", "Song5"]

    with patch.object(db, "highlighted") as mock_get_top_rated:
        # A função mock retornará a lista de músicas mais bem avaliadas.
        mock_get_top_rated.return_value = mock_top_rated_songs

        # Iremos realizar a requisição para a rota que retorna as músicas mais bem avaliadas.
        response = client.get("/songs/get_highlighted")

    # Print debugging information
    print(f"Response Status: {response.status_code}")
    print(f"Response Content: {response.content.decode('utf-8')}")

    # Verificamos se a resposta está correta.
    assert response.status_code == 200
    assert response.json() == {"songs": mock_top_rated_songs}
