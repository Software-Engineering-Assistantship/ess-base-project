from fastapi.testclient import TestClient
from src.main import app  # Importe a instância da aplicação FastAPI
from unittest.mock import MagicMock
from src.service.impl.song_service import SongService

client = TestClient(app)


def test_search_songs_by_genre_existent_search():
    # Dado que o db retorna as músicas "Lover", "Vampire" e "August" pelo gênero "Pop"
    SongService.get_by_genre = MagicMock(return_value={
        "songs": [
            {"title": "Lover", "artist": "Taylor Swift",
                "genre": "Pop", "release_year": 2020, "id": "x1"},
            {"title": "Vampire", "artist": "John Doe",
                "genre": "Pop", "release_year": 2020, "id": "x2"}
        ]
    })

    SongService.get_songs = MagicMock(return_value={
        "songs": [
            {"title": "Lover", "artist": "Taylor Swift",
                "genre": "Pop", "release_year": 2020, "id": "x1"},
            {"title": "Vampire", "artist": "John Doe",
                "genre": "Pop", "release_year": 2020, "id": "x2"},
            {"title": "August", "artist": "Taylor Swift",
                "genre": "Rock", "release_year": 2020, "id": "x3"}
        ]
    })
    # Quando uma requisição "GET" for enviada para "/search" com o parâmetro de consulta "genre" definido como "Pop"
    response = client.get("/search/search?genre=Pop")

    # Então o status da resposta deve ser "200"
    assert response.status_code == 200

    # E o JSON da resposta deve conter uma lista de músicas do gênero "Pop", "release_year": "2020" com os nomes "Lover", "Vampire" e "August"
    expected_json = {
        "songs": [
            {"title": "Lover", "artist": "Taylor Swift",
                "genre": "Pop", "release_year": 2020, "id": "x1", "popularity": None},
            {"title": "Vampire", "artist": "John Doe",
                "genre": "Pop", "release_year": 2020, "id": "x2", "popularity": None}
        ],
        "albums": []
    }

    assert response.json() == expected_json


def test_search_songs_by_year_existent_search():
    # Dado que o SongService retorna as músicas "Lover", "Vampire" e "August" pelo ano "2020"
    SongService.get_by_year = MagicMock(return_value={
        "songs": [
            {"title": "Lover", "artist": "Taylor Swift",
                "genre": "Pop", "release_year": 2020, "id": "x1",  "popularity": None},
            {"title": "Vampire", "artist": "John Doe",
                "genre": "Pop", "release_year": 2020, "id": "x2",  "popularity": None}
        ]
    })
    SongService.get_songs = MagicMock(return_value={
        "songs": [
            {"title": "Lover", "artist": "Taylor Swift",
                "genre": "Pop", "release_year": 2020, "id": "x1",  "popularity": None},
            {"title": "Vampire", "artist": "John Doe",
                "genre": "Pop", "release_year": 2020, "id": "x2",  "popularity": None},
            {"title": "August", "artist": "Taylor Swift",
                "genre": "Rock", "release_year": 2019, "id": "x3",  "popularity": None}
        ]
    })
    # Quando uma requisição "GET" for enviada para "/search" com o parâmetro de consulta "year" definido como "2020"
    response = client.get("/search/search?year=2020")

    # Então o status da resposta deve ser "200"
    assert response.status_code == 200

    # E o JSON da resposta deve conter uma lista de músicas do ano "2020" com os nomes "Lover", "Vampire" e "August"
    expected_json = {
        "songs": [
            {"title": "Lover", "artist": "Taylor Swift",
                "genre": "Pop", "release_year": 2020, "id": "x1",  "popularity": None},
            {"title": "Vampire", "artist": "John Doe",
                "genre": "Pop", "release_year": 2020, "id": "x2",  "popularity": None}
        ],
        "albums": []
    }

    assert response.json() == expected_json


