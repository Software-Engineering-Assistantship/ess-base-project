from fastapi.testclient import TestClient
from src.db import database as db
from datetime import datetime, timezone
from unittest.mock import patch

def test_get_reviews(client: TestClient):
    with patch.object(db, "get_all_items") as mock_get_all_items:
        mock_get_all_items.return_value = [
            {
                "title": "Review 1",
                "description": "Description 1",
                "rating": 5,
                "author": "Author 1",
                "song": "Song 1",
                # "timestamp": datetime(2021, 8, 15, 21, 34, 56, tzinfo=timezone.utc),
            },
            {
                "title": "Review 2",
                "description": "Description 2",
                "rating": 4,
                "author": "Author 2",
                "song": "Song 2",
                # "timestamp": datetime(2023, 2, 14, 11, 12, 13, tzinfo=timezone.utc),
            },
            {
                "title": "Review 3",
                "description": "Description 3",
                "rating": 3,
                "author": "Author 3",
                "song": "Song 3",
                # "timestamp": datetime(2022, 5, 19, 19, 15, 22, tzinfo=timezone.utc),
            },
        ]

        response = client.get("/reviews")

    assert response.status_code == 200
    assert response.json() == { "reviews": [
            {
                "title": "Review 1",
                "description": "Description 1",
                "rating": 5,
                "author": "Author 1",
                "song": "Song 1",
            },
            {
                "title": "Review 2",
                "description": "Description 2",
                "rating": 4,
                "author": "Author 2",
                "song": "Song 2",
            },
            {
                "title": "Review 3",
                "description": "Description 3",
                "rating": 3,
                "author": "Author 3",
                "song": "Song 3",
            },
        ]
    }
