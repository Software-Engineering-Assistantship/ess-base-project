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
                "timestamp": datetime(2021, 8, 15, 21, 34, 56, tzinfo=timezone.utc),
            },
            {
                "title": "Review 2",
                "description": "Description 2",
                "rating": 4,
                "timestamp": datetime(2023, 2, 14, 11, 12, 13, tzinfo=timezone.utc),
            },
            {
                "title": "Review 3",
                "description": "Description 3",
                "rating": 3,
                "timestamp": datetime(2022, 5, 19, 19, 15, 22, tzinfo=timezone.utc),
            },
        ]

        response = client.get("/reviews")

    assert response.status_code == 200
    assert response.json() == [
        {
            "title": "Review 1",
            "description": "Description 1",
            "rating": 5,
            "timestamp": "2021-08-15T21:34:56Z",
        },
        {
            "title": "Review 2",
            "description": "Description 2",
            "rating": 4,
            "timestamp": "2023-02-14T11:12:13Z",
        },
        {
            "title": "Review 3",
            "description": "Description 3",
            "rating": 3,
            "timestamp": "2022-05-19T19:15:22Z",
        },
    ]