def test_search_songs_by_name_existent_search():
    # Dado que o SongService retorna as músicas "Lover", "Vampire" e "August" pelo ano "2020"
    SongService.gey_songs_by_name = MagicMock(return_value={
        "songs": [
            {"title": "Lover", "artist": "Taylor Swift",
                "genre": "Pop", "release_year": 2020, "id": "x1",  "popularity": None},
            {"title": "Lover", "artist": "John Doe",
                "genre": "Pop", "release_year": 2077, "id": "x2",  "popularity": None},
        ]
    })

    SongService.get_songs = MagicMock(return_value={
        "songs": [
            {"title": "Lover", "artist": "Taylor Swift",
                "genre": "Pop", "release_year": 2020, "id": "x1",  "popularity": None},
            {"title": "Lover", "artist": "John Doe",
                "genre": "Pop", "release_year": 2077, "id": "x2",  "popularity": None},
            {"title": "August", "artist": "Taylor Swift",
                "genre": "Rock", "release_year": 2019, "id": "x3",  "popularity": None}
        ]
    })

    # Quando uma requisição "GET" for enviada para "/search" com o parâmetro de consulta "year" definido como "2020"
    response = client.get("/search/search?name=Lover")

    # Então o status da resposta deve ser "200"
    assert response.status_code == 200

    # E o JSON da resposta deve conter uma lista de músicas do ano "2020" com os nomes "Lover", "Vampire" e "August"
    expected_json = {
        "songs": [
            {"title": "Lover", "artist": "Taylor Swift",
                "genre": "Pop", "release_year": 2020, "id": "x1",  "popularity": None},
            {"title": "Lover", "artist": "John Doe",
                "genre": "Pop", "release_year": 2077, "id": "x2",  "popularity": None}
        ],
        "albums": []
    }

    assert response.json() == expected_json


def test_search_songs_by_name_and_year_and_genre_existent_search():

    SongService.gey_songs_by_name = MagicMock(return_value={
        "songs": [
            {"title": "Lover", "artist": "Taylor Swift",
                "genre": "Pop", "release_year": 2020, "id": "x1",  "popularity": None},
            {"title": "Lover", "artist": "John Doe",
                "genre": "Pop", "release_year": 2077, "id": "x2",  "popularity": None},
            {"title": "Lover", "artist": "Mila",
             "genre": "Trap", "release_year": 2077, "id": "x3",  "popularity": None},
        ]
    })
    SongService.get_by_year = MagicMock(return_value={
        "songs": [
            {"title": "Lover", "artist": "John Doe",
                "genre": "Pop", "release_year": 2077, "id": "x2",  "popularity": None},
            {"title": "Lover", "artist": "Mila",
                "genre": "Trap", "release_year": 2077, "id": "x3",  "popularity": None},
        ]
    })

    SongService.get_by_genre = MagicMock(return_value={
        "songs": [
            {"title": "Lover", "artist": "Mila",
                "genre": "Trap", "release_year": 2077, "id": "x3",  "popularity": None},
        ]
    })

    SongService.get_songs = MagicMock(return_value={
        "songs": [
            {"title": "Lover", "artist": "Taylor Swift",
                "genre": "Pop", "release_year": 2020, "id": "x1",  "popularity": None},
            {"title": "Lover", "artist": "John Doe",
                "genre": "Pop", "release_year": 2077, "id": "x2",  "popularity": None},
            {"title": "Lover", "artist": "Mila",
                "genre": "Trap", "release_year": 2077, "id": "x3",  "popularity": None},
            {"title": "August", "artist": "Taylor Swift",
                "genre": "Rock", "release_year": 2019, "id": "x4",  "popularity": None},
            {"title": "August", "artist": "Taylor Swift",
                "genre": "Rock", "release_year": 2019, "id": "x5",  "popularity": None},
            {"title": "the devil in i", "artist": "Slipknot", "genre": "Rock",
                "release_year": 2014, "id": "x9", "popularity": None},
            {"title": "The sound of silence", "artist": "Disturbed",
                "genre": "Rock", "release_year": 2015, "id": "x6", "popularity": None}
        ]
    })

    response = client.get("/search/search?name=Love&year=2077&genre=Trap")

    # Então o status da resposta deve ser "200"
    assert response.status_code == 200

    expected_json = {
        "songs": [
            {"title": "Lover", "artist": "Mila",
                "genre": "Trap", "release_year": 2077, "id": "x3",  "popularity": None},
        ],
        "albums": []
    }

    assert response.json() == expected_json
