from fastapi.testclient import TestClient
from src.main import app  # Importe a instância da aplicação FastAPI
from unittest.mock import MagicMock
from src.service.impl.song_service import SongService

client = TestClient(app)

def test_buscar_musicas_por_genero_existente():
    # Dado que o SongService retorna as músicas "Lover", "Vampire" e "August"
    SongService.get_by_genre= MagicMock(return_value={
        "songs": [
            {"title": "Lover", "artist": "Taylor Swift", "genre": "Pop", "release_year": 2020},
            {"title": "Vampire", "artist": "John Doe", "genre": "Pop", "release_year": 2020},
            {"title": "August", "artist": "Taylor Swift", "genre": "Pop", "release_year": 2020}
        ]
    })

    # Quando uma requisição "GET" for enviada para "/songs/songs_by_genre" com o parâmetro de consulta "genre" definido como "Pop"
    response = client.get("/songs/songs_by_genre/Pop")
    print(response.json())

    # Então o status da resposta deve ser "200"
    assert response.status_code == 200

    # E o JSON da resposta deve conter uma lista de músicas do gênero "Pop", "release_year": "2020" com os nomes "Lover", "Vampire" e "August"
    expected_json = {
        "songs": [
            {"title": "Lover", "artist": "Taylor Swift", "genre": "Pop", "release_year": 2020},
            {"title": "Vampire", "artist": "John Doe", "genre": "Pop", "release_year": 2020},
            {"title": "August", "artist": "Taylor Swift", "genre": "Pop", "release_year": 2020}
        ]
    }
    print(expected_json)
    assert response.json() == expected_json


def test_buscar_musicas_por_ano_de_lancamento():
    # Dado que o SongService retorna as músicas "Lover" e "Cruel Summer" para o ano de lançamento 2019

    SongService.get_by_release_year = MagicMock(return_value={
        "songs": [
            {"title": "Lover", "artist": "Taylor Swift", "genre": "Pop", "release_year": 2019},
            {"title": "Cruel Summer", "artist": "Taylor Swift", "genre": "Pop", "release_year": 2019}
        ]
    })

    # Quando uma requisição "GET" for enviada para "/songs/songs_by_year" com o parâmetro de consulta "release_year" definido como "2019"
    response = client.get("/songs/songs_by_year/2019")
    print(response.json())

    # Então o status da resposta deve ser "200"
    assert response.status_code == 200

    # E o JSON da resposta deve conter uma lista de músicas com o ano de lançamento "2019" com os nomes "Lover" e "Cruel Summer"
    expected_json = {
        "songs": [
            {"title": "Lover", "artist": "Taylor Swift", "genre": "Pop", "release_year": 2019},
            {"title": "Cruel Summer", "artist": "Taylor Swift", "genre": "Pop", "release_year": 2019}
        ]
    }
    print(expected_json)
    assert response.json() == expected_json
