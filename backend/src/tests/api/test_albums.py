from fastapi.testclient import TestClient
from src.db import database as db
from datetime import datetime, timezone
from unittest.mock import patch

def test_get_albums(client: TestClient):
    with patch.object(db, "get_all_items") as mock_get_all_items:
        mock_get_all_items.return_value = [
            {
                "id": 1,
                "title": "Album 1",
                "artist": "Artist 1",
                "release_date": datetime(2021, 8, 15, 0, 0, tzinfo=timezone.utc),
                "created_date": datetime(2021, 8, 10, 0, 0, tzinfo=timezone.utc),
            },
            {
                "id": 2,
                "title": "Album 2",
                "artist": "Artist 2",
                "release_date": datetime(2022, 4, 25, 0, 0, tzinfo=timezone.utc),
                "created_date": datetime(2022, 4, 20, 0, 0, tzinfo=timezone.utc),
            },
        ]

        response = client.get("/albums")

    assert response.status_code == 200
    assert response.json() == [
        {
            "id": 1,
            "title": "Album 1",
            "artist": "Artist 1",
            "release_date": "2021-08-15T00:00:00Z",
            "created_date": "2021-08-10T00:00:00Z",
        },
        {
            "id": 2,
            "title": "Album 2",
            "artist": "Artist 2",
            "release_date": "2022-04-25T00:00:00Z",
            "created_date": "2022-04-20T00:00:00Z",
        },
    ]
