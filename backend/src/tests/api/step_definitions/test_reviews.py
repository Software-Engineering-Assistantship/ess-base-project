from fastapi.testclient import TestClient
from src.db import database as db
from datetime import datetime, timezone
from unittest.mock import patch, MagicMock
from src.service.impl.review_service import ReviewService

# Your existing test code...

def test_get_reviews(client: TestClient):

    mock_get_all_items = [
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

    ReviewService.get_reviews = MagicMock(return_value=mock_get_all_items)
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

def test_get_reviews_empty_list(client: TestClient):
    ReviewService.get_reviews = MagicMock(return_value=[])  # Simulate empty list
    response = client.get("/reviews")

    assert response.status_code == 200
    assert response.json() == { "reviews": [] }
