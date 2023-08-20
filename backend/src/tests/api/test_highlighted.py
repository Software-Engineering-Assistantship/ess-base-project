import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch
from src.main import app
from src.api import db  # Assuming you have a db module handling database operations

client = TestClient(app)

def test_get_top_rated_songs():
    # Mock data to simulate what your DB would return for top rated songs
    mock_top_rated_songs = ["Song1", "Song2", "Song3", "Song4", "Song5"]

    # Use patch to mock the database call
    with patch.object(db, "get_top_rated_songs") as mock_get_top_rated:
        # When the function get_top_rated_songs is called within the context of this test,
        # it will return mock_top_rated_songs instead of actually querying the DB
        mock_get_top_rated.return_value = mock_top_rated_songs

        # Make a request to the endpoint
        response = client.get("/songs/highlighted")

        # Assertions
        assert response.status_code == 200
        assert response.json() == {"songs": mock_top_rated_songs}